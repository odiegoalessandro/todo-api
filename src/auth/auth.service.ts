import { Injectable } from "@nestjs/common"
import { compare } from "bcrypt"
import { UsersService } from "../users/users.service"

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email)
    const passwordIsValid = await compare(pass, user.password)

    if (user && passwordIsValid) {
      return user
    }

    return null
  }
}
