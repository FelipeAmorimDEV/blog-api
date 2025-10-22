import { User } from "@/domain/enterprise/entities/user"
import { UsersRepository } from "../repositories/users-repository"
import { Injectable } from "@nestjs/common"
import { Either, right } from "@/core/either"

type GetAllUsersUseCaseResponse = Either<
  never,
  { users: User[] }
>

@Injectable()
export class GetAllUsersUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(): Promise<GetAllUsersUseCaseResponse> {
    const users = await this.userRepository.findAll()

    return right({ users })
  }
}

