import { PostWithRelations } from "@/domain/enterprise/entities/post-with-relations"
import { PostsRepository } from "../repositories/posts-repository"
import { Either, left, right } from "@/core/either"
import { Injectable } from "@nestjs/common"

type GetPostsByStatusWithRelationsUseCaseResponse = Either<
  { message: string },
  { postsWithRelations: PostWithRelations[] }
>

@Injectable()
export class GetPostsByStatusWithRelationsUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(): Promise<GetPostsByStatusWithRelationsUseCaseResponse> {
    const [published, drafts] = await Promise.all([
      this.postsRepository.findPublishedWithRelations(),
      this.postsRepository.findDraftsWithRelations()
    ])

    // Combinar todos os posts em um array único
    const allPosts = [...published, ...drafts]

    return right({ 
      postsWithRelations: allPosts
    })
  }
}
