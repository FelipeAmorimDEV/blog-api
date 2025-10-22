import { PostWithRelations } from "@/domain/enterprise/entities/post-with-relations"
import { PostsRepository } from "../repositories/posts-repository"
import { Either, left, right } from "@/core/either"
import { Injectable } from "@nestjs/common"

type GetAllPostsWithRelationsUseCaseResponse = Either<
  { message: string },
  { postsWithRelations: PostWithRelations[] }
>

@Injectable()
export class GetAllPostsWithRelationsUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(): Promise<GetAllPostsWithRelationsUseCaseResponse> {
    const postsWithRelations = await this.postsRepository.findAllWithRelations()

    return right({ postsWithRelations })
  }
}
