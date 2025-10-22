import { Post } from "@/domain/enterprise/entities/post"

export class HttpPostPresenter {
  static toHttp(post: Post) {
    return {
      id: post.id.toString(),
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      slug: post.slug,
      imagem: post.imagem,
      publishedAt: post.publishedAt ?? null,
      isArchived: post.isArchived ?? false,
      isFeatured: post.isFeatured ?? false,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      authorId: post.authorId.toString(),
      categoryId: post.categoryId.toString(),
    }
  }

  static toHttpList(posts: Post[]) {
    return posts.map(HttpPostPresenter.toHttp)
  }
}