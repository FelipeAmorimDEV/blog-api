import { Injectable } from '@nestjs/common'
import { PostsRepository } from '@/domain/application/repositories/posts-repository'
import { Post } from '@/domain/enterprise/entities/post'
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
        publishedAt: post.publishedAt,
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
        publishedAt: post.publishedAt,
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
          publishedAt: post.publishedAt,
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
        publishedAt: post.publishedAt,
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
}

