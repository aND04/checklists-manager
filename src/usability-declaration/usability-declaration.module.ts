import { Module } from '@nestjs/common';
import { UsabilityDeclarationProcessorService } from './usability-declaration-processor.service';
import { UsabilityDeclarationController } from './usability-declaration.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [UsabilityDeclarationController],
  providers: [UsabilityDeclarationProcessorService],
})
export class UsabilityDeclarationModule {}
