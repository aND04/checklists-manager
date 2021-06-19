export interface IMonitorServerPageCode {
  htmlBase64: string;
  evaluationId: number;
  pageId: number;
}

export interface IPageCode {
  pageHtml: string;
  evaluationId: number;
}

export interface IUsabilityReport {
  pageId: number;
  reports: Array<string>;
}
