import { Post } from "@/domain/enterprise/entities/post"
import { PostsRepository } from "../repositories/posts-repository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

interface GetPostByIdUseCaseRequest {
  id: string
}

interface GetPostByIdUseCaseResponse {
  post: Post
}

export class GetPostByIdUseCase {
  constructor(private postRepository: PostsRepository) {}

  async execute(request: GetPostByIdUseCaseRequest): Promise<GetPostByIdUseCaseResponse> {
    const { id } = request

    const post = await this.postRepository.findById(id)

    if (!post) {
      throw new ResourceNotFoundError()
    }

    return { post }
  }
}

