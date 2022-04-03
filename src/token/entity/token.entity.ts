import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class TokenEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  hash: string

  @Column({ name: "user_email" })
  userEmail: string
}
