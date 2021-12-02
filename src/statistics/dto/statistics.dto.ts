export interface IStatistics {
    totalChecklists: number
}

export class Statistics implements IStatistics {
    constructor(public totalChecklists: number) {
        this.totalChecklists = totalChecklists
    }
}
