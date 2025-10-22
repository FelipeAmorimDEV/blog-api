import { User } from "@/domain/enterprise/entities/user";
import { UsersRepository } from "../repositories/users-repository";
import * as bcrypt from 'bcryptjs';
import { Injectable } from "@nestjs/common";
import { Either, left, right } from "@/core/either";

interface CreateUserUseCaseRequest {
  name: string
  email: string
  password: string
}

type CreateUserUseCaseResponse = Either<
  { message: string },
  { user: User }
>

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(request: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const { name, email, password } = request

    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      return left({ message: 'User with same email already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 8)

    const user = User.create({ name, email, password: hashedPassword })

    await this.userRepository.create(user)

    return right({ user })
  }
}

