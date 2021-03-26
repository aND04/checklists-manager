import { ECheckboxAnswer } from '../schemas/form.model';

export interface IChecklistCreation {
  websiteDesignation: string;
  websiteAddress: string;
  entity: string;
  date: Date;
  lastGenIdImg: number;
  lastGenIdResources: number;
  checkboxes_10_func_asp: ECheckboxAnswer[];
  notes_10_func_asp: string[];
  resources_10_func_asp: IResource[];
  images_10_func_asp: IImage[];
  checkboxes_content: ECheckboxAnswer[];
  notes_content: string[];
  resources_content: IResource[];
  images_content: IImage[];
  checkboxes_transaction: ECheckboxAnswer[];
  notes_transaction: string[];
  resources_transaction: IResource[];
  images_transaction: IImage[];
}

export interface IResource {
  url: string;
  identifier: number;
}

export interface IImage {
  photoName: string;
  base64: string;
  identifier: number;
}
