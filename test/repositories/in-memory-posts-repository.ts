import { PostsRepository } from "@/domain/application/repositories/posts-repository"
import { Post } from "@/domain/enterprise/entities/post"
import { PostWithRelations } from "@/domain/enterprise/entities/post-with-relations"
import { User } from "@/domain/enterprise/entities/user"
import { Category } from "@/domain/enterprise/entities/category"

export class InMemoryPostsRepository implements PostsRepository {
  public items: Post[] = []
  
  findById(id: string): Promise<Post | null> {
    return Promise.resolve(this.items.find(item => item.id.toString() === id) || null)
  }

  findBySlug(slug: string): Promise<Post | null> {
    return Promise.resolve(this.items.find(item => item.slug === slug) || null)
  }

  findByIdWithRelations(id: string): Promise<PostWithRelations | null> {
    const post = this.items.find(item => item.id.toString() === id)
    if (!post) return Promise.resolve(null)

    // Mock data for relations
    const author = User.create({
      name: 'Author Name',
      email: 'author@example.com',
      password: 'password',
      role: 'user'
    })

    const category = Category.create({
      name: 'Category Name',
      slug: 'category-name'
    })

    const postWithRelations = PostWithRelations.create({
      id: post.id,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      slug: post.slug,
      imagem: post.imagem,
      publishedAt: post.publishedAt,
      isArchived: post.isArchived,
      isFeatured: post.isFeatured,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      authorId: post.authorId,
      categoryId: post.categoryId,
      author: author,
      category: category
    })

    return Promise.resolve(postWithRelations)
  }

  findBySlugWithRelations(slug: string): Promise<PostWithRelations | null> {
    const post = this.items.find(item => item.slug === slug)
    if (!post) return Promise.resolve(null)

    // Mock data for relations
    const author = User.create({
      name: 'Author Name',
      email: 'author@example.com',
      password: 'password',
      role: 'user'
    })

    const category = Category.create({
      name: 'Category Name',
      slug: 'category-name'
    })

    const postWithRelations = PostWithRelations.create({
      id: post.id,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      slug: post.slug,
      imagem: post.imagem,
      publishedAt: post.publishedAt,
      isArchived: post.isArchived,
      isFeatured: post.isFeatured,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      authorId: post.authorId,
      categoryId: post.categoryId,
      author: author,
      category: category
    })

    return Promise.resolve(postWithRelations)
  }

  findAll(): Promise<Post[]> {
    return Promise.resolve(this.items)
  }

  findAllWithRelations(): Promise<PostWithRelations[]> {
    return Promise.resolve(
      this.items.map(post => {
        // Mock data for relations
        const author = User.create({
          name: 'Author Name',
          email: 'author@example.com',
          password: 'password',
          role: 'user'
        })

        const category = Category.create({
          name: 'Category Name',
          slug: 'category-name'
        })

        return PostWithRelations.create({
          id: post.id,
          title: post.title,
          content: post.content,
          excerpt: post.excerpt,
          slug: post.slug,
          imagem: post.imagem,
          publishedAt: post.publishedAt,
          isArchived: post.isArchived,
          isFeatured: post.isFeatured,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          authorId: post.authorId,
          categoryId: post.categoryId,
          author: author,
          category: category
        })
      })
    )
  }

  findPublished(): Promise<Post[]> {
    return Promise.resolve(this.items.filter(post => post.publishedAt !== undefined))
  }

  findDrafts(): Promise<Post[]> {
    return Promise.resolve(this.items.filter(post => post.publishedAt === undefined))
  }

  findPublishedWithRelations(): Promise<PostWithRelations[]> {
    const publishedPosts = this.items.filter(post => post.publishedAt !== undefined)
    return Promise.resolve(
      publishedPosts.map(post => {
        // Mock data for relations
        const author = User.create({
          name: 'Author Name',
          email: 'author@example.com',
          password: 'password',
          role: 'user'
        })

        const category = Category.create({
          name: 'Category Name',
          slug: 'category-name'
        })

        return PostWithRelations.create({
          id: post.id,
          title: post.title,
          content: post.content,
          excerpt: post.excerpt,
          slug: post.slug,
          imagem: post.imagem,
          publishedAt: post.publishedAt,
          isArchived: post.isArchived,
          isFeatured: post.isFeatured,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          authorId: post.authorId,
          categoryId: post.categoryId,
          author: author,
          category: category
        })
      })
    )
  }

  findDraftsWithRelations(): Promise<PostWithRelations[]> {
    const draftPosts = this.items.filter(post => post.publishedAt === undefined)
    return Promise.resolve(
      draftPosts.map(post => {
        // Mock data for relations
        const author = User.create({
          name: 'Author Name',
          email: 'author@example.com',
          password: 'password',
          role: 'user'
        })

        const category = Category.create({
          name: 'Category Name',
          slug: 'category-name'
        })

        return PostWithRelations.create({
          id: post.id,
          title: post.title,
          content: post.content,
          excerpt: post.excerpt,
          slug: post.slug,
          imagem: post.imagem,
          publishedAt: post.publishedAt,
          isArchived: post.isArchived,
          isFeatured: post.isFeatured,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          authorId: post.authorId,
          categoryId: post.categoryId,
          author: author,
          category: category
        })
      })
    )
  }

  update(post: Post): Promise<void> {
    const index = this.items.findIndex(item => item.id.toString() === post.id.toString())
    this.items[index] = post
    return Promise.resolve()
  }

  delete(id: string): Promise<void> {
    this.items = this.items.filter(item => item.id.toString() !== id)
    return Promise.resolve()
  }

  async create(post: Post): Promise<void> {
    this.items.push(post)
  }
}