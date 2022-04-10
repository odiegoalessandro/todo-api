import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "src/auth/guard/jwt-guard.auth"
import { TodosService } from "./todos.service"

@Controller("todos")
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @UseGuards(JwtAuthGuard)
  @Post("create")
  create(@Req() req, @Body() data) {
    const token = req.headers.authorization

    return this.todosService.create(token, data)
  }
}
