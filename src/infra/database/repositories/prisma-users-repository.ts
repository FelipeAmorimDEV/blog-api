import { Injectable } from '@nestjs/common'
import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { User } from '@/domain/enterprise/entities/user'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        avatar: user.avatar ?? undefined,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    })
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      return null
    }

    return User.create(
      {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        avatar: user.avatar ?? undefined,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      new UniqueEntityID(user.id)
    )
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return null
    }

    return User.create(
      {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        avatar: user.avatar ?? undefined,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      new UniqueEntityID(user.id)
    )
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return users.map((user) =>
      User.create(
        {
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
          avatar: user.avatar ?? undefined,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        new UniqueEntityID(user.id)
      )
    )
  }

  async update(user: User): Promise<void> {
    await this.prisma.user.update({
      where: { id: user.id.toString() },
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        avatar: user.avatar ?? undefined,
        updatedAt: user.updatedAt,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    })
  }
}

