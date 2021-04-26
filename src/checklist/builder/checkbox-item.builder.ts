import {
  CheckboxItemModel,
  ECheckboxAnswer,
  ICheckboxItemModel,
  ImageModel,
  ResourceModel,
} from '../schemas/form.model';
import { ECheckboxReply } from '../../html-processor/util/html-types.enum';

export class CheckboxItemModelBuilder implements Partial<ICheckboxItemModel> {
  identifier: string;
  checkbox: ECheckboxAnswer;
  note: string;
  resources: ResourceModel[];
  images: ImageModel[];

  withIdentifier(id: string): this & Pick<ICheckboxItemModel, 'identifier'> {
    return Object.assign(this, { identifier: id });
  }

  withCheckbox(
    checkboxReply: ECheckboxReply,
  ): this & Pick<ICheckboxItemModel, 'checkbox'> {
    const enumName = Object.keys(ECheckboxReply).find(
      (key) => ECheckboxReply[key] === checkboxReply,
    );
    const checkboxAnswer = ECheckboxAnswer[enumName];
    return Object.assign(this, { checkbox: checkboxAnswer });
  }

  withNote(noteValue: string): this & Pick<ICheckboxItemModel, 'note'> {
    return Object.assign(this, { note: noteValue });
  }

  withResources(
    resources: ResourceModel[],
  ): this & Pick<ICheckboxItemModel, 'resources'> {
    return Object.assign(this, { resources: resources });
  }

  withImages(images: ImageModel[]): this & Pick<ICheckboxItemModel, 'images'> {
    return Object.assign(this, { images: images });
  }

  build(this: CheckboxItemModel): ICheckboxItemModel {
    return new CheckboxItemModel(this);
  }
}
