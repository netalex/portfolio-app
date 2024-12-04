import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from './database.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GitHubSyncService {
  private readonly GITHUB_RAW_URL = 'https://raw.githubusercontent.com/netalex/alessandro-aprile-portfolio-content/main/';

  constructor(
    private readonly http: HttpClient,
    private readonly db: DatabaseService,
  ) {}

  /**
   * Synchronizes data from GitHub by fetching JSON files and storing them in the database.
   *
   * This function retrieves configuration, projects, skills, and experiences data
   * from specified JSON files hosted on GitHub. It then stores this data in the
   * local database using the DatabaseService.
   *
   * @throws {Error} If there's an error during the synchronization process.
   * @returns {Promise<void>} A promise that resolves when the synchronization is complete.
   */
  async syncData(): Promise<void> {
    try {
      const config = await this.fetchJsonFile('config.json');
      const projects = await this.fetchJsonFile('projects/projects.json');
      const skills = await this.fetchJsonFile('skills/skills.json');
      const experiences = await this.fetchJsonFile('experiences/experiences.json');

      await this.db.getData(config);
      await this.db.getData(projects);
      await this.db.getData(skills);
      await this.db.getData(experiences);

      console.log('Data synchronized successfully from GitHub');
    } catch (error) {
      console.error('Error synchronizing data from GitHub', error);
      throw error;
    }
  }

  /**
   * Fetches a JSON file from the GitHub API and parses its content.
   *
   * This function sends an HTTP GET request to the specified GitHub API URL,
   * retrieves the content of a JSON file, decodes it from base64, and then
   * parses it into a JavaScript object.
   *
   * @param path - The relative path to the JSON file in the GitHub repository.
   * @returns A promise that resolves to the parsed JSON content of the file.
   * @throws Will throw an error if the HTTP request fails or if the JSON parsing fails.
   */
  private async fetchJsonFile(path: string): Promise<any> {
    const response = await firstValueFrom(this.http.get(`${this.GITHUB_RAW_URL}${path}`)); // CFR https://angular.love/rxjs-heads-up-topromise-is-being-deprecated
    const content = atob((response as any).content);
    return JSON.parse(content);
  }
}
