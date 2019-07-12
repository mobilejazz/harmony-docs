// Dependencies
import { Observable } from 'rxjs';
import axios from 'axios';

class GitHubService {
  // TODO: Move to config file
  private baseUrl: string = 'https://api.github.com/repos';
  private owner: string = 'mobilejazz';
  private repo: string = 'harmony-docs';

  public getContents(path: string = ''): Observable<any> {
    return Observable.create((observer: any) => {
      axios.get(`${this.baseUrl}/${this.owner}/${this.repo}/contents/${path}?ref=develop`)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  public getReadme(): Observable<any> {
    return Observable.create((observer: any) => {
      axios.get(`${this.baseUrl}/${this.owner}/${this.repo}/readme`)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  public getFileContents(path: string): Observable<any> {
    return Observable.create((observer: any) => {
      axios.get(`${this.baseUrl}/${this.owner}/${this.repo}/contents/${path}`)
        .then((response) => {
          const lines: string[] = response.data.content.split(/\s+/);
          let fileContents: string = '';

          lines.forEach((line) => {
            fileContents += atob(line);
          });

          observer.next(fileContents);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}

export default GitHubService;
