import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export enum EChecklistType {
  FUNCTIONAL_ASPECTS,
  CONTENT,
  TRANSACTION,
}

@Schema()
export class ChecklistModel {
  @Prop() @ApiProperty({ enum: EChecklistType }) public type: EChecklistType;
  @Prop()
  @ApiProperty({ type: () => [CheckboxItemModel] })
  public items: CheckboxItemModel[];

  constructor() {
    this.items = new Array<CheckboxItemModel>();
  }
}

export enum ECheckboxAnswer {
  NA,
  S,
  N,
}

@Schema()
export class CheckboxItemModel {
  @Prop()
  @ApiProperty({ enum: ECheckboxAnswer })
  public checkbox: ECheckboxAnswer;
  @Prop() @ApiProperty() public note: string;
  @Prop()
  @ApiProperty({ type: () => [ResourceModel] })
  public resources: ResourceModel[];
  @Prop() @ApiProperty({ type: () => [ImageModel] }) public image: ImageModel[];

  constructor() {
    this.resources = new Array<ResourceModel>();
    this.image = new Array<ImageModel>();
  }
}

@Schema()
export class ImageModel {
  @Prop() @ApiProperty() public photoName: string;
  @Prop() @ApiProperty() public base64: string;
  @Prop() @ApiProperty() public identifier: number;
}

@Schema()
export class ResourceModel {
  @Prop() @ApiProperty() public url: string;
  @Prop() @ApiProperty() public identifier: string;
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
