import { GetAllPostsUseCase } from "@/domain/application/usecases/get-all-posts";
import { Controller, Get, HttpCode } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { HttpPostPresenter } from "./presenter/http-post-presenter";
import { PostsListResponseDto } from "../dtos/post-response.dto";

@ApiTags('posts')
@Controller('/posts')
export class GetAllPostsController {
  constructor(private getAllPostsUseCase: GetAllPostsUseCase) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Listar todos os posts',
    description: 'Retorna uma lista de todos os posts'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de posts retornada com sucesso',
    type: PostsListResponseDto
  })
  async handle() {
    const result = await this.getAllPostsUseCase.execute()

    if (result.isLeft()) {
      throw new Error('Unexpected error')
    }

    return { posts: HttpPostPresenter.toHttpList(result.value.posts) }
  }
}
