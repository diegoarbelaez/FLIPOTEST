import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tasks'})

export class Task {

    @PrimaryGeneratedColumn() 
    id: number;
    
    @Column( { length: 500, default: '' } )
    title: string;
    
    @Column( { length: 500, default: '' } )
    description: string;
    
    @Column({ width: 1, default: false }) 
    done: boolean;
    
    @Column( { type: 'datetime', default: ()=> 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    
    @Column( { type: 'datetime', default: ()=> 'CURRENT_TIMESTAMP' })
    updatedAt: Date; 
}
  