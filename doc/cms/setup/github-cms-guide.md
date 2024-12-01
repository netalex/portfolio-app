# GitHub CMS Setup Guide

## Overview

This document describes how to set up and use GitHub as a CMS for the Alessandro Aprile Portfolio Application. This approach provides version control, content management, and CI/CD integration while maintaining simplicity and security.

## System Architecture

The GitHub CMS system consists of:

1. A dedicated GitHub repository for content storage
2. GitHub API integration for content retrieval
3. Local caching system using LokiJS
4. Content synchronization service
5. Webhook integration for real-time updates

## Repository Structure

```
portfolio-content/
├── data/
│   ├── projects/
│   │   ├── project1.md
│   │   └── project2.md
│   ├── skills/
│   │   └── skills.json
│   └── experiences/
│       └── experiences.json
├── assets/
│   ├── images/
│   │   └── projects/
│   └── documents/
└── config/
    └── content-schema.json
```

## Initial Setup

### 1. Create Content Repository

```bash
# Create new repository
gh repo create portfolio-content --private

# Clone the repository
git clone https://github.com/netalex/portfolio-content.git

# Set up initial structure
cd portfolio-content
mkdir -p data/{projects,skills,experiences} assets/{images,documents} config
```

### 2. GitHub Personal Access Token

1. Navigate to GitHub Settings > Developer settings > Personal access tokens
2. Click "Generate new token (classic)"
3. Name: `portfolio-cms-access`
4. Select scopes:
   - repo (full control)
   - read:packages
   - read:org
5. Copy and securely store the generated token

### 3. Environment Configuration

Create a `.env` file in your Angular project:

```env
GITHUB_TOKEN=your_personal_access_token
GITHUB_OWNER=netalex
GITHUB_REPO=portfolio-content
GITHUB_API_URL=https://api.github.com
GITHUB_CONTENT_PATH=data
```

Add to `.gitignore`:
```
.env
.env.local
```

## Content Schema

### Project Schema
```json
{
  "type": "object",
  "required": ["id", "title", "description", "technologies"],
  "properties": {
    "id": { "type": "string" },
    "title": { "type": "string" },
    "description": { "type": "string" },
    "technologies": { 
      "type": "array",
      "items": { "type": "string" }
    },
    "images": {
      "type": "object",
      "properties": {
        "thumbnail": { "type": "string" },
        "gallery": { 
          "type": "array",
          "items": { "type": "string" }
        }
      }
    }
  }
}
```

## Integration Code

### GitHub Service

```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, catchError, map, tap } from 'rxjs';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class GitHubCmsService {
  private readonly baseUrl = environment.github.apiUrl;
  private readonly headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private db: DatabaseService
  ) {
    this.headers = new HttpHeaders({
      'Authorization': `token ${environment.github.token}`,
      'Accept': 'application/vnd.github.v3+json'
    });
  }

  fetchContent(path: string): Observable<any> {
    const url = `${this.baseUrl}/repos/${environment.github.owner}/${environment.github.repo}/contents/${path}`;
    
    return this.http.get(url, { headers: this.headers }).pipe(
      map((response: any) => {
        const content = Buffer.from(response.content, 'base64').toString();
        return JSON.parse(content);
      }),
      tap(content => this.db.cacheContent(path, content)),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('GitHub CMS Error:', error);
    throw error;
  }
}
```

### Content Synchronization Service

```typescript
import { Injectable } from '@angular/core';
import { GitHubCmsService } from './github-cms.service';
import { DatabaseService } from './database.service';
import { interval, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentSyncService {
  constructor(
    private githubCms: GitHubCmsService,
    private db: DatabaseService
  ) {}

  startSync(intervalMs: number = 300000) { // 5 minutes
    return interval(intervalMs).pipe(
      switchMap(() => this.syncContent())
    );
  }

  private syncContent() {
    return this.githubCms.fetchContent('data/content-manifest.json');
  }
}
```

## Security Considerations

1. **Token Security:**
   - Never commit tokens to version control
   - Use environment variables for sensitive data
   - Rotate tokens periodically
   - Use minimal required permissions

2. **Access Control:**
   - Keep content repository private
   - Use branch protection rules
   - Implement review process for content changes

3. **Data Validation:**
   - Validate content against schema
   - Sanitize content before display
   - Implement rate limiting

## Content Management Workflow

1. **Content Creation:**
   ```bash
   # Create new project
   cd portfolio-content/data/projects
   touch new-project.md
   ```

2. **Content Update:**
   ```bash
   # Update existing content
   git pull
   # Edit files
   git add .
   git commit -m "Update: project description"
   git push
   ```

3. **Content Review:**
   - Create pull request for content changes
   - Review changes in GitHub interface
   - Merge after approval

## Testing

```typescript
describe('GitHubCmsService', () => {
  let service: GitHubCmsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GitHubCmsService]
    });

    service = TestBed.inject(GitHubCmsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch and decode content', (done) => {
    const testContent = { test: 'data' };
    const encodedContent = Buffer.from(JSON.stringify(testContent)).toString('base64');

    service.fetchContent('test.json').subscribe(content => {
      expect(content).toEqual(testContent);
      done();
    });

    const req = httpMock.expectOne(`${environment.github.apiUrl}/repos/${environment.github.owner}/${environment.github.repo}/contents/test.json`);
    expect(req.request.method).toBe('GET');
    req.flush({ content: encodedContent });
  });
});
```

## Deployment Considerations

1. Set up GitHub Actions for content validation
2. Configure deployment triggers for content updates
3. Implement caching strategy for production
4. Monitor API rate limits

## Troubleshooting

Common issues and solutions:

1. **Rate Limiting:**
   - Implement caching
   - Use conditional requests
   - Monitor usage

2. **Content Sync Issues:**
   - Check network connectivity
   - Verify token permissions
   - Review error logs

3. **Schema Validation Errors:**
   - Validate content format
   - Check for required fields
   - Review schema version

## Maintenance

Regular maintenance tasks:

1. Token rotation (every 90 days)
2. Content audit (monthly)
3. Schema updates (as needed)
4. Performance monitoring
5. Security updates

## Resources

- [GitHub REST API Documentation](https://docs.github.com/en/rest)
- [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [Angular HTTP Client](https://angular.io/guide/http)
- [LokiJS Documentation](https://github.com/techfort/LokiJS)
