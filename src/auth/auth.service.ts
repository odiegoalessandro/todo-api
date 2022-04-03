import { forwardRef, Inject, Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { compareSync } from "bcrypt"
import { TokenService } from "src/token/token.service"
import { UsersService } from "src/users/users.service"

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => TokenService))
    private readonly tokenService: TokenService,
  ) {}

  async validateUser(email: string, password: string) {
    console.log(email, password)
    const user = await this.usersService.findByEmail(email)
    const passwordIsCorrect = compareSync(password, user.password)

    if (user && passwordIsCorrect) {
      return {
        id: user.id,
        email: user.email,
        password: user.password,
      }
    }

    return null
  }

  async signIn(user: any) {
    const newUser = await this.usersService.create(user)

    return await this.login(newUser)
  }

  async login(user: any) {
    const token = this.jwtService.sign({ email: user.email, sub: user.id })
    this.tokenService.save(token, user.email)

    return {
      access_token: token,
    }
  }
}
