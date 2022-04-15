import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common"
import { ApiBearerAuth, ApiHeader, ApiTags } from "@nestjs/swagger"
import { JwtAuthGuard } from "src/auth/guard/jwt-guard.auth"
import { CreateTodoDto } from "./dto/create-todo.dto"
import { UpdateTodoDto } from "./dto/update-todo.dto"
import { TodosService } from "./todos.service"

@Controller("todos")
@ApiTags("todos")
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post("create")
  async create(@Req() req, @Body() data: CreateTodoDto) {
    const token = req.headers.authorization

    return await this.todosService.create(token, data)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("user")
  async findByUser(@Req() req) {
    return this.todosService.findByUserId(req.user.id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("all")
  async findAll() {
    return await this.todosService.findAll()
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("find")
  async findById(@Query("id") id: number) {
    return await this.todosService.findById(id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put("change")
  async change(@Body() data: UpdateTodoDto) {
    const { isCompleted, todoId } = data

    return await this.todosService.changeTodoState(todoId, isCompleted)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete("delete")
  async delete(@Param("id") id: number) {
    return await this.todosService.remove(id)
  }
}
