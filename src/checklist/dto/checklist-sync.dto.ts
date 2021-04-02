export class ChecklistSync {
  constructor(
    public userId: number,
    public checklistUuid: string,
    public processed: boolean,
    public createdAt: Date,
  ) {
    this.userId = userId;
    this.checklistUuid = checklistUuid;
    this.processed = processed;
    this.createdAt = createdAt;
  }
}
