import { Controller, Get, Logger } from '@nestjs/common';
import { HtmlProcessorService } from './html-processor.service';

@Controller('html-processor')
export class HtmlProcessorController {
  private readonly logger = new Logger(HtmlProcessorController.name);
  constructor(private readonly htmlProcessorService: HtmlProcessorService) {}

  @Get()
  async test(): Promise<any> {
    this.logger.log('REST Request to test html-service');
    return this.htmlProcessorService.test();
  }
}
