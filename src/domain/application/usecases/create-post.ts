import { Post } from "@/domain/enterprise/entities/post"
import { PostsRepository } from "../repositories/posts-repository"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { slugify } from "@/core/utils/slugify"

interface CreatePostUseCaseRequest {
  title: string
  content: string
  excerpt: string
  authorId: string
  categoryId: string
}

interface CreatePostUseCaseResponse {
  post: Post
}

export class CreatePostUseCase {
  constructor(private postRepository: PostsRepository) {}

  async execute(request: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {
    const { title, content, excerpt, authorId, categoryId } = request

    const post = Post.create({
      title,
      content,
      excerpt,
      authorId: new UniqueEntityID(authorId),
      categoryId: new UniqueEntityID(categoryId),
      slug: slugify(title)
    })

    await this.postRepository.create(post)

    return { post }
  }
}
