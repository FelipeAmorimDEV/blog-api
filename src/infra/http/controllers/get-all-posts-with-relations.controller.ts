import { GetAllPostsWithRelationsUseCase } from "@/domain/application/usecases/get-all-posts-with-relations";
import { Controller, Get, HttpCode, HttpException, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { HttpPostWithRelationsPresenter } from "./presenter/http-post-with-relations-presenter";
import { PostsWithRelationsListResponseDto } from "../dtos/post-with-relations-response.dto";

@ApiTags('posts')
@Controller('/posts-with-relations')
export class GetAllPostsWithRelationsController {
  constructor(private getAllPostsWithRelationsUseCase: GetAllPostsWithRelationsUseCase) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Listar todos os posts com relacionamentos',
    description: 'Retorna todos os posts com dados dos autores e categorias'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de posts retornada com sucesso',
    type: PostsWithRelationsListResponseDto
  })
  async handle() {
    const result = await this.getAllPostsWithRelationsUseCase.execute()
    
    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    return { 
      postsWithRelations: result.value.postsWithRelations.map(postWithRelations => 
        HttpPostWithRelationsPresenter.toHttp(postWithRelations)
      )
    }
  }
}
