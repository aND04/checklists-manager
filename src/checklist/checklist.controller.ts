import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { ChecklistService } from './checklist.service';
import { Checklist } from './schemas/checklist.schema';
import { IChecklistCreation } from './dto/checklist-creation.interface';
import { ChecklistConverter } from './util/checklist.converter';

@Controller('checklist')
export class ChecklistController {
  private readonly logger = new Logger(ChecklistController.name);
  constructor(private readonly checklistService: ChecklistService) {}

  @Post()
  async create(@Body() checklistCreation: IChecklistCreation): Promise<void> {
    this.logger.log('REST Request to create a new checklist');
    const checklistModel = new Checklist();
    checklistModel.form = ChecklistConverter.convert(checklistCreation);
    await this.checklistService.create(checklistModel);
  }

  @Get()
  async findAll(): Promise<Checklist[]> {
    this.logger.log('REST Request to list all checklists');
    return this.checklistService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id') checklistId: string): Promise<Checklist> {
    this.logger.log(`REST Request to list a checklist with id: ${checklistId}`);
    return this.checklistService.findById(checklistId);
  }
}
