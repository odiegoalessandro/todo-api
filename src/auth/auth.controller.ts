import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common"
import { AuthService } from "./auth.service"
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
}
