import {Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Post} from '@nestjs/common';
import { ChecklistService } from './checklist.service';
import { Checklist } from './schemas/checklist.schema';
import { IChecklistCreation } from './dto/checklist-creation.interface';
import { ChecklistConverter } from './util/checklist.converter';
import {UsabilityDeclarationCompliance, UsabilityDeclarationSync} from './dto/checklist-sync.dto';

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
  async findById(@Param('id') id: number): Promise<Checklist> {
    this.logger.log(`REST Request to list a checklist with monitor server id: ${id}`);
    return this.checklistService.findByMonitorServerId(id);
  }

  @Post('/sync')
  async syncChecklistsFromMonitorService(@Body() declaration: UsabilityDeclarationSync): Promise<UsabilityDeclarationCompliance> {
    this.logger.log(`REST Request to sync Usability Declaration with checklist-manager`)
    if (declaration.urls.length === 0) {
      this.logger.error('Declaration does not contain any valid URLs.')
      throw new HttpException('Declaration does not contain any valid URLs.', HttpStatus.BAD_REQUEST)
    } else if (await this.checklistService.isAlreadySynced(declaration.id)) {
      this.logger.warn(`Declaration with monitor server id: ${declaration.id} already present in the system`)
      throw new HttpException('Declaration is already synced in the system', HttpStatus.NOT_MODIFIED)
    } else {
      // this.logger.debug(`Declaration contains the following urls: ${declaration.urls}`)
      const checklist = await this.checklistService.buildChecklistFromDeclaration(declaration)
      await this.checklistService.create(checklist)
      return this.checklistService.calculateUsabilityDeclarationCompliance(checklist.form.checklists)
    }
  }
}
