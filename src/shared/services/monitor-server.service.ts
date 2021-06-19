import { HttpService, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';

@Injectable()
export class MonitorServerService {
  private readonly logger = new Logger(MonitorServerService.name);
  private readonly monitorServerUrl: string;

  constructor(private http: HttpService, private configService: ConfigService) {
    this.monitorServerUrl = this.configService.get<string>('MS_SERVER_URL');
    if (this.monitorServerUrl === undefined) {
      this.monitorServerUrl = 'http://localhost:3000';
    }
  }

  async post<S, T>(endpoint: string, data: S): Promise<T> {
    const url = this.buildUrl(endpoint);
    this.logger.log(
      `POST request to monitor-server to endpoint: ${url} with data: ${data}`,
    );
    return this.http
      .post<T>(`${this.monitorServerUrl}/${endpoint}`, data)
      .pipe(map((ans) => ans.data))
      .toPromise();
  }

  async get<T>(endpoint: string): Promise<T> {
    const url = this.buildUrl(endpoint);
    this.logger.log(`GET request to monitor-server to endpoint: ${url}`);
    return this.http
      .get<T>(url)
      .pipe(map((ans) => ans.data))
      .toPromise();
  }

  private buildUrl(endpoint: string): string {
    if (endpoint.startsWith('/')) {
      endpoint = endpoint.substring(1);
    }
    return `${this.monitorServerUrl}/${endpoint}`;
  }
}
