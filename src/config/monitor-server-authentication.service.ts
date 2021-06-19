import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MonitorServerAuthenticationService {
  public readonly logger = new Logger(MonitorServerAuthenticationService.name);
  private readonly monitorServerEndpoint: string;
  constructor(private configService: ConfigService) {
    this.monitorServerEndpoint =
      this.configService.get<string>('MONITOR_SERVER_ENDPOINT') || 'localhost';
  }


}
