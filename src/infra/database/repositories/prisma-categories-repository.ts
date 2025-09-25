import { Injectable } from '@nestjs/common'
import { CategoriesRepository } from '@/domain/application/repositories/categories-repository'
import { Category } from '@/domain/enterprise/entities/category'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaCategoriesRepository implements CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async create(category: Category): Promise<void> {
    await this.prisma.category.create({
      data: {
        id: category.id.toString(),
        name: category.name,
        slug: category.slug,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      },
    })
  }

  async findById(id: string): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    })

    if (!category) {
      return null
    }

    return Category.create(
      {
        name: category.name,
        slug: category.slug,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      },
      new UniqueEntityID(category.id)
    )
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return categories.map((category) =>
      Category.create(
        {
          name: category.name,
          slug: category.slug,
          createdAt: category.createdAt,
          updatedAt: category.updatedAt,
        },
        new UniqueEntityID(category.id)
      )
    )
  }

  async update(category: Category): Promise<void> {
    await this.prisma.category.update({
      where: { id: category.id.toString() },
      data: {
        name: category.name,
        slug: category.slug,
        updatedAt: category.updatedAt,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.category.delete({
      where: { id },
    })
  }
}

