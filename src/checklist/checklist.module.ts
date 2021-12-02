import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Checklist, CHECKLIST_SCHEMA } from './schemas/checklist.schema';
import { ChecklistService } from './checklist.service';
import { ChecklistController } from './checklist.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { HtmlProcessorModule } from '../html-processor/html-processor.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Checklist.name, schema: CHECKLIST_SCHEMA },
    ]),
    ConfigModule,
    HttpModule,
    HtmlProcessorModule,
  ],
  controllers: [ChecklistController],
  providers: [ChecklistService],
})
export class ChecklistModule {}
