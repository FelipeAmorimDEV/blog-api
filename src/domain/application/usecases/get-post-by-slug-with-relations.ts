import { PostWithRelations } from "@/domain/enterprise/entities/post-with-relations"
import { PostsRepository } from "../repositories/posts-repository"
import { Either, left, right } from "@/core/either"
import { Injectable } from "@nestjs/common"

interface GetPostBySlugWithRelationsUseCaseRequest {
  slug: string
}

type GetPostBySlugWithRelationsUseCaseResponse = Either<
  { message: string },
  { postWithRelations: PostWithRelations }
>

@Injectable()
export class GetPostBySlugWithRelationsUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(request: GetPostBySlugWithRelationsUseCaseRequest): Promise<GetPostBySlugWithRelationsUseCaseResponse> {
    const { slug } = request

    const postWithRelations = await this.postsRepository.findBySlugWithRelations(slug)

    if (!postWithRelations) {
      return left({ message: 'Post não encontrado' })
    }

    return right({ postWithRelations })
  }
}
