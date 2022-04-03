import { Body, Controller, Put } from "@nestjs/common"
import { RefreshTokenDto } from "./dto/refresh.token.dto"
import { TokenService } from "./token.service"

@Controller("token")
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Put("refresh")
  async refreshAcessToken(@Body() data: RefreshTokenDto) {
    return this.tokenService.refreshToken(data.token)
  }
}
