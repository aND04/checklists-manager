import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Checklist, ChecklistDocument } from './schemas/checklist.schema';
import { Model } from 'mongoose';
import { CreateChecklistDto } from './dto/create-checklist.dto';

@Injectable()
export class ChecklistService {
  constructor(
    @InjectModel(Checklist.name)
    private checklistModel: Model<ChecklistDocument>,
  ) {}

  async create(createChecklistDto: CreateChecklistDto): Promise<Checklist> {
    const model = new this.checklistModel(createChecklistDto);
    return model.save();
  }

  async findAll(): Promise<Checklist[]> {
    return this.checklistModel.find().exec();
  }
}
