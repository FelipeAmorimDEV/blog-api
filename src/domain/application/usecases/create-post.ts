import { Post } from "@/domain/enterprise/entities/post"
import { PostsRepository } from "../repositories/posts-repository"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { slugify } from "@/core/utils/slugify"
import { generateExcerpt } from "@/core/utils/generate-excerpt"
import { Injectable } from "@nestjs/common"
import { Either, left, right } from "@/core/either"

interface CreatePostUseCaseRequest {
  title: string
  content: string
  imagem?: string
  authorId: string
  categoryId: string
}

type CreatePostUseCaseResponse = Either<
  { message: string },
  { post: Post }
>

@Injectable()
export class CreatePostUseCase {
  constructor(private postRepository: PostsRepository) {}

  async execute(request: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {
    const { title, content, imagem, authorId, categoryId } = request

    const post = Post.create({
      title,
      content,
      excerpt: generateExcerpt(content),
      imagem: imagem || "",
      authorId: new UniqueEntityID(authorId),
      categoryId: new UniqueEntityID(categoryId),
      slug: slugify(title)
    })

    await this.postRepository.create(post)

    return right({ post })
  }
}
