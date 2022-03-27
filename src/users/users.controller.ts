import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common"
import { AuthService } from "src/auth/auth.service"
import { User } from "./entity/users.entity"
import { UsersService } from "./users.service"

@Controller("users")
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findALl()
  }

  @Get()
  async findOne(@Param("email") email: string): Promise<User> {
    return this.usersService.findByEmail(email)
  }

  @Post("signin")
  async create(@Body() data: User): Promise<User> {
    return this.usersService.create(data)
  }

  @Delete(":id")
  async delete(@Param("id") id: number) {
    return this.usersService.remove(+id)
  }

  @Post("login")
  async login(@Body() req: User) {
    const { email, password } = req
    const validate = await this.authService.validateUser(email, password)

    return validate
  }
}
