import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AuthModule } from "./auth/auth.module"
import { TodoEntity } from "./todos/entities/todo.entity"
import { TodosModule } from "./todos/todos.module"
import { TokenEntity } from "./token/entity/token.entity"
import { TokenModule } from "./token/token.module"
import { UserEntity } from "./users/user.entity"
import { UsersModule } from "./users/users.module"
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "gadi338624",
      database: "todo_app",
      entities: [UserEntity, TokenEntity, TodoEntity],
      synchronize: true,
      autoLoadEntities: true,
    } as TypeOrmModuleOptions),
    UsersModule,
    AuthModule,
    TokenModule,
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
