import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiBody, ApiHeader, ApiTags } from "@nestjs/swagger"
import { AuthService } from "./auth.service"
import { AuthCreateDto } from "./dto/auth.create.dto"
import { JwtAuthGuard } from "./guard/jwt-guard.auth"
import { LocalAuthGuard } from "./guard/local-guard.auth"

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signin")
  async signin(@Body() user: AuthCreateDto) {
    return await this.authService.signIn(user)
  }

  @UseGuards(LocalAuthGuard)
  @ApiBody({ required: true, type: AuthCreateDto })
  @Post("login")
  async login(@Req() req) {
    return await this.authService.login(req.user)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post("logout")
  async logout(@Req() req) {
    const token = String(req.headers.authorization).split(" ")[1]
    console.log(token)

    return await this.authService.logout(token)
  }
}
