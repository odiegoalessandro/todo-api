import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TokenModule } from "src/token/token.module"
import { TodoEntity } from "./entities/todo.entity"
import { TodosController } from "./todos.controller"
import { TodosService } from "./todos.service"

@Module({
  controllers: [TodosController],
  imports: [TypeOrmModule.forFeature([TodoEntity]), TokenModule],
  exports: [TodosService],
  providers: [TodosService],
})
export class TodosModule {}
