import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskBackendDto } from './create-task-backend.dto';

export class UpdateTaskBackendDto extends PartialType(CreateTaskBackendDto) {
  id: number;
  title: string;
  description: string;
  done: boolean;
}
