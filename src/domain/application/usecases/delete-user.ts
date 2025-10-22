import { UsersRepository } from "../repositories/users-repository"
import { Injectable } from "@nestjs/common"
import { Either, left, right } from "@/core/either"

interface DeleteUserUseCaseRequest {
  id: string
}

type DeleteUserUseCaseResponse = Either<
  { message: string },
  void
>

@Injectable()
export class DeleteUserUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(request: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const { id } = request

    const user = await this.userRepository.findById(id)

    if (!user) {
      return left({ message: 'Resource not found' })
    }

    await this.userRepository.delete(id)

    return right(undefined)
  }
}

