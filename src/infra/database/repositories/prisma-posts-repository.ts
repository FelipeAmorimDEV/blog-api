import { Injectable } from '@nestjs/common'
import { PostsRepository } from '@/domain/application/repositories/posts-repository'
import { Post } from '@/domain/enterprise/entities/post'
import { PostWithRelations } from '@/domain/enterprise/entities/post-with-relations'
import { User } from '@/domain/enterprise/entities/user'
import { Category } from '@/domain/enterprise/entities/category'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaPostsRepository implements PostsRepository {
  constructor(private prisma: PrismaService) {}

  async create(post: Post): Promise<void> {
    await this.prisma.post.create({
      data: {
        id: post.id.toString(),
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        slug: post.slug,
        imagem: post.imagem,
        publishedAt: post.publishedAt ?? undefined,
        isArchived: post.isArchived,
        isFeatured: post.isFeatured,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        authorId: post.authorId.toString(),
        categoryId: post.categoryId.toString(),
      },
    })
  }

  async findById(id: string): Promise<Post | null> {
    const post = await this.prisma.post.findUnique({
      where: { id },
    })

    if (!post) {
      return null
    }

    return Post.create(
      {
        authorId: new UniqueEntityID(post.authorId),
        categoryId: new UniqueEntityID(post.categoryId),
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        slug: post.slug,
        imagem: post.imagem,
        publishedAt: post.publishedAt ?? undefined,
        isArchived: post.isArchived,
        isFeatured: post.isFeatured,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      },
      new UniqueEntityID(post.id)
    )
  }

  async findBySlug(slug: string): Promise<Post | null> {
    const post = await this.prisma.post.findUnique({
      where: { slug },
    })

    if (!post) {
      return null
    }

    return Post.create(
      {
        authorId: new UniqueEntityID(post.authorId),
        categoryId: new UniqueEntityID(post.categoryId),
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        slug: post.slug,
        imagem: post.imagem,
        publishedAt: post.publishedAt ?? undefined,
        isArchived: post.isArchived,
        isFeatured: post.isFeatured,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      },
      new UniqueEntityID(post.id)
    )
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return posts.map((post) =>
      Post.create(
        {
          authorId: new UniqueEntityID(post.authorId),
          categoryId: new UniqueEntityID(post.categoryId),
          title: post.title,
          content: post.content,
          excerpt: post.excerpt,
          slug: post.slug,
          imagem: post.imagem,
          publishedAt: post.publishedAt ?? undefined,
          isArchived: post.isArchived,
          isFeatured: post.isFeatured,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        },
        new UniqueEntityID(post.id)
      )
    )
  }

  async update(post: Post): Promise<void> {
    await this.prisma.post.update({
      where: { id: post.id.toString() },
      data: {
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        slug: post.slug,
        imagem: post.imagem,
        publishedAt: post.publishedAt ?? null,
        isArchived: post.isArchived,
        isFeatured: post.isFeatured,
        updatedAt: post.updatedAt,
        authorId: post.authorId.toString(),
        categoryId: post.categoryId.toString(),
      },
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.post.delete({
      where: { id },
    })
  }

  async findByIdWithRelations(id: string): Promise<PostWithRelations | null> {
    const postData = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        category: true,
      },
    })

    if (!postData) {
      return null
    }

    const post = Post.create(
      {
        authorId: new UniqueEntityID(postData.authorId),
        categoryId: new UniqueEntityID(postData.categoryId),
        title: postData.title,
        content: postData.content,
        excerpt: postData.excerpt,
        slug: postData.slug,
        imagem: postData.imagem,
        publishedAt: postData.publishedAt ?? undefined,
        isArchived: postData.isArchived,
        isFeatured: postData.isFeatured,
        createdAt: postData.createdAt,
        updatedAt: postData.updatedAt,
      },
      new UniqueEntityID(postData.id)
    )

    const author = User.create(
      {
        name: postData.author.name,
        email: postData.author.email,
        password: postData.author.password,
        role: postData.author.role,
        avatar: postData.author.avatar ?? undefined,
        createdAt: postData.author.createdAt,
        updatedAt: postData.author.updatedAt,
      },
      new UniqueEntityID(postData.author.id)
    )

    const category = Category.create(
      {
        name: postData.category.name,
        slug: postData.category.slug,
        createdAt: postData.category.createdAt,
        updatedAt: postData.category.updatedAt,
      },
      new UniqueEntityID(postData.category.id)
    )

    return PostWithRelations.create(post, author, category)
  }

  async findBySlugWithRelations(slug: string): Promise<PostWithRelations | null> {
    const postData = await this.prisma.post.findUnique({
      where: { slug },
      include: {
        author: true,
        category: true,
      },
    })

    if (!postData) {
      return null
    }

    const post = Post.create(
      {
        authorId: new UniqueEntityID(postData.authorId),
        categoryId: new UniqueEntityID(postData.categoryId),
        title: postData.title,
        content: postData.content,
        excerpt: postData.excerpt,
        slug: postData.slug,
        imagem: postData.imagem,
        publishedAt: postData.publishedAt ?? undefined,
        isArchived: postData.isArchived,
        isFeatured: postData.isFeatured,
        createdAt: postData.createdAt,
        updatedAt: postData.updatedAt,
      },
      new UniqueEntityID(postData.id)
    )

    const author = User.create(
      {
        name: postData.author.name,
        email: postData.author.email,
        password: postData.author.password,
        role: postData.author.role,
        avatar: postData.author.avatar ?? undefined,
        createdAt: postData.author.createdAt,
        updatedAt: postData.author.updatedAt,
      },
      new UniqueEntityID(postData.author.id)
    )

    const category = Category.create(
      {
        name: postData.category.name,
        slug: postData.category.slug,
        createdAt: postData.category.createdAt,
        updatedAt: postData.category.updatedAt,
      },
      new UniqueEntityID(postData.category.id)
    )

    return PostWithRelations.create(post, author, category)
  }

  async findAllWithRelations(): Promise<PostWithRelations[]> {
    const postsData = await this.prisma.post.findMany({
      include: {
        author: true,
        category: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return postsData.map((postData) => {
      const post = Post.create(
        {
          authorId: new UniqueEntityID(postData.authorId),
          categoryId: new UniqueEntityID(postData.categoryId),
          title: postData.title,
          content: postData.content,
          excerpt: postData.excerpt,
          slug: postData.slug,
          imagem: postData.imagem,
          publishedAt: postData.publishedAt ?? undefined,
          isArchived: postData.isArchived,
          isFeatured: postData.isFeatured,
          createdAt: postData.createdAt,
          updatedAt: postData.updatedAt,
        },
        new UniqueEntityID(postData.id)
      )

      const author = User.create(
        {
          name: postData.author.name,
          email: postData.author.email,
          password: postData.author.password,
          role: postData.author.role,
          avatar: postData.author.avatar ?? undefined,
          createdAt: postData.author.createdAt,
          updatedAt: postData.author.updatedAt,
        },
        new UniqueEntityID(postData.author.id)
      )

      const category = Category.create(
        {
          name: postData.category.name,
          slug: postData.category.slug,
          createdAt: postData.category.createdAt,
          updatedAt: postData.category.updatedAt,
        },
        new UniqueEntityID(postData.category.id)
      )

      return PostWithRelations.create(post, author, category)
    })
  }

  async findPublished(): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({
      where: { publishedAt: { not: null } },
      orderBy: { createdAt: 'desc' },
    })

    return posts.map((post) =>
      Post.create(
        {
          authorId: new UniqueEntityID(post.authorId),
          categoryId: new UniqueEntityID(post.categoryId),
          title: post.title,
          content: post.content,
          excerpt: post.excerpt,
          slug: post.slug,
          imagem: post.imagem,
          publishedAt: post.publishedAt ?? undefined,
          isArchived: post.isArchived,
          isFeatured: post.isFeatured,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        },
        new UniqueEntityID(post.id)
      )
    )
  }

  async findDrafts(): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({
      where: { publishedAt: null },
      orderBy: { createdAt: 'desc' },
    })

    return posts.map((post) =>
      Post.create(
        {
          authorId: new UniqueEntityID(post.authorId),
          categoryId: new UniqueEntityID(post.categoryId),
          title: post.title,
          content: post.content,
          excerpt: post.excerpt,
          slug: post.slug,
          imagem: post.imagem,
          publishedAt: post.publishedAt ?? undefined,
          isArchived: post.isArchived,
          isFeatured: post.isFeatured,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        },
        new UniqueEntityID(post.id)
      )
    )
  }

  async findPublishedWithRelations(): Promise<PostWithRelations[]> {
    const postsData = await this.prisma.post.findMany({
      where: { publishedAt: { not: null } },
      include: {
        author: true,
        category: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return postsData.map((postData) => {
      const post = Post.create(
        {
          authorId: new UniqueEntityID(postData.authorId),
          categoryId: new UniqueEntityID(postData.categoryId),
          title: postData.title,
          content: postData.content,
          excerpt: postData.excerpt,
          slug: postData.slug,
          imagem: postData.imagem,
          publishedAt: postData.publishedAt ?? undefined,
          isArchived: postData.isArchived,
          isFeatured: postData.isFeatured,
          createdAt: postData.createdAt,
          updatedAt: postData.updatedAt,
        },
        new UniqueEntityID(postData.id)
      )

      const author = User.create(
        {
          name: postData.author.name,
          email: postData.author.email,
          password: postData.author.password,
          role: postData.author.role,
          avatar: postData.author.avatar ?? undefined,
          createdAt: postData.author.createdAt,
          updatedAt: postData.author.updatedAt,
        },
        new UniqueEntityID(postData.author.id)
      )

      const category = Category.create(
        {
          name: postData.category.name,
          slug: postData.category.slug,
          createdAt: postData.category.createdAt,
          updatedAt: postData.category.updatedAt,
        },
        new UniqueEntityID(postData.category.id)
      )

      return PostWithRelations.create(post, author, category)
    })
  }

  async findDraftsWithRelations(): Promise<PostWithRelations[]> {
    const postsData = await this.prisma.post.findMany({
      where: { publishedAt: null },
      include: {
        author: true,
        category: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return postsData.map((postData) => {
      const post = Post.create(
        {
          authorId: new UniqueEntityID(postData.authorId),
          categoryId: new UniqueEntityID(postData.categoryId),
          title: postData.title,
          content: postData.content,
          excerpt: postData.excerpt,
          slug: postData.slug,
          imagem: postData.imagem,
          publishedAt: postData.publishedAt ?? undefined,
          isArchived: postData.isArchived,
          isFeatured: postData.isFeatured,
          createdAt: postData.createdAt,
          updatedAt: postData.updatedAt,
        },
        new UniqueEntityID(postData.id)
      )

      const author = User.create(
        {
          name: postData.author.name,
          email: postData.author.email,
          password: postData.author.password,
          role: postData.author.role,
          avatar: postData.author.avatar ?? undefined,
          createdAt: postData.author.createdAt,
          updatedAt: postData.author.updatedAt,
        },
        new UniqueEntityID(postData.author.id)
      )

      const category = Category.create(
        {
          name: postData.category.name,
          slug: postData.category.slug,
          createdAt: postData.category.createdAt,
          updatedAt: postData.category.updatedAt,
        },
        new UniqueEntityID(postData.category.id)
      )

      return PostWithRelations.create(post, author, category)
    })
  }
}

