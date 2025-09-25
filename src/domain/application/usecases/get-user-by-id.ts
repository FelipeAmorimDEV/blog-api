import { User } from "@/domain/enterprise/entities/user"
import { UsersRepository } from "../repositories/users-repository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

interface GetUserByIdUseCaseRequest {
  id: string
}

interface GetUserByIdUseCaseResponse {
  user: User
}

export class GetUserByIdUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(request: GetUserByIdUseCaseRequest): Promise<GetUserByIdUseCaseResponse> {
    const { id } = request

    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}

