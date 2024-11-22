import depcheck from 'depcheck';
import madge from 'madge';
import fs from 'fs-extra';

interface DependencyReport {
  unused: string[];
  missing: string[];
  circular: string[];
  outdated: string[];
  size: Record<string, number>;
}

class DependencyAnalyzer {
  private readonly options = {
    ignorePatterns: [
      'dist',
      'coverage',
      'e2e',
      '*.spec.ts'
    ],
    parsers: {
      '*.ts': depcheck.parser.typescript
    },
    detectors: [
      depcheck.detector.requireCallExpression,
      depcheck.detector.importDeclaration
    ],
    specials: [
      depcheck.special.eslint,
      depcheck.special.prettier
    ]
  };

  async analyze(): Promise<DependencyReport> {
    console.log('Analyzing dependencies...');
    
    const report: DependencyReport = {
      unused: [],
      missing: [],
      circular: [],
      outdated: [],
      size: {}
    };

    // Check for unused and missing dependencies
    const depcheckResults = await depcheck(process.cwd(), this.options);
    report.unused = Object.keys(depcheckResults.dependencies);
    report.missing = Object.keys(depcheckResults.missing);

    // Check for circular dependencies
    const madgeResults = await madge('./src', {
      fileExtensions: ['ts'],
      excludeRegExp: [/\.spec\.ts$/]
    });
    report.circular = madgeResults.circular().map(circle => circle.join(' -> '));

    // Analyze bundle size
    await this.analyzeBundleSize(report);

    // Check for outdated dependencies
    await this.checkOutdatedDependencies(report);

    this.generateReport(report);
    return report;
  }

  private async analyzeBundleSize(report: DependencyReport) {
    const stats = await fs.readJson('./dist/stats.json');
    const modules = stats.modules || [];

    for (const module of modules) {
      if (module.name.includes('node_modules')) {
        const packageName = this.extractPackageName(module.name);
        report.size[packageName] = (report.size[packageName] || 0) + module.size;
      }
    }
  }

  private async checkOutdatedDependencies(report: DependencyReport) {
    const { stdout } = await import('child_process');
    const npmOutdated = stdout.toString();
    report.outdated = npmOutdated
      .split('\n')
      .filter(line => line.includes('WARN'))
      .map(line => line.split(' ')[3]);
  }

  private extractPackageName(path: string): string {
    const match = path.match(/node_modules\/([@a-z0-9-]+\/)?([^/]+)/);
    return match ? match[1] ? match[1] + match[2] : match[2] : path;
  }

  private generateReport(report: DependencyReport) {
    const reportPath = './reports/dependency-analysis.json';
    fs.ensureFileSync(reportPath);
    fs.writeJsonSync(reportPath, report, { spaces: 2 });
    
    console.log('\nDependency Analysis Report:');
    console.log('---------------------------');
    console.log(`Unused Dependencies: ${report.unused.length}`);
    console.log(`Missing Dependencies: ${report.missing.length}`);
    console.log(`Circular Dependencies: ${report.circular.length}`);
    console.log(`Outdated Dependencies: ${report.outdated.length}`);
    console.log('\nDetailed report saved to:', reportPath);
  }
}

new DependencyAnalyzer().analyze();
