import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { TokenService } from "src/token/token.service"
import { Repository } from "typeorm"
import { TodoEntity } from "./entities/todo.entity"

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todosRepository: Repository<TodoEntity>,
    private readonly tokenService: TokenService,
  ) {}

  async create(user: any, todo: any) {
    this.tokenService.findByToken(user)

    const newTodo = this.todosRepository.create({
      task: todo,
      isCompleted: false,
    })

    return this.todosRepository.save(newTodo)
  }

  findAll() {
    return `This action returns all todos`
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`
  }

  remove(id: number) {
    return `This action removes a #${id} todo`
  }
}
