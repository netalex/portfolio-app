import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PerformanceMonitoringService } from '../monitoring/performance-monitoring.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-performance-dashboard',
  template: `
    <div class="performance-dashboard">
      <h2>Performance Metrics</h2>
      
      <div class="metric-cards" *ngIf="performanceData$ | async as data">
        <div class="metric-card" [class.warning]="isLCPWarning(data.summary.avgLCP)">
          <h3>Largest Contentful Paint</h3>
          <div class="value">{{ data.summary.avgLCP | number:'1.0-0' }}ms</div>
          <div class="status">{{ getLCPStatus(data.summary.avgLCP) }}</div>
        </div>

        <div class="metric-card" [class.warning]="isFIDWarning(data.summary.avgFID)">
          <h3>First Input Delay</h3>
          <div class="value">{{ data.summary.avgFID | number:'1.0-0' }}ms</div>
          <div class="status">{{ getFIDStatus(data.summary.avgFID) }}</div>
        </div>

        <div class="metric-card" [class.warning]="isCLSWarning(data.summary.avgCLS)">
          <h3>Cumulative Layout Shift</h3>
          <div class="value">{{ data.summary.avgCLS | number:'1.2-2' }}</div>
          <div class="status">{{ getCLSStatus(data.summary.avgCLS) }}</div>
        </div>
      </div>

      <div class="chart-container" *ngIf="chartData$ | async as chartData">
        <canvas #performanceChart></canvas>
      </div>
    </div>
  `,
  styles: [`
    .performance-dashboard {
      padding: 1rem;
      background: var(--surface-background);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-sm);
    }

    .metric-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin: 1rem 0;
    }

    .metric-card {
      padding: 1rem;
      background: var(--surface-background-light);
      border-radius: var(--border-radius-sm);
      border: 1px solid var(--border-color);
    }

    .metric-card.warning {
      border-color: var(--warning-color);
    }

    .value {
      font-size: 2rem;
      font-weight: bold;
      color: var(--text-primary);
    }

    .status {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    .chart-container {
      margin-top: 2rem;
      height: 300px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerformanceDashboardComponent implements OnInit {
  performanceData$: Observable<any>;
  chartData$: Observable<any>;

  constructor(private performanceService: PerformanceMonitoringService) {}

  ngOnInit() {
    this.performanceData$ = this.performanceService.getCurrentReport();
    this.chartData$ = this.performanceService.getMetrics().pipe(
      map(metrics => this.transformMetricsForChart(metrics))
    );
  }

  private transformMetricsForChart(metrics: any[]) {
    // Transform metrics data for chart visualization
    // Implementation depends on your charting library
    return metrics;
  }

  private isLCPWarning(value: number): boolean {
    return value > 2500; // 2.5s threshold
  }

  private isFIDWarning(value: number): boolean {
    return value > 100; // 100ms threshold
  }

  private isCLSWarning(value: number): boolean {
    return value > 0.1; // 0.1 threshold
  }

  private getLCPStatus(value: number): string {
    if (value <= 2500) return 'Good';
    if (value <= 4000) return 'Needs Improvement';
    return 'Poor';
  }

  private getFIDStatus(value: number): string {
    if (value <= 100) return 'Good';
    if (value <= 300) return 'Needs Improvement';
    return 'Poor';
  }

  private getCLSStatus(value: number): string {
    if (value <= 0.1) return 'Good';
    if (value <= 0.25) return 'Needs Improvement';
    return 'Poor';
  }
}
