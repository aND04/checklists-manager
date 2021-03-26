import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FormModel } from './form.model';
import { ApiProperty } from '@nestjs/swagger';

export type ChecklistDocument = Checklist & Document;

@Schema()
export class Checklist {
  @Prop() @ApiProperty({ type: () => FormModel }) form: FormModel;

  @Prop() @ApiProperty() createdAt: Date;

  @Prop() @ApiProperty() updatedAt: Date;
}

export const CHECKLIST_SCHEMA = SchemaFactory.createForClass(Checklist);

CHECKLIST_SCHEMA.pre('save', function (next) {
  this.set({ createdAt: Date.now() });
  next();
});

CHECKLIST_SCHEMA.pre('updateOne', function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});
