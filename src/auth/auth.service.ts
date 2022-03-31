import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { compareSync } from "bcrypt"
import { UsersService } from "src/users/users.service"

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    console.log("auth service", email, password)

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

  async login(user: any) {
    console.log("login - auth service", user)

    const payload = { email: user.email, sub: user.id }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
