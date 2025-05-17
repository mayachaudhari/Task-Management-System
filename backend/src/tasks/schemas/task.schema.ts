import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  dueDate: Date;

  @Prop({ enum: ['Low', 'Medium', 'High'], default: 'Medium' })
  priority: string;

  @Prop({ enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  assignedTo: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
