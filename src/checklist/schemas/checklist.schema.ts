import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChecklistDocument = Checklist & Document;

@Schema()
export class Checklist {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
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
