import { PostWithRelations } from "@/domain/enterprise/entities/post-with-relations"

export class HttpPostWithRelationsPresenter {
  static toHttp(postWithRelations: PostWithRelations) {
    return {
      post: {
        id: postWithRelations.post.id.toString(),
        title: postWithRelations.post.title,
        content: postWithRelations.post.content,
        excerpt: postWithRelations.post.excerpt,
        slug: postWithRelations.post.slug,
        imagem: postWithRelations.post.imagem,
        publishedAt: postWithRelations.post.publishedAt ?? null,
        isArchived: postWithRelations.post.isArchived ?? false,
        isFeatured: postWithRelations.post.isFeatured ?? false,
        createdAt: postWithRelations.post.createdAt,
        updatedAt: postWithRelations.post.updatedAt,
      },
      author: {
        id: postWithRelations.author.id.toString(),
        name: postWithRelations.author.name,
        email: postWithRelations.author.email,
        role: postWithRelations.author.role,
        avatar: postWithRelations.author.avatar ?? '',
        createdAt: postWithRelations.author.createdAt,
        updatedAt: postWithRelations.author.updatedAt,
      },
      category: {
        id: postWithRelations.category.id.toString(),
        name: postWithRelations.category.name,
        slug: postWithRelations.category.slug,
        createdAt: postWithRelations.category.createdAt,
        updatedAt: postWithRelations.category.updatedAt,
      }
    }
  }
}
