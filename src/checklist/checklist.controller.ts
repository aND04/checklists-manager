import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChecklistService } from './checklist.service';
import { Checklist } from './schemas/checklist.schema';
import { IChecklistCreation } from './dto/checklist-creation.interface';
import { ChecklistConverter } from './util/checklist.converter';

@Controller('checklist')
export class ChecklistController {
  constructor(private readonly checklistService: ChecklistService) {}

  @Post()
  async create(@Body() checklistCreation: IChecklistCreation): Promise<void> {
    const checklistModel = new Checklist();
    checklistModel.form = ChecklistConverter.convert(checklistCreation);
    await this.checklistService.create(checklistModel);
  }

  @Get()
  async findAll(): Promise<Checklist[]> {
    return this.checklistService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id') checklistId: string): Promise<Checklist> {
    return this.checklistService.findById(checklistId);
  }
}
