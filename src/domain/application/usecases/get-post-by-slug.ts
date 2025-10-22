import { Post } from "@/domain/enterprise/entities/post"
import { PostsRepository } from "../repositories/posts-repository"
import { Either, left, right } from "@/core/either"
import { Injectable } from "@nestjs/common"

interface GetPostBySlugUseCaseRequest {
  slug: string
}

type GetPostBySlugUseCaseResponse = Either<
  { message: string },
  { post: Post }
>

@Injectable()
export class GetPostBySlugUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(request: GetPostBySlugUseCaseRequest): Promise<GetPostBySlugUseCaseResponse> {
    const { slug } = request

    const post = await this.postsRepository.findBySlug(slug)

    if (!post) {
      return left({ message: 'Post não encontrado' })
    }

    return right({ post })
  }
}
