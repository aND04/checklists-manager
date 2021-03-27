import { Injectable, Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Injectable()
class MongooseConfigService implements MongooseModuleOptions {
  private readonly usr: string;
  private readonly pw: string;
  private readonly host: string;
  constructor(private configService: ConfigService) {
    this.usr = this.configService.get<string>('DATABASE_USER');
    this.pw = this.configService.get<string>('DATABASE_PASSWORD');
    this.host = this.configService.get<string>('DATABASE_HOST');
  }

  createMongooseOptions(): MongooseModuleOptions {
    let uriValue;
    if (
      this.usr === undefined ||
      this.pw === undefined ||
      this.host === undefined
    ) {
      uriValue = `mongodb://root:root@localhost:27017`;
    } else {
      uriValue = `mongodb+srv://${this.usr}:${this.pw}@${this.host}/checklistManager?retryWrites=true&w=majority`;
    }
    console.log(uriValue);
    return {
      uri: uriValue,
    };
  }
}

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class MongoDbModule {}
