import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export enum EChecklistType {
  FUNCTIONAL_ASPECTS,
  CONTENT,
  TRANSACTION,
}

export interface IChecklistModel {
  type: EChecklistType;
  items: CheckboxItemModel[];
}

@Schema()
export class ChecklistModel implements IChecklistModel {
  @Prop() @ApiProperty({ enum: EChecklistType }) public type: EChecklistType;
  @Prop()
  @ApiProperty({ type: () => [CheckboxItemModel] })
  public items: CheckboxItemModel[];

  constructor(checklist?: IChecklistModel) {
    if (!!checklist) {
      Object.assign(this, checklist);
    } else {
      this.items = new Array<CheckboxItemModel>();
    }
  }
}

export enum ECheckboxAnswer {
  NA,
  YES,
  NO,
}

export interface ICheckboxItemModel {
  identifier: string;
  checkbox: ECheckboxAnswer;
  note: string;
  resources: ResourceModel[];
  images: ImageModel[];
}

@Schema()
export class CheckboxItemModel implements ICheckboxItemModel {
  @Prop() @ApiProperty() public identifier: string;
  @Prop()
  @ApiProperty({ enum: ECheckboxAnswer })
  public checkbox: ECheckboxAnswer;
  @Prop() @ApiProperty() public note: string;
  @Prop()
  @ApiProperty({ type: () => [ResourceModel] })
  public resources: ResourceModel[];
  @Prop()
  @ApiProperty({ type: () => [ImageModel] })
  public images: ImageModel[];

  constructor(checkboxItemModel?: ICheckboxItemModel) {
    if (!!checkboxItemModel) {
      Object.assign(this, checkboxItemModel);
    } else {
      this.resources = new Array<ResourceModel>();
      this.images = new Array<ImageModel>();
    }
  }
}

@Schema()
export class ImageModel {
  // TODO what is an identifier ?
  @Prop() @ApiProperty() public photoName: string;
  @Prop() @ApiProperty() public base64: string;
  @Prop() @ApiProperty() public identifier: number;

  constructor(photoName?: string, base64?: string, identifier?: number) {
    if (!!photoName) this.photoName = photoName;
    if (!!base64) this.base64 = base64;
    if (!!identifier) this.identifier = identifier;
  }
}

@Schema()
export class ResourceModel {
  // TODO what is the difference between both?
  @Prop() @ApiProperty() public url: string;
  @Prop() @ApiProperty() public identifier: string;

  constructor(url?: string, identifier?: string) {
    if (!!url) this.url = url;
    if (!!identifier) this.identifier = identifier;
  }
}

@Schema()
export class FormModel {
  @Prop() @ApiProperty() public websiteDesignation: string;
  @Prop() @ApiProperty() public websiteAddress: string;
  @Prop() @ApiProperty() public entity: string;
  @Prop() @ApiProperty() public date: Date;
  @Prop() @ApiProperty() public lastGenIdImg: number;
  @Prop() @ApiProperty() public lastGenIdResources: number;
  @Prop()
  @ApiProperty({ type: () => [ChecklistModel] })
  public checklist: ChecklistModel[];

  constructor() {
    this.checklist = new Array<ChecklistModel>();
  }
}
