import { UserEntity } from "src/users/user.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  task: string

  @Column({ name: "is_completed" })
  isCompleted: boolean

  @ManyToOne(() => UserEntity, () => TodoEntity, { onDelete: "CASCADE" })
  user: UserEntity
}
