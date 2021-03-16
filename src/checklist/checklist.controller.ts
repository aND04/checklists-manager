import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChecklistService } from './checklist.service';
import { Checklist } from './schemas/checklist.schema';

@Controller('checklist')
export class ChecklistController {
  constructor(private readonly checklistService: ChecklistService) {
  }

  @Post()
  async create(@Body() checklistModel: Checklist) {
    await this.checklistService.create(checklistModel);
  }

  @Get()
  async findAll(): Promise<Checklist[]> {
    return this.checklistService.findAll();
  }
}
