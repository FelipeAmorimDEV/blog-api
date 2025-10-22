import { PostsRepository } from "../repositories/posts-repository"
import { Injectable } from "@nestjs/common"
import { Either, left, right } from "@/core/either"

interface DeletePostUseCaseRequest {
  id: string
}

type DeletePostUseCaseResponse = Either<
  { message: string },
  void
>

@Injectable()
export class DeletePostUseCase {
  constructor(private postRepository: PostsRepository) {}

  async execute(request: DeletePostUseCaseRequest): Promise<DeletePostUseCaseResponse> {
    const { id } = request

    const post = await this.postRepository.findById(id)

    if (!post) {
      return left({ message: 'Resource not found' })
    }

    await this.postRepository.delete(id)

    return right(undefined)
  }
}

