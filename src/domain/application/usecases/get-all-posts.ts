import { Post } from "@/domain/enterprise/entities/post"
import { PostsRepository } from "../repositories/posts-repository"
import { Injectable } from "@nestjs/common"
import { Either, right } from "@/core/either"

type GetAllPostsUseCaseResponse = Either<
  never,
  { posts: Post[] }
>

@Injectable()
export class GetAllPostsUseCase {
  constructor(private postRepository: PostsRepository) {}

  async execute(): Promise<GetAllPostsUseCaseResponse> {
    const posts = await this.postRepository.findAll()

    return right({ posts })
  }
}

