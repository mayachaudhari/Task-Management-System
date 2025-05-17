// backend/src/tasks/tasks.module.ts
/*
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task, TaskSchema } from './schemas/task.schema';
import { UsersModule } from '../users/users.module'; // if you need user info

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    UsersModule, // optional, if you need user data
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
*/


import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task, TaskSchema } from './schemas/task.schema';
import { UsersModule } from '../users/users.module'; // optional, if you need user data
import { NotificationsModule } from '../notifications/notifications.module'; // add this import

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    UsersModule,         // optional, keep if you need user data
    NotificationsModule, // **must add this to inject NotificationsGateway**
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
