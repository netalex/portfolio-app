import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  path: string;
}

interface PerformanceReport {
  metrics: PerformanceMetric[];
  summary: {
    avgFCP: number;
    avgLCP: number;
    avgFID: number;
    avgCLS: number;
    totalJSHeapSize: number;
    avgDomNodes: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceMonitoringService {
  private metrics$ = new BehaviorSubject<PerformanceMetric[]>([]);
  private readonly METRICS_BUFFER_SIZE = 100;
  private readonly REPORTING_INTERVAL = 30000; // 30 seconds

  constructor(private router: Router) {
    this.initializeMonitoring();
  }

  private initializeMonitoring() {
    // Monitor route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.measureNavigationTiming());

    // Monitor Web Vitals
    this.observeWebVitals();

    // Monitor resources
    this.observeResourceTiming();

    // Setup periodic reporting
    this.setupPeriodicReporting();
  }

  private observeWebVitals() {
    // Largest Contentful Paint
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        this.addMetric({
          name: 'LCP',
          value: entry.startTime,
          timestamp: Date.now(),
          path: this.router.url
        });
      });
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        this.addMetric({
          name: 'FID',
          value: entry.duration,
          timestamp: Date.now(),
          path: this.router.url
        });
      });
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        this.addMetric({
          name: 'CLS',
          value: entry.value,
          timestamp: Date.now(),
          path: this.router.url
        });
      });
    }).observe({ entryTypes: ['layout-shift'] });
  }

  private observeResourceTiming() {
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        if (entry.initiatorType === 'script' || entry.initiatorType === 'css') {
          this.addMetric({
            name: `Resource-${entry.initiatorType}`,
            value: entry.duration,
            timestamp: Date.now(),
            path: this.router.url
          });
        }
      });
    }).observe({ entryTypes: ['resource'] });
  }

  private measureNavigationTiming() {
    if (window.performance && window.performance.timing) {
      const timing = performance.timing;
      const navigationStart = timing.navigationStart;

      this.addMetric({
        name: 'TTFB',
        value: timing.responseStart - navigationStart,
        timestamp: Date.now(),
        path: this.router.url
      });

      this.addMetric({
        name: 'DOMComplete',
        value: timing.domComplete - navigationStart,
        timestamp: Date.now(),
        path: this.router.url
      });
    }
  }

  private addMetric(metric: PerformanceMetric) {
    const currentMetrics = this.metrics$.value;
    const updatedMetrics = [
      ...currentMetrics,
      metric
    ].slice(-this.METRICS_BUFFER_SIZE);

    this.metrics$.next(updatedMetrics);
  }

  private setupPeriodicReporting() {
    setInterval(() => {
      this.generatePerformanceReport().subscribe(report => {
        console.log('Performance Report:', report);
// Send report to analytics service if in production
if (environment.production) {
  this.sendReportToAnalytics(report);
}

// Check for performance budgets
this.checkPerformanceBudgets(report);
});
}, this.REPORTING_INTERVAL);
}

private generatePerformanceReport(): Observable<PerformanceReport> {
return new Observable(observer => {
const metrics = this.metrics$.value;
const report: PerformanceReport = {
metrics,
summary: {
  avgFCP: this.calculateAverage(metrics, 'FCP'),
  avgLCP: this.calculateAverage(metrics, 'LCP'),
  avgFID: this.calculateAverage(metrics, 'FID'),
  avgCLS: this.calculateAverage(metrics, 'CLS'),
  totalJSHeapSize: this.getJSHeapSize(),
  avgDomNodes: this.getDomNodesCount()
}
};

observer.next(report);
observer.complete();
});
}

private calculateAverage(metrics: PerformanceMetric[], name: string): number {
const relevantMetrics = metrics.filter(m => m.name === name);
if (relevantMetrics.length === 0) return 0;

const sum = relevantMetrics.reduce((acc, curr) => acc + curr.value, 0);
return sum / relevantMetrics.length;
}

private getJSHeapSize(): number {
if (window.performance && (performance as any).memory) {
return (performance as any).memory.usedJSHeapSize;
}
return 0;
}

private getDomNodesCount(): number {
return document.getElementsByTagName('*').length;
}

private checkPerformanceBudgets(report: PerformanceReport) {
const budgets = {
LCP: 2500, // 2.5s
FID: 100,  // 100ms
CLS: 0.1,  // 0.1
JSHeapSize: 50 * 1024 * 1024, // 50MB
DomNodes: 1500
};

const violations = [];

if (report.summary.avgLCP > budgets.LCP) {
violations.push(`LCP exceeded budget: ${report.summary.avgLCP}ms vs ${budgets.LCP}ms`);
}

if (report.summary.avgFID > budgets.FID) {
violations.push(`FID exceeded budget: ${report.summary.avgFID}ms vs ${budgets.FID}ms`);
}

if (report.summary.avgCLS > budgets.CLS) {
violations.push(`CLS exceeded budget: ${report.summary.avgCLS} vs ${budgets.CLS}`);
}

if (report.summary.totalJSHeapSize > budgets.JSHeapSize) {
violations.push(`JS Heap Size exceeded budget: ${report.summary.totalJSHeapSize} bytes vs ${budgets.JSHeapSize} bytes`);
}

if (report.summary.avgDomNodes > budgets.DomNodes) {
violations.push(`DOM Nodes exceeded budget: ${report.summary.avgDomNodes} vs ${budgets.DomNodes}`);
}

if (violations.length > 0) {
console.warn('Performance budget violations:', violations);
// Could trigger alerts or notifications here
}
}

private async sendReportToAnalytics(report: PerformanceReport) {
try {
const response = await fetch('/api/analytics/performance', {
method: 'POST',
headers: {
  'Content-Type': 'application/json'
},
body: JSON.stringify(report)
});

if (!response.ok) {
throw new Error('Failed to send performance report');
}
} catch (error) {
console.error('Error sending performance report:', error);
}
}

// Public API
public getMetrics(): Observable<PerformanceMetric[]> {
return this.metrics$.asObservable();
}

public getCurrentReport(): Observable<PerformanceReport> {
return this.generatePerformanceReport();
}
}