import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoDbModule } from './config/MongoDbModule';
import { ChecklistModule } from './checklist/checklist.module';
import { ConfigModule } from '@nestjs/config';
import { HtmlProcessorModule } from './html-processor/html-processor.module';

@Module({
  imports: [
    MongoDbModule,
    ChecklistModule,
    ConfigModule.forRoot(),
    HtmlProcessorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
