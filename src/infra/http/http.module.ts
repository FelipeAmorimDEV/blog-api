import { Module } from "@nestjs/common";
import { CreateAccountController } from "./controllers/create-account.controller";
import { CreatePostController } from "./controllers/create-post.controller";
import { GetAllPostsController } from "./controllers/get-all-posts.controller";
import { GetPostByIdController } from "./controllers/get-post-by-id.controller";
import { UpdatePostController } from "./controllers/update-post.controller";
import { DeletePostController } from "./controllers/delete-post.controller";
import { AuthenticateUserController } from "./controllers/authenticate-user.controller";
import { CreateCategoryController } from "./controllers/create-category.controller";
import { GetAllCategoriesController } from "./controllers/get-all-categories.controller";
import { GetAllUsersController } from "./controllers/get-all-users.controller";
import { GetUserByIdController } from "./controllers/get-user-by-id.controller";
import { UpdateUserController } from "./controllers/update-user.controller";
import { DeleteUserController } from "./controllers/delete-user.controller";
import { GetCategoryByIdController } from "./controllers/get-category-by-id.controller";
import { UpdateCategoryController } from "./controllers/update-category.controller";
import { DeleteCategoryController } from "./controllers/delete-category.controller";
import { GetPostWithRelationsController } from "./controllers/get-post-with-relations.controller";
import { GetAllPostsWithRelationsController } from "./controllers/get-all-posts-with-relations.controller";
import { GetPostBySlugController } from "./controllers/get-post-by-slug.controller";
import { GetPostBySlugWithRelationsController } from "./controllers/get-post-by-slug-with-relations.controller";
import { PublishPostController } from "./controllers/publish-post.controller";
import { PublishPostBySlugController } from "./controllers/publish-post-by-slug.controller";
import { GetPostsByStatusController } from "./controllers/admin/get-posts-by-status.controller";
import { GetPostsByStatusWithRelationsController } from "./controllers/admin/get-posts-by-status-with-relations.controller";
import { CreateUserUseCase } from "@/domain/application/usecases/create-user";
import { AuthenticateUserUseCase } from "@/domain/application/usecases/authenticate-user";
import { CreatePostUseCase } from "@/domain/application/usecases/create-post";
import { GetAllPostsUseCase } from "@/domain/application/usecases/get-all-posts";
import { GetPostByIdUseCase } from "@/domain/application/usecases/get-post-by-id";
import { UpdatePostUseCase } from "@/domain/application/usecases/update-post";
import { DeletePostUseCase } from "@/domain/application/usecases/delete-post";
import { CreateCategoryUseCase } from "@/domain/application/usecases/create-category";
import { GetAllCategoriesUseCase } from "@/domain/application/usecases/get-all-categories";
import { GetAllUsersUseCase } from "@/domain/application/usecases/get-all-users";
import { GetUserByIdUseCase } from "@/domain/application/usecases/get-user-by-id";
import { UpdateUserUseCase } from "@/domain/application/usecases/update-user";
import { DeleteUserUseCase } from "@/domain/application/usecases/delete-user";
import { GetCategoryByIdUseCase } from "@/domain/application/usecases/get-category-by-id";
import { UpdateCategoryUseCase } from "@/domain/application/usecases/update-category";
import { DeleteCategoryUseCase } from "@/domain/application/usecases/delete-category";
import { GetPostWithRelationsUseCase } from "@/domain/application/usecases/get-post-with-relations";
import { GetAllPostsWithRelationsUseCase } from "@/domain/application/usecases/get-all-posts-with-relations";
import { GetPostBySlugUseCase } from "@/domain/application/usecases/get-post-by-slug";
import { GetPostBySlugWithRelationsUseCase } from "@/domain/application/usecases/get-post-by-slug-with-relations";
import { PublishPostUseCase } from "@/domain/application/usecases/publish-post";
import { PublishPostBySlugUseCase } from "@/domain/application/usecases/publish-post-by-slug";
import { GetPostsByStatusUseCase } from "@/domain/application/usecases/get-posts-by-status";
import { GetPostsByStatusWithRelationsUseCase } from "@/domain/application/usecases/get-posts-by-status-with-relations";
import { DatabaseModule } from "../database/database.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [
    CreateAccountController, 
    CreatePostController,
    GetAllPostsController,
    GetPostByIdController,
    UpdatePostController,
    DeletePostController,
    AuthenticateUserController,
    CreateCategoryController,
    GetAllCategoriesController,
    GetAllUsersController,
    GetUserByIdController,
    UpdateUserController,
    DeleteUserController,
    GetCategoryByIdController,
    UpdateCategoryController,
    DeleteCategoryController,
    GetPostWithRelationsController,
    GetAllPostsWithRelationsController,
    GetPostBySlugController,
    GetPostBySlugWithRelationsController,
    PublishPostController,
    PublishPostBySlugController,
    GetPostsByStatusController,
    GetPostsByStatusWithRelationsController
  ],
  providers: [
    CreateUserUseCase,
    AuthenticateUserUseCase,
    CreatePostUseCase,
    GetAllPostsUseCase,
    GetPostByIdUseCase,
    UpdatePostUseCase,
    DeletePostUseCase,
    CreateCategoryUseCase,
    GetAllCategoriesUseCase,
    GetAllUsersUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    GetCategoryByIdUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
    GetPostWithRelationsUseCase,
    GetAllPostsWithRelationsUseCase,
    GetPostBySlugUseCase,
    GetPostBySlugWithRelationsUseCase,
    PublishPostUseCase,
    PublishPostBySlugUseCase,
    GetPostsByStatusUseCase,
    GetPostsByStatusWithRelationsUseCase
  ]
})
export class HttpModule {}