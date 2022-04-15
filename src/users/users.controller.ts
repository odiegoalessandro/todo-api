import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { JwtAuthGuard } from "src/auth/guard/jwt-guard.auth"
import { UserCreateDto } from "./dto/user.create.dto"
import { UsersService } from "./users.service"

@Controller("users")
@ApiTags("user")
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("/all")
  async findAll() {
    return this.userService.findAll()
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(":email")
  async findOne(@Param("email") email: string) {
    return this.userService.findByEmail(email)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createUser: UserCreateDto) {
    return this.userService.create(createUser)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async delete(@Param("id") id: number) {
    return this.userService.delete(+id)
  }
}
