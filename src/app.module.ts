import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoDbModule } from './config/mongoose-config.service';
import { ChecklistModule } from './checklist/checklist.module';
import { ConfigModule } from '@nestjs/config';
import { HtmlProcessorModule } from './html-processor/html-processor.module';
import { StatisticsModule } from './statistics/statistics.module'

@Module({
  imports: [
    MongoDbModule,
    ChecklistModule,
    ConfigModule.forRoot(),
    HtmlProcessorModule,
    StatisticsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
