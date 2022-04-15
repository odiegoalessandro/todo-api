import { Body, Controller, Put } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { RefreshTokenDto } from "./dto/refresh.token.dto"
import { TokenService } from "./token.service"

@Controller("token")
@ApiTags("token")
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Put("refresh")
  async refreshAcessToken(@Body() data: RefreshTokenDto) {
    return this.tokenService.refreshToken(data.token)
  }
}
