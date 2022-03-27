import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { User } from "./entity/users.entity"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  create(userData: User): Promise<User> {
    const newUser = this.usersRepository.create(userData)

    return this.usersRepository.save(newUser)
  }

  findALl(): Promise<User[]> {
    return this.usersRepository.find()
  }

  findById(id: number): Promise<User> {
    return this.usersRepository.findOne({ id })
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email })
  }

  async remove(id: number) {
    await this.usersRepository.delete({ id })

    return "user successfully deleted"
  }
}
