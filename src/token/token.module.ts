import { forwardRef, Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AuthModule } from "src/auth/auth.module"
import { UsersModule } from "src/users/users.module"
import { TokenEntity } from "./entity/token.entity"
import { TokenController } from "./token.controller"
import { TokenService } from "./token.service"

@Module({
  controllers: [TokenController],
  providers: [TokenService],
  imports: [
    TypeOrmModule.forFeature([TokenEntity]),
    UsersModule,
    forwardRef(() => AuthModule),
  ],
  exports: [TokenService],
})
export class TokenModule {}
