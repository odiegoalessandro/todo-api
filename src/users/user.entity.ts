import { hashSync } from "bcrypt"
import { TodoEntity } from "src/todos/entities/todo.entity"
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  password: string

  @OneToMany(() => TodoEntity, () => UserEntity)
  todos: TodoEntity[]

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10)
  }
}
