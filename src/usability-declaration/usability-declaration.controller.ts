import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
} from '@nestjs/common';
import { UsabilityDeclarationProcessorService } from './usability-declaration-processor.service';
import { PageParser } from './page-parser';
import { IUsabilityReport } from './monitor-server-page/page-code';

@Controller('usability-declaration')
export class UsabilityDeclarationController {
  private readonly logger = new Logger(UsabilityDeclarationController.name);
  constructor(
    private readonly usabilityDeclarationProcessorService: UsabilityDeclarationProcessorService,
  ) {}

  @Get()
  async processUsabilityDeclarations(): Promise<void> {
    this.logger.log('REST Request to process usability declarations');
    await this.usabilityDeclarationProcessorService.getPageData();
  }

  @Get('/usability-report/:id')
  async fetchUsabilityReports(
    @Param('id') pageId: number,
  ): Promise<Array<string>> {
    this.logger.log(
      `REST Request to get usability report for page with id: ${pageId}`,
    );
    if (this.usabilityDeclarationProcessorService.hasPage(pageId)) {
      const page = this.usabilityDeclarationProcessorService.getPage(pageId);
      return PageParser.parseHtml(page.pageHtml);
    } else {
      this.logger.log(
        'Page not found, trying again to search monitor-server database',
      );
      const page = await this.usabilityDeclarationProcessorService.getOnePageData(
        pageId,
      );
      if (!!page) {
        return PageParser.parseHtml(page.pageHtml);
      } else {
        throw new HttpException(
          `Requested page does not exist, with id: ${pageId}`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  @Get('/usability-report')
  async fetchAllUsabilityReports(): Promise<Array<IUsabilityReport>> {
    this.logger.log('REST Request to get usability report for all pages');
    const pages = this.usabilityDeclarationProcessorService.getAllPages();
    if (pages.size === 0) {
      throw new HttpException(
        `No pages currently in the system`,
        HttpStatus.NO_CONTENT,
      );
    } else {
      const result = new Array<IUsabilityReport>();
      pages.forEach((value, key) => {
        const reports = PageParser.parseHtml(pages.get(key).pageHtml);
        if (reports.length > 0) {
          result.push({
            pageId: key,
            reports: reports,
          });
        }
      });
      return result;
    }
  }
}
