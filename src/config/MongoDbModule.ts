import { Injectable, Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Injectable()
class MongooseConfigService implements MongooseModuleOptions {
  private readonly usr: string;
  private readonly pw: string;
  private readonly host: string;
  private readonly port: number;
  constructor(private configService: ConfigService) {
    this.usr = this.configService.get<string>('DATABASE_USER');
    this.pw = this.configService.get<string>('DATABASE_PASSWORD');
    this.host = this.configService.get<string>('DATABASE_HOST');
    this.port = this.configService.get<number>('DATABASE_PORT');
  }

  createMongooseOptions(): MongooseModuleOptions {
    console.log(`mongodb://${this.usr}:${this.pw}@${this.host}:${this.port}`);
    return {
      uri: `mongodb://${this.usr}:${this.pw}@${this.host}:${this.port}`,
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
