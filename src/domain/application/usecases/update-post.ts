import { Post } from "@/domain/enterprise/entities/post"
import { PostsRepository } from "../repositories/posts-repository"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { slugify } from "@/core/utils/slugify"
import { Injectable } from "@nestjs/common"
import { Either, left, right } from "@/core/either"

interface UpdatePostUseCaseRequest {
  id: string
  title?: string
  content?: string
  excerpt?: string
  categoryId?: string
  publishedAt?: string | null
}

type UpdatePostUseCaseResponse = Either<
  { message: string },
  { post: Post }
>

@Injectable()
export class UpdatePostUseCase {
  constructor(private postRepository: PostsRepository) {}

  async execute(request: UpdatePostUseCaseRequest): Promise<UpdatePostUseCaseResponse> {
    const { id, title, content, excerpt, categoryId, publishedAt } = request

    const post = await this.postRepository.findById(id)

    if (!post) {
      return left({ message: 'Resource not found' })
    }

    if (title) {
      post.title = title
      post.slug = slugify(title)
    }

    if (content) {
      post.content = content
    }

    if (excerpt) {
      post.excerpt = excerpt
    }

    if (categoryId) {
      post.categoryId = new UniqueEntityID(categoryId)
    }
    
    if (publishedAt !== undefined) {
      if (publishedAt === null || publishedAt === 'null') {
        post.publishedAt = undefined
      } else {
        post.publishedAt = new Date(publishedAt)
      }
    }

    await this.postRepository.update(post)

    return right({ post })
  }
}
