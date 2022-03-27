import { hashSync } from "bcrypt"
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  email: string

  @Column({ nullable: false })
  password: string

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10)
  }
}
