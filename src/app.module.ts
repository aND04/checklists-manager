import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoDbModule } from './config/MongoDbModule';
import { ChecklistModule } from './checklist/checklist.module';

@Module({
  imports: [MongoDbModule, ChecklistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
