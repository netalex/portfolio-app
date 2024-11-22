import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '@env/environment';

interface ErrorEvent {
  message: string;
  stack?: string;
  timestamp: string;
  type: 'runtime' | 'http' | 'unhandled';
  url?: string;
  userId?: string;
  metadata?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorMonitoringService implements ErrorHandler {
  private errorBuffer: ErrorEvent[] = [];
  private readonly BUFFER_SIZE = 10;
  private readonly FLUSH_INTERVAL = 30000; // 30 seconds

  constructor() {
    this.setupPeriodicFlush();
  }

  handleError(error: Error | HttpErrorResponse) {
    const errorEvent = this.createErrorEvent(error);
    this.bufferError(errorEvent);
    
    if (environment.production) {
      // In production, we might want to show a user-friendly error message
      console.error('An error occurred. Our team has been notified.');
    } else {
      // In development, log the full error
      console.error('Error:', error);
    }
  }

  private createErrorEvent(error: Error | HttpErrorResponse): ErrorEvent {
    if (error instanceof HttpErrorResponse) {
      return {
        message: error.message,
        timestamp: new Date().toISOString(),
        type: 'http',
        url: error.url || window.location.href,
        metadata: {
          status: error.status,
          statusText: error.statusText,
          name: error.name
        }
      };
    }

    return {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      type: 'runtime',
      url: window.location.href,
      metadata: {
        name: error.name,
        cause: error.cause
      }
    };
  }

  private bufferError(errorEvent: ErrorEvent) {
    this.errorBuffer.push(errorEvent);
    
    if (this.errorBuffer.length >= this.BUFFER_SIZE) {
      this.flushErrors();
    }
  }

  private async flushErrors() {
    if (this.errorBuffer.length === 0) return;

    try {
      // Here you would implement the actual sending of errors
      // to your error monitoring service (e.g., Sentry)
      const errors = [...this.errorBuffer];
      this.errorBuffer = [];

      if (environment.production) {
        await this.sendErrorsToMonitoringService(errors);
      }
    } catch (error) {
      console.error('Failed to send errors to monitoring service:', error);
    }
  }

  private async sendErrorsToMonitoringService(errors: ErrorEvent[]) {
    // Implementation would depend on your monitoring service
    // This is just a placeholder
    console.log('Sending errors to monitoring service:', errors);
  }

  private setupPeriodicFlush() {
    setInterval(() => {
      this.flushErrors();
    }, this.FLUSH_INTERVAL);
  }
}
