import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Checklist, ChecklistDocument } from './schemas/checklist.schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';
import { ChecklistSync } from './dto/checklist-sync.dto';

@Injectable()
export class ChecklistService {
  private readonly monitorServerUrl: string;
  constructor(
    @InjectModel(Checklist.name)
    private checklistModel: Model<ChecklistDocument>,
    private configService: ConfigService,
    private http: HttpService,
  ) {
    this.monitorServerUrl = this.configService.get<string>('MS_SERVER_URL');
  }

  async create(checklistModel: Checklist): Promise<Checklist> {
    const model = new this.checklistModel(checklistModel);
    const checklist = await model.save();
    await this.syncWithMonitorServer(checklist);
    return checklist;
  }

  async findAll(): Promise<Checklist[]> {
    return this.checklistModel.find().exec();
  }

  async findById(id: string): Promise<Checklist> {
    const checklist = await this.checklistModel.findById(id).exec();
    await this.syncWithMonitorServer(checklist);
    return checklist;
  }

  async syncWithMonitorServer(checklist: Checklist): Promise<void> {
    if (!checklist.synced) {
      const checklistSync = new ChecklistSync(0, checklist['_id'], false);
      const answer = await this.http
        .post<IAccEvalSyncAnswer>(
          `${this.monitorServerUrl}/accessibility-evaluation-request/sync`,
          checklistSync,
        )
        .pipe(map((ans) => ans.data))
        .toPromise();
      if (answer.status === EAccEvalRequestStatus.SUCCESS) {
        checklist.synced = true;
        const document = new this.checklistModel(checklist);
        await document.save();
      }
    }
  }
}

export enum EAccEvalRequestStatus {
  SUCCESS,
  ALREADY_SYNC,
  CHECKLIST_DOES_NOT_EXIST,
  OTHER_ERROR,
}

interface IAccEvalSyncAnswer {
  sync: boolean;
  status: EAccEvalRequestStatus;
}
