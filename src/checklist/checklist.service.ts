import {Injectable, Logger} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Checklist, ChecklistDocument} from './schemas/checklist.schema';
import {Model} from 'mongoose';
import {UsabilityDeclarationCompliance, UsabilityDeclarationSync} from './dto/checklist-sync.dto';
import {lastValueFrom} from 'rxjs';
import {ChecklistModel, ECheckboxAnswer, EChecklistType, FormModel, IChecklistModel} from './schemas/form.model';
import {HttpService} from '@nestjs/axios';
import {HtmlProcessorService} from '../html-processor/html-processor.service';

@Injectable()
export class ChecklistService {
  private readonly logger = new Logger(ChecklistService.name);
  constructor(
    @InjectModel(Checklist.name)
    private readonly checklistModel: Model<ChecklistDocument>,
    private readonly http: HttpService,
    private readonly htmlProcessorService: HtmlProcessorService
  ) {}

  async create(checklistModel: Checklist): Promise<Checklist> {
    this.logger.log('Request to create a new checklist');
    const model = new this.checklistModel(checklistModel);
    return model.save()
  }

  async findAll(): Promise<Checklist[]> {
    this.logger.log('Request to list all checklists');
    return this.checklistModel.find().exec();
  }

  async findByMonitorServerId(id: number): Promise<Checklist> {
    this.logger.log(`Request to list a checklist with id: ${id}`);
    return this.checklistModel.findOne({'monitorServerId': id}).exec();
  }

  async isAlreadySynced(id: number): Promise<boolean> {
    return this.checklistModel.exists({'monitorServerId': id});
  }

  public async buildChecklistFromDeclaration(declaration: UsabilityDeclarationSync): Promise<Checklist> {
    let checklist: Checklist = new Checklist()
    checklist.monitorServerId = declaration.id
    checklist.pageId = declaration.pageId
    checklist.form = new FormModel()
    for (const url of declaration.urls.split(',')) {
      const rawHtmlAxiosResponse = await lastValueFrom(this.http.get<string>(url))
      const html: string = rawHtmlAxiosResponse.data

      const checklistModel: IChecklistModel = this.htmlProcessorService.processReportHtml(html)
      checklist.form.checklists.push(checklistModel)
    }
    return checklist
  }

  public calculateUsabilityDeclarationCompliance(checklists: ChecklistModel[]): UsabilityDeclarationCompliance {
    let functionalAspects = 0
    let content = 0
    let transaction = 0
    for (const checklist of checklists) {
      switch (checklist.type) {
        case EChecklistType.CONTENT:
          content = this.calculateAmountOfPositiveAnswersInChecklist(checklist)
          break
        case EChecklistType.FUNCTIONAL_ASPECTS:
          functionalAspects = this.calculateAmountOfPositiveAnswersInChecklist(checklist)
          break
        case EChecklistType.TRANSACTION:
          transaction = this.calculateAmountOfPositiveAnswersInChecklist(checklist)
          break
        default:
          throw Error("Unknown checklist type.")
      }
    }
    return {
      functionalAspects: functionalAspects,
      content: content,
      transaction: transaction
    }
  }

  private calculateAmountOfPositiveAnswersInChecklist(checklist: ChecklistModel): number {
    return checklist.items.reduce((acc, current) => current.checkbox === ECheckboxAnswer.YES ? ++acc : acc, 0)
  }
}
