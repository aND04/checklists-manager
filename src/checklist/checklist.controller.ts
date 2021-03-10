import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChecklistService } from './checklist.service';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { Checklist } from './schemas/checklist.schema';

@Controller('checklist')
export class ChecklistController {
  constructor(private readonly checklistService: ChecklistService) {}

  @Post()
  async create(@Body() createChecklistDto: CreateChecklistDto) {
    await this.checklistService.create(createChecklistDto);
  }

  @Get()
  async findAll(): Promise<Checklist[]> {
    return this.checklistService.findAll();
  }
}
