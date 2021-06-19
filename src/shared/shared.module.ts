import { HttpModule, Module } from '@nestjs/common';
import { MonitorServerService } from './services/monitor-server.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [MonitorServerService],
  exports: [MonitorServerService],
})
export class SharedModule {}
