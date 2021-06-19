import { Injectable, Logger } from '@nestjs/common';
import { MonitorServerService } from '../shared/services/monitor-server.service';
import {
  IMonitorServerPageCode,
  IPageCode,
} from './monitor-server-page/page-code';

@Injectable()
export class UsabilityDeclarationProcessorService {
  private readonly logger = new Logger(
    UsabilityDeclarationProcessorService.name,
  );
  private monitorServerData = new Map<number, IPageCode>();
  constructor(private monitorServerService: MonitorServerService) {}

  public async getPageData(): Promise<void> {
    this.logger.log('Syncing with monitor-server for page data');
    const monitorServerPageCodes = await this.monitorServerService.get<
      IMonitorServerPageCode[]
    >('/page-sync');
    monitorServerPageCodes.forEach((value) => {
      this.monitorServerData.set(value.pageId, {
        pageHtml: UsabilityDeclarationProcessorService.decodePageCode(
          value.htmlBase64,
        ),
        evaluationId: value.evaluationId,
      });
    });
  }

  public async getOnePageData(pageId: number): Promise<IPageCode> {
    const page = await this.monitorServerService.get<IMonitorServerPageCode>(
      `page-sync/${pageId}`,
    );
    return {
      pageHtml: UsabilityDeclarationProcessorService.decodePageCode(
        page.htmlBase64,
      ),
      evaluationId: page.evaluationId,
    };
  }

  public hasPage(pageId: number): boolean {
    return this.monitorServerData.has(Number(pageId));
  }

  public getPage(pageId: number): IPageCode {
    return this.monitorServerData.get(Number(pageId));
  }

  public getAllPages(): Map<number, IPageCode> {
    return this.monitorServerData;
  }

  private static decodePageCode(pageCodeBase64: string): string {
    return Buffer.from(pageCodeBase64, 'base64').toString('binary');
  }
}
