import { Module } from '@nestjs/common';
import { TaskBackendService } from './task-backend.service';
import { TaskBackendGateway } from './task-backend.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task-backend.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ Task ]) ],
  providers: [TaskBackendGateway, TaskBackendService],
})
export class TaskBackendModule {}
