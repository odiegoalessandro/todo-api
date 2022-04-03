import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { UserCreateDto } from "./dto/user.create.dto"
import { UserEntity } from "./user.entity"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(user: UserCreateDto) {
    const userExists = await this.userRepository.findOne({ email: user.email })

    if (userExists) {
      return new HttpException(
        {
          errorMessage: "user already exists",
        },
        HttpStatus.BAD_REQUEST,
      )
    } else {
      const newUser = this.userRepository.create(user)

      return this.userRepository.save(newUser)
    }
  }

  findAll() {
    return this.userRepository.find()
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ email })
  }

  delete(id: number) {
    return this.userRepository.delete(id)
  }
}
