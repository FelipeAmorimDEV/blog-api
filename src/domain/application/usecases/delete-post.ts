import { PostsRepository } from "../repositories/posts-repository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

interface DeletePostUseCaseRequest {
  id: string
}

export class DeletePostUseCase {
  constructor(private postRepository: PostsRepository) {}

  async execute(request: DeletePostUseCaseRequest): Promise<void> {
    const { id } = request

    const post = await this.postRepository.findById(id)

    if (!post) {
      throw new ResourceNotFoundError()
    }

    await this.postRepository.delete(id)
  }
}

