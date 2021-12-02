import {Controller, Get, Logger} from '@nestjs/common'
import {StatisticsService} from './statistics.service'

@Controller('statistics')
export class StatisticsController {
    private readonly logger = new Logger(StatisticsController.name)

    constructor(private readonly statisticsService: StatisticsService) {
    }

    @Get()
    async test(): Promise<any> {
        this.logger.log(`test endpoint for statistical data`)
        return this.statisticsService.fetchDatabaseData()
    }
}
