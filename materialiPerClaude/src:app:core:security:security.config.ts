import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SecurityConfig {
  readonly securityHeaders = {
    'Content-Security-Policy': `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' data: https:;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' https://api.github.com;
    `,
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  };

  readonly securityOptions = {
    enableXSRFProtection: true,
    enableCSPReporting: true,
    enableSecurityHeaders: true,
    enableSanitization: true
  };
}

@Injectable()
export class SecurityHeadersInterceptor implements HttpInterceptor {
  constructor(private securityConfig: SecurityConfig) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.securityConfig.securityOptions.enableSecurityHeaders) {
      req = req.clone({
        setHeaders: this.securityConfig.securityHeaders
      });
    }
    return next.handle(req);
  }
}
