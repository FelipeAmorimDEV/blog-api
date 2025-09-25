import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { PrismaUsersRepository } from './repositories/prisma-users-repository'
import { PrismaCategoriesRepository } from './repositories/prisma-categories-repository'
import { PrismaPostsRepository } from './repositories/prisma-posts-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: 'UsersRepository',
      useClass: PrismaUsersRepository,
    },
    {
      provide: 'CategoriesRepository',
      useClass: PrismaCategoriesRepository,
    },
    {
      provide: 'PostsRepository',
      useClass: PrismaPostsRepository,
    },
  ],
  exports: [
    PrismaService,
    'UsersRepository',
    'CategoriesRepository',
    'PostsRepository',
  ],
})
export class DatabaseModule {}