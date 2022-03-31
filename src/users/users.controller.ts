import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common"
import { JwtAuthGuard } from "src/auth/guard/jwt-guard.auth"
import { UserCreateDto } from "./dto/user.create.dto"
import { UsersService } from "./users.service"

@Controller("users")
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.userService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(":email")
  async findOne(@Param("email") email: string) {
    return this.userService.findByEmail(email)
  }

  @Post()
  async create(@Body() createUser: UserCreateDto) {
    return this.userService.create(createUser)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async delete(@Param("id") id: number) {
    return this.userService.delete(+id)
  }
}
