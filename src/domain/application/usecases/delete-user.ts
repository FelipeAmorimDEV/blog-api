import { UsersRepository } from "../repositories/users-repository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

interface DeleteUserUseCaseRequest {
  id: string
}

export class DeleteUserUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(request: DeleteUserUseCaseRequest): Promise<void> {
    const { id } = request

    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    await this.userRepository.delete(id)
  }
}

