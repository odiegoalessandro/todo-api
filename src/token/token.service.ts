import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { AuthService } from "src/auth/auth.service"
import { UsersService } from "src/users/users.service"
import { Repository } from "typeorm"
import { TokenEntity } from "./entity/token.entity"

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  async save(token: string, email: string) {
    const tokenExists = await this.tokenRepository.findOne({ userEmail: email })

    if (tokenExists) {
      const updateToken = this.tokenRepository.update(tokenExists.id, {
        hash: token,
        userEmail: email,
      })

      return updateToken
    } else {
      const newToken = this.tokenRepository.create({
        hash: token,
        userEmail: email,
      })

      return this.tokenRepository.save(newToken)
    }
  }

  async refreshToken(token: string) {
    const tokenExists = await this.tokenRepository.findOne({ hash: token })

    if (tokenExists) {
      const user = await this.usersService.findByEmail(tokenExists.userEmail)

      return await this.authService.login(user)
    } else {
      return new HttpException(
        {
          errorMessage: "invalid token",
        },
        HttpStatus.UNAUTHORIZED,
      )
    }
  }

  async deleteToken(hash: string) {
    const token = await this.tokenRepository.findOne({ hash })

    console.log(token)

    if (token) {
      return this.tokenRepository.delete(token)
    } else {
      return new HttpException(
        { errorMessage: "user is already logged out" },
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async findByToken(hash: string) {
    const token = hash.replace("Bearer ", "").trim()
    const search = await this.tokenRepository.findOne({ hash: token })

    if (search) {
      const user = await this.usersService.findByEmail(search.userEmail)

      return user
    } else {
      throw new HttpException(
        { errorMessage: "token not exists" },
        HttpStatus.BAD_REQUEST,
      )
    }
  }
}
