import {Module} from '@nestjs/common'
import {StatisticsController} from './statistics.controller'
import {StatisticsService} from './statistics.service'
import {MongooseModule} from '@nestjs/mongoose'
import {Checklist, CHECKLIST_SCHEMA} from '../checklist/schemas/checklist.schema'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Checklist.name, schema: CHECKLIST_SCHEMA },
        ]),
    ],
    exports: [],
    controllers: [StatisticsController],
    providers: [StatisticsService]
})
export class StatisticsModule {}
