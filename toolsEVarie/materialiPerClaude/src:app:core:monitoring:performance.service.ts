import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PerformanceMonitoringService {
  private metrics: {
    [key: string]: any[]
  } = {};

  constructor(private router: Router) {
    this.setupRouteChangeMonitoring();
    this.setupPerformanceObserver();
  }

  private setupRouteChangeMonitoring() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.measurePageMetrics();
    });
  }

  private setupPerformanceObserver() {
    if ('PerformanceObserver' in window) {
      // Observe LCP
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.recordMetric('LCP', lastEntry);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Observe FID
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          this.recordMetric('FID', entry);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Observe CLS
      const clsObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          this.recordMetric('CLS', entry);
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
  }

  private measurePageMetrics() {
    if (window.performance) {
      const perfEntries = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      this.recordMetric('TimeToFirstByte', {
        value: perfEntries.responseStart - perfEntries.requestStart
      });

      this.recordMetric('DomContentLoaded', {
        value: perfEntries.domContentLoadedEventEnd - perfEntries.domContentLoadedEventStart
      });

      this.recordMetric('LoadComplete', {
        value: perfEntries.loadEventEnd - perfEntries.loadEventStart
      });
    }
  }

  private recordMetric(name: string, value: any) {
    if (!this.metrics[name]) {
      this.metrics[name] = [];
    }
    this.metrics[name].push({
      value,
      timestamp: new Date().toISOString(),
      url: window.location.pathname
    });

    // Send metrics to analytics when buffer is full
    if (this.metrics[name].length >= 10) {
      this.sendMetricsToAnalytics(name);
    }
  }

  private sendMetricsToAnalytics(metricName: string) {
    const metricsToSend = this.metrics[metricName];
    // Here you would implement the actual sending of metrics
    // to your analytics service
    console.log(`Sending ${metricName} metrics:`, metricsToSend);
    this.metrics[metricName] = [];
  }

  public getMetrics() {
    return this.metrics;
  }
}
