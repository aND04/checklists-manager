import {
  CheckboxItemModel,
  ChecklistModel,
  EChecklistType,
  IChecklistModel,
} from '../schemas/form.model';
import { EReportType } from '../../html-processor/util/html-types.enum';

export class ChecklistBuilder implements Partial<IChecklistModel> {
  type: EChecklistType;
  items: CheckboxItemModel[];

  withType(reportType: EReportType): this & Pick<IChecklistModel, 'type'> {
    const enumName = Object.keys(EReportType).find(
      (key) => EReportType[key] === reportType,
    );
    const checklistType = EChecklistType[enumName];
    return Object.assign(this, { type: checklistType });
  }

  withItems(
    itemsValue: CheckboxItemModel[],
  ): this & Pick<IChecklistModel, 'items'> {
    return Object.assign(this, { items: itemsValue });
  }

  build(this: ChecklistModel): IChecklistModel {
    return new ChecklistModel(this);
  }
}
