/*import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const task = new this.taskModel({ ...createTaskDto, createdBy: userId });
    return task.save();
  }

  async findAll(userId: string): Promise<Task[]> {
    return this.taskModel
      .find({ $or: [{ createdBy: userId }, { assignedTo: userId }] })
      .exec();
  }

  async findOne(id: string, userId: string): Promise<Task> {
    const task = await this.taskModel.findById(id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string): Promise<Task> {
    const updated = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true });
    if (!updated) throw new NotFoundException('Task not found');
    return updated;
  }

  async remove(id: string, userId: string): Promise<void> {
    const result = await this.taskModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Task not found');
  }
}
*/


import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    private notificationsGateway: NotificationsGateway, // ✅ Inject gateway
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const task = new this.taskModel({ ...createTaskDto, createdBy: userId });
    const savedTask = await task.save();

    // ✅ Notify assigned user
    if (savedTask.assignedTo) {
      this.notificationsGateway.server.to(savedTask.assignedTo.toString()).emit('taskAssigned', savedTask);
    }

    return savedTask;
  }

  async findAll(userId: string): Promise<Task[]> {
    return this.taskModel
      .find({ $or: [{ createdBy: userId }, { assignedTo: userId }] })
      .exec();
  }

  async findOne(id: string, userId: string): Promise<Task> {
    const task = await this.taskModel.findById(id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string): Promise<Task> {
    const updated = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true });
    if (!updated) throw new NotFoundException('Task not found');

    // ✅ Notify both creator and assignee
    if (updated.assignedTo) {
      this.notificationsGateway.server.to(updated.assignedTo.toString()).emit('taskUpdated', updated);
    }

    return updated;
  }

  async remove(id: string, userId: string): Promise<void> {
    const result = await this.taskModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Task not found');

    // ✅ Notify assignee about deletion
    if (result.assignedTo) {
      this.notificationsGateway.server.to(result.assignedTo.toString()).emit('taskDeleted', result._id);
    }
  }
}
