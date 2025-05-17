import { IsString, IsNotEmpty, IsOptional, IsEnum, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: Date;

  @IsEnum(['Low', 'Medium', 'High'])
  @IsOptional()
  priority?: string;

  @IsEnum(['Pending', 'In Progress', 'Completed'])
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  assignedTo?: string;
}
