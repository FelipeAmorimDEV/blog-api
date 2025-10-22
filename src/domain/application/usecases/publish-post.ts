import { Post } from "@/domain/enterprise/entities/post"
import { PostsRepository } from "../repositories/posts-repository"
import { Either, left, right } from "@/core/either"
import { Injectable } from "@nestjs/common"

interface PublishPostUseCaseRequest {
  id: string
}

type PublishPostUseCaseResponse = Either<
  { message: string },
  { post: Post }
>

@Injectable()
export class PublishPostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(request: PublishPostUseCaseRequest): Promise<PublishPostUseCaseResponse> {
    const { id } = request

    const post = await this.postsRepository.findById(id)

    if (!post) {
      return left({ message: 'Post não encontrado' })
    }

    // Toggle: se já está publicado, despublicar; se não está, publicar
    const newPublishedAt = post.publishedAt ? undefined : new Date()

    // Atualizar o post com o novo status
    const updatedPost = Post.create(
      {
        authorId: post.authorId,
        categoryId: post.categoryId,
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        slug: post.slug,
        imagem: post.imagem,
        publishedAt: newPublishedAt,
        isArchived: post.isArchived,
        isFeatured: post.isFeatured,
        createdAt: post.createdAt,
        updatedAt: new Date(),
      },
      post.id
    )

    await this.postsRepository.update(updatedPost)

    return right({ post: updatedPost })
  }
}
