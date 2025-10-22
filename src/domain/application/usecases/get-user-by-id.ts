import { User } from "@/domain/enterprise/entities/user"
import { UsersRepository } from "../repositories/users-repository"
import { Injectable } from "@nestjs/common"
import { Either, left, right } from "@/core/either"

interface GetUserByIdUseCaseRequest {
  id: string
}

type GetUserByIdUseCaseResponse = Either<
  { message: string },
  { user: User }
>

@Injectable()
export class GetUserByIdUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(request: GetUserByIdUseCaseRequest): Promise<GetUserByIdUseCaseResponse> {
    const { id } = request

    const user = await this.userRepository.findById(id)

    if (!user) {
      return left({ message: 'Resource not found' })
    }

    return right({ user })
  }
}

