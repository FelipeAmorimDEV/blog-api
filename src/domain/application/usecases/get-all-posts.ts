import { Post } from "@/domain/enterprise/entities/post"
import { PostsRepository } from "../repositories/posts-repository"

interface GetAllPostsUseCaseResponse {
  posts: Post[]
}

export class GetAllPostsUseCase {
  constructor(private postRepository: PostsRepository) {}

  async execute(): Promise<GetAllPostsUseCaseResponse> {
    const posts = await this.postRepository.findAll()

    return { posts }
  }
}

