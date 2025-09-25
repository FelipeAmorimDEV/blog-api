import { Post } from "@/domain/enterprise/entities/post"
import { PostsRepository } from "../repositories/posts-repository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { slugify } from "@/core/utils/slugify"

interface UpdatePostUseCaseRequest {
  id: string
  title?: string
  content?: string
  excerpt?: string
  categoryId?: string
}

interface UpdatePostUseCaseResponse {
  post: Post
}

export class UpdatePostUseCase {
  constructor(private postRepository: PostsRepository) {}

  async execute(request: UpdatePostUseCaseRequest): Promise<UpdatePostUseCaseResponse> {
    const { id, title, content, excerpt, categoryId } = request

    const post = await this.postRepository.findById(id)

    if (!post) {
      throw new ResourceNotFoundError()
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

    await this.postRepository.update(post)

    return { post }
  }
}
