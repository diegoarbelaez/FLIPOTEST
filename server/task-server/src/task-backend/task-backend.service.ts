import { CreateTaskBackendDto } from './dto/create-task-backend.dto';
import { UpdateTaskBackendDto } from './dto/update-task-backend.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task-backend.entity';

@Injectable()
export class TaskBackendService {


  constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) {}

  create(createTaskBackendDto: CreateTaskBackendDto) {
    //Crea una tarea
    const newTask = this.taskRepository.create(createTaskBackendDto);
    return this.taskRepository.save(newTask); 
  }

  getTasks() {
    //Devuelve todas las tareas
    return this.taskRepository.find(
      {
        order: {
          id: 'DESC',
        },
      },
    );
  }
  
  

  findOne(id: number) {
    return `This action returns a #${id} taskBackend`;
  }

  update(id: number, updateTaskBackendDto: UpdateTaskBackendDto) {
    //Actualiza una tarea
    return this.taskRepository.update(id, updateTaskBackendDto);
  }

  remove(id: number) {
    //Elimina una tarea
    return this.taskRepository.delete(id);
  }
}
