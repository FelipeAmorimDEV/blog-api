import { PostWithRelations } from "@/domain/enterprise/entities/post-with-relations"

export class HttpPostWithNamesPresenter {
  static toHttp(postWithRelations: PostWithRelations) {
    return {
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
      authorName: postWithRelations.author.name,
      authorId: postWithRelations.author.id.toString(),
      categoryName: postWithRelations.category.name,
      categoryId: postWithRelations.category.id.toString(),
    }
  }
}
