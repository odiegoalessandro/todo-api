import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { UsersModule } from "src/users/users.module"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { jwtConstants } from "./constants/jwt.constants"
import { JwtStrategy } from "./strategy/jwt.strategy"
import { LocalStrategy } from "./strategy/local.strategy"

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      session: true,
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
