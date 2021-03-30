export class ChecklistSync {
  constructor(
    public userId: number,
    public checklistUuid: string,
    public processed: boolean,
  ) {
    this.userId = userId;
    this.checklistUuid = checklistUuid;
    this.processed = processed;
  }
}
