import { UsersRepository } from "../repositories/users-repository";
import { User } from "@/domain/enterprise/entities/user";
import * as bcrypt from 'bcryptjs';
import { Injectable } from "@nestjs/common";
import { Either, left, right } from "@/core/either";

interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUserUseCaseResponse = Either<
  { message: string },
  { user: User }
>

@Injectable()
export class AuthenticateUserUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(request: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const { email, password } = request

    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      return left({ message: 'Invalid credentials' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return left({ message: 'Invalid credentials' })
    }

    return right({ user })
  }
}

