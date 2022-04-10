import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common"
import { JwtAuthGuard } from "src/auth/guard/jwt-guard.auth"
import { TodosService } from "./todos.service"

@Controller("todos")
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @UseGuards(JwtAuthGuard)
  @Post("create")
  async create(@Req() req, @Body() data) {
    const token = req.headers.authorization

    return await this.todosService.create(token, data)
  }

  @UseGuards(JwtAuthGuard)
  @Get("all")
  async findAll() {
    return await this.todosService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get("find")
  async findById(@Param("id") id: number) {
    return await this.todosService.findById(id)
  }

  @UseGuards(JwtAuthGuard)
  @Put("change")
  async change(@Body() body) {
    const { isCompleted, todoId } = body

    return await this.todosService.changeTodoState(todoId, isCompleted)
  }

  @UseGuards(JwtAuthGuard)
  @Delete("delete")
  async delete(@Param("id") id: number) {
    return await this.todosService.remove(id)
  }
}
