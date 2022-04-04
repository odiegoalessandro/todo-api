import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { JwtAuthGuard } from "./guard/jwt-guard.auth"
import { LocalAuthGuard } from "./guard/local-guard.auth"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signin")
  async signin(@Body() user) {
    return await this.authService.signIn(user)
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Req() req) {
    return await this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Post("logout")
  async logout(@Req() req) {
    const token = String(req.headers.authorization).split(" ")[1]
    console.log(token)

    return await this.authService.logout(token)
  }
}
