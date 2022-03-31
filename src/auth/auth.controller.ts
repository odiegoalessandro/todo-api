import { Controller, Post, Req, UseGuards } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { LocalAuthGuard } from "./guard/local-guard.auth"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Req() req) {
    console.log(req.user)
    return await this.authService.login(req.user)
  }
}
