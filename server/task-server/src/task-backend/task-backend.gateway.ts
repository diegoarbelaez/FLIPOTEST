import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { TaskBackendService } from './task-backend.service';
import { CreateTaskBackendDto } from './dto/create-task-backend.dto';
import { UpdateTaskBackendDto } from './dto/update-task-backend.dto';
import { DeleteTaskBackendDto } from './dto/delete-task-backend.dto';
import { OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';

//Aqui ya está configurado el puerto 4000 para el servidor de sockets, tambien el cliente ya está configurado para conectarse a este puerto
//Ahora es necesario escribir los metodos que se van a ejecutar cuando el cliente se conecte al servidor de sockets y envie un tipo de mensaje
//Para ello se usan los decoradores @SubscribeMessage y @MessageBody
//En el @SubscribeMessage se especifica el tipo de mensaje que se va a recibir y en el @MessageBody se especifica el tipo de dato que se va a recibir

@WebSocketGateway(4000, { cors: '*' })
export class TaskBackendGateway implements OnModuleInit {
  constructor(private taskBackendService: TaskBackendService) {}

  @WebSocketServer()
  public server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('Nuevo Cliente Conectado');
      //envia todas las tareas al cliente
     this.getTasks();

      socket.on('disconnect', () => console.log('Cliente Desconectado'));
    });
  }

  //Evento para crear una tarea
  @SubscribeMessage('createTask')
  async create(@MessageBody() createTaskBackendDto: CreateTaskBackendDto) {
    console.log(createTaskBackendDto);
    const respuesta =
      await this.taskBackendService.create(createTaskBackendDto);
    console.log(respuesta);
    //envia todas las tareas al cliente
    const tareas = await this.getTasks();
  }

  //Evento para obtener todas las tareas
  @SubscribeMessage('getTasks')
  async getTasks() {
    const respuesta = await this.taskBackendService.getTasks();
    console.log(respuesta);
    this.server.emit('getTasks', respuesta); 
  }

  //Evento para editar una tarea
  @SubscribeMessage('editTask')
  async editTask(@MessageBody() updateTaskBackendDto: UpdateTaskBackendDto) {
    console.log(updateTaskBackendDto);
    const respuesta = await this.taskBackendService.update(
      updateTaskBackendDto.id,
      updateTaskBackendDto,
    );
    console.log(respuesta);
    //envia todas las tareas al cliente
    const tareas = await this.getTasks();
  }

  //Evento para eliminar una tarea
  @SubscribeMessage('deleteTask')
  async deleteTask(@MessageBody() DeleteTaskBackendDto: DeleteTaskBackendDto) {
    console.log(DeleteTaskBackendDto);
    const respuesta = await this.taskBackendService.remove(DeleteTaskBackendDto.id);
    console.log(respuesta);
    //envia todas las tareas al cliente
    const tareas = await this.getTasks();
  }

}
