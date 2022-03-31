import { hashSync } from "bcrypt"
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  password: string

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10)
  }
}
