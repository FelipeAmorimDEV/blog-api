import { Post } from "@/domain/enterprise/entities/post"
import { PostsRepository } from "../repositories/posts-repository"
import { Injectable } from "@nestjs/common"
import { Either, left, right } from "@/core/either"

interface GetPostByIdUseCaseRequest {
  id: string
}

type GetPostByIdUseCaseResponse = Either<
  { message: string },
  { post: Post }
>

@Injectable()
export class GetPostByIdUseCase {
  constructor(private postRepository: PostsRepository) {}

  async execute(request: GetPostByIdUseCaseRequest): Promise<GetPostByIdUseCaseResponse> {
    const { id } = request

    const post = await this.postRepository.findById(id)

    if (!post) {
      return left({ message: 'Resource not found' })
    }

    return right({ post })
  }
}

