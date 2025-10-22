import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { PrismaUsersRepository } from './repositories/prisma-users-repository'
import { PrismaCategoriesRepository } from './repositories/prisma-categories-repository'
import { PrismaPostsRepository } from './repositories/prisma-posts-repository'
import { UsersRepository } from "@/domain/application/repositories/users-repository";
import { CategoriesRepository } from "@/domain/application/repositories/categories-repository";
import { PostsRepository } from "@/domain/application/repositories/posts-repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: CategoriesRepository,
      useClass: PrismaCategoriesRepository,
    },
    {
      provide: PostsRepository,
      useClass: PrismaPostsRepository,
    },
  ],
  exports: [
    PrismaService,
    UsersRepository,
    CategoriesRepository,
    PostsRepository,
  ],
})
export class DatabaseModule {}