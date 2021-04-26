import { Module } from '@nestjs/common';
import { HtmlProcessorService } from './html-processor.service';
import { HtmlProcessorController } from './html-processor.controller';

@Module({
  imports: [],
  controllers: [HtmlProcessorController],
  providers: [HtmlProcessorService],
})
export class HtmlProcessorModule {}
