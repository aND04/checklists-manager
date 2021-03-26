import {
  IChecklistCreation,
  IImage,
  IResource,
} from '../dto/checklist-creation.interface';
import {
  CheckboxItemModel,
  ChecklistModel,
  ECheckboxAnswer,
  EChecklistType,
  FormModel,
  ImageModel,
  ResourceModel,
} from '../schemas/form.model';

export class ChecklistConverter {
  static convert(input: IChecklistCreation): FormModel {
    const form = new FormModel();
    form.websiteDesignation = input.websiteDesignation;
    form.websiteAddress = input.websiteAddress;
    form.entity = input.entity;
    form.date = new Date(input.date);
    form.lastGenIdImg = input.lastGenIdImg;
    form.lastGenIdResources = input.lastGenIdResources;

    form.checklist.push(
      this.convertToCheckListModel(
        input.checkboxes_10_func_asp,
        input.images_10_func_asp,
        input.notes_10_func_asp,
        input.resources_10_func_asp,
        EChecklistType.FUNCTIONAL_ASPECTS,
      ),
      this.convertToCheckListModel(
        input.checkboxes_content,
        input.images_content,
        input.notes_content,
        input.resources_content,
        EChecklistType.CONTENT,
      ),
      this.convertToCheckListModel(
        input.checkboxes_transaction,
        input.images_transaction,
        input.notes_transaction,
        input.resources_transaction,
        EChecklistType.TRANSACTION,
      ),
    );

    return form;
  }

  private static convertToCheckListModel(
    checkboxes: ECheckboxAnswer[],
    images: IImage[],
    notes: string[],
    resources: IResource[],
    type: EChecklistType,
  ): ChecklistModel {
    const checklistModel = new ChecklistModel();
    checklistModel.type = type;
    Object.keys(checkboxes).forEach((key: string) => {
      const checkboxItemModel = new CheckboxItemModel();
      checkboxItemModel.checkbox = this.evalCheckbox(checkboxes[key]);
      checkboxItemModel.note = notes[key];
      checkboxItemModel.resources.push(
        ...this.convertToResource(resources[key]),
      );
      checkboxItemModel.image.push(...this.convertToImage(images[key]));

      checklistModel.items.push(checkboxItemModel);
    });
    return checklistModel;
  }

  private static evalCheckbox(checkboxStringValue: string): ECheckboxAnswer {
    switch (checkboxStringValue) {
      case 'N':
        return ECheckboxAnswer.N;
      case 'NA':
        return ECheckboxAnswer.NA;
      case 'S':
        return ECheckboxAnswer.S;
    }
  }

  private static convertToResource(iResource: IResource): ResourceModel[] {
    const resources = new Array<ResourceModel>();
    Object.keys(iResource).forEach((key: string) => {
      const resource = new ResourceModel();
      resource.url = iResource[key].url;
      resource.identifier = iResource[key].identifier;

      resources.push(resource);
    });
    return resources;
  }

  private static convertToImage(iImage: IImage): ImageModel[] {
    const images = new Array<ImageModel>();
    Object.keys(iImage).forEach((key: string) => {
      const image = new ImageModel();
      image.photoName = iImage[key].photoName;
      image.identifier = iImage[key].identifier;
      image.base64 = iImage[key].base64;

      images.push(image);
    });
    return images;
  }
}
