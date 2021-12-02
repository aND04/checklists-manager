import {Injectable, Logger} from '@nestjs/common'
import {Checklist, ChecklistDocument} from '../checklist/schemas/checklist.schema'
import {Statistics} from './dto/statistics.dto'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'

@Injectable()
export class StatisticsService {
    private readonly logger = new Logger(StatisticsService.name)

    constructor(@InjectModel(Checklist.name)
                private readonly checklistModel: Model<ChecklistDocument>) {
    }

    async fetchDatabaseData(): Promise<Checklist[]> {
        this.logger.log(`Fetching statistical data from the database`)
        const query = this.checklistModel.find()
        query.setOptions({lean: true})
        const checklists = await query.where('pageId').gte(0).exec()
        return checklists;
    }
}
