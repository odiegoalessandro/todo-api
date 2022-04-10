import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
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

  async create(token: any, todo: any) {
    const user: any = await this.tokenService.findByToken(token)

    const newTodo = this.todosRepository.create({
      isCompleted: false,
      task: todo.task,
      user,
    })

    return this.todosRepository.save(newTodo)
  }

  findAll() {
    return this.todosRepository.find()
  }

  async changeTodoState(id: number, state: boolean) {
    const todo = await this.todosRepository.findOne(id)

    if (todo) {
      const updatedTodo = this.todosRepository.update(todo.id, {
        isCompleted: state,
      })

      return updatedTodo
    } else {
      throw new HttpException(
        {
          errorMessage: "todo not exists",
        },
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async findById(id: number) {
    const todo = await this.todosRepository.findOne(id)

    if (todo) {
      return todo
    } else {
      throw new HttpException(
        {
          errorMessage: "todo not exists",
        },
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async remove(id: number) {
    const todo = await this.todosRepository.findOne(id)

    return this.todosRepository.delete(todo)
  }
}
