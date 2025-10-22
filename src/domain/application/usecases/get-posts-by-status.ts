import { Post } from "@/domain/enterprise/entities/post"
import { PostsRepository } from "../repositories/posts-repository"
import { Either, left, right } from "@/core/either"
import { Injectable } from "@nestjs/common"

type GetPostsByStatusUseCaseResponse = Either<
  { message: string },
  { posts: Post[] }
>

@Injectable()
export class GetPostsByStatusUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(): Promise<GetPostsByStatusUseCaseResponse> {
    const [published, drafts] = await Promise.all([
      this.postsRepository.findPublished(),
      this.postsRepository.findDrafts()
    ])

    // Combinar todos os posts em um array único
    const allPosts = [...published, ...drafts]

    return right({ 
      posts: allPosts
    })
  }
}
