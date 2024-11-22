import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

interface DeployConfig {
  environment: 'staging' | 'production';
  buildCommand: string;
  deployCommand: string;
  postDeployCommands?: string[];
}

const configs: Record<string, DeployConfig> = {
  staging: {
    environment: 'staging',
    buildCommand: 'npm run build:staging',
    deployCommand: 'firebase deploy --only hosting:staging',
    postDeployCommands: [
      'npm run notify:slack "Deployed to staging"',
      'npm run test:e2e:staging'
    ]
  },
  production: {
    environment: 'production',
    buildCommand: 'npm run build:prod',
    deployCommand: 'firebase deploy --only hosting:production',
    postDeployCommands: [
      'npm run notify:slack "Deployed to production"',
      'npm run lighthouse',
      'npm run monitor:performance'
    ]
  }
};

class Deployer {
  private config: DeployConfig;
  private startTime: number;

  constructor(environment: string) {
    this.config = configs[environment];
    if (!this.config) {
      throw new Error(`Invalid environment: ${environment}`);
    }
    this.startTime = Date.now();
  }

  private execCommand(command: string): void {
    try {
      execSync(command, { stdio: 'inherit' });
    } catch (error) {
      console.error(`Error executing command: ${command}`);
      throw error;
    }
  }

  private async backupCurrentBuild(): Promise<void> {
    const backupDir = path.join(__dirname, '../backups', new Date().toISOString());
    fs.mkdirSync(backupDir, { recursive: true });
    fs.cpSync(path.join(__dirname, '../dist'), backupDir, { recursive: true });
  }

  private validateBuild(): void {
    const distDir = path.join(__dirname, '../dist');
    if (!fs.existsSync(distDir)) {
      throw new Error('Build directory does not exist');
    }

    // Check for essential files
    const requiredFiles = ['index.html', 'main.js', 'styles.css'];
    for (const file of requiredFiles) {
      if (!fs.existsSync(path.join(distDir, file))) {
        throw new Error(`Missing required file: ${file}`);
      }
    }
  }

  public async deploy(): Promise<void> {
    console.log(`Starting deployment to ${this.config.environment}...`);

    try {
      // Backup current build
      await this.backupCurrentBuild();

      // Build
      console.log('Building...');
      this.execCommand(this.config.buildCommand);

      // Validate build
      this.validateBuild();

      // Deploy
      console.log('Deploying...');
      this.execCommand(this.config.deployCommand);

      // Run post-deploy commands
      if (this.config.postDeployCommands) {
        console.log('Running post-deploy commands...');
        for (const command of this.config.postDeployCommands) {
          this.execCommand(command);
        }
      }

      const duration = ((Date.now() - this.startTime) / 1000).toFixed(2);
      console.log(`Deployment completed successfully in ${duration}s`);

    } catch (error) {
      console.error('Deployment failed:', error);
      process.exit(1);
    }
  }
}

// Run deploy script
const environment = process.argv[2] || 'staging';
const deployer = new Deployer(environment);
deployer.deploy();
