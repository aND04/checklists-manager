import { Controller, Get, HttpService, Logger } from '@nestjs/common';
import { HtmlProcessorService } from './html-processor.service';
import { ChecklistModel } from '../checklist/schemas/form.model';

@Controller('html-processor')
export class HtmlProcessorController {
  private readonly logger = new Logger(HtmlProcessorController.name);
  constructor(
    private readonly htmlProcessorService: HtmlProcessorService,
    private readonly httpService: HttpService,
  ) {}

  @Get()
  async processReportHtml(): Promise<ChecklistModel> {
    this.logger.log('REST Request to test html-service');
    const html = await this.httpService
      .get<string>(
        'https://report-data-html-masters.s3-eu-west-1.amazonaws.com/report.html',
      )
      .toPromise();
    return this.htmlProcessorService.processReportHtml(html.data);
  }
}
