const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  buildDir: 'dist',
  outputDir: 'dist/portfolio',
  environments: ['production', 'staging']
};

// Utility functions
function log(message) {
  console.log(`\n🚀 ${message}\n`);
}

function error(message) {
  console.error(`\n❌ ${message}\n`);
  process.exit(1);
}

function exec(command) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (e) {
    error(`Failed to execute: ${command}`);
  }
}

// Build steps
function clean() {
  log('Cleaning build directory...');
  exec(`rm -rf ${config.buildDir}`);
}

function lint() {
  log('Linting code...');
  exec('ng lint');
}

function test() {
  log('Running tests...');
  exec('npm run test:ci');
}

function build(env) {
  log(`Building for ${env}...`);
  exec(`ng build --configuration=${env}`);
}

function optimize() {
  log('Optimizing bundle...');
  exec('npm run compress');
  exec('npm run analyze');
}

// Main build process
async function main() {
  const env = process.argv[2] || 'production';
  
  if (!config.environments.includes(env)) {
    error(`Invalid environment: ${env}`);
  }

  try {
    clean();
    lint();
    test();
    build(env);
    optimize();
    
    log('Build completed successfully! 🎉');
  } catch (err) {
    error(`Build failed: ${err.message}`);
  }
}

main();
