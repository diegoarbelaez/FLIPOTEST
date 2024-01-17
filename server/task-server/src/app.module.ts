import { Module } from '@nestjs/common';
import { TaskBackendModule } from './task-backend/task-backend.module';
import { TypeOrmModule } from '@nestjs/typeorm'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'flipo',
      entities: [ __dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TaskBackendModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
