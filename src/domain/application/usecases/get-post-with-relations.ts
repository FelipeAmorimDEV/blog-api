import { PostWithRelations } from "@/domain/enterprise/entities/post-with-relations"
import { PostsRepository } from "../repositories/posts-repository"
import { Either, left, right } from "@/core/either"
import { Injectable } from "@nestjs/common"

interface GetPostWithRelationsUseCaseRequest {
  id: string
}

type GetPostWithRelationsUseCaseResponse = Either<
  { message: string },
  { postWithRelations: PostWithRelations }
>

@Injectable()
export class GetPostWithRelationsUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(request: GetPostWithRelationsUseCaseRequest): Promise<GetPostWithRelationsUseCaseResponse> {
    const { id } = request

    const postWithRelations = await this.postsRepository.findByIdWithRelations(id)

    if (!postWithRelations) {
      return left({ message: 'Post não encontrado' })
    }

    return right({ postWithRelations })
  }
}
