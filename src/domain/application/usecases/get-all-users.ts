import { User } from "@/domain/enterprise/entities/user"
import { UsersRepository } from "../repositories/users-repository"

interface GetAllUsersUseCaseResponse {
  users: User[]
}

export class GetAllUsersUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(): Promise<GetAllUsersUseCaseResponse> {
    const users = await this.userRepository.findAll()

    return { users }
  }
}

