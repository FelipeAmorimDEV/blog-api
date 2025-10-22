import { GetPostWithRelationsUseCase } from "@/domain/application/usecases/get-post-with-relations";
import { Controller, Get, Param, HttpCode, HttpException, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { HttpPostWithRelationsPresenter } from "./presenter/http-post-with-relations-presenter";
import { PostWithRelationsWrapperDto } from "../dtos/post-with-relations-response.dto";

@ApiTags('posts')
@Controller('/posts')
export class GetPostWithRelationsController {
  constructor(private getPostWithRelationsUseCase: GetPostWithRelationsUseCase) {}

  @Get(':id/with-relations')
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Buscar post por ID com relacionamentos',
    description: 'Retorna um post específico com dados do autor e categoria'
  })
  @ApiParam({ name: 'id', description: 'ID do post' })
  @ApiResponse({ 
    status: 200, 
    description: 'Post encontrado com sucesso',
    type: PostWithRelationsWrapperDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Post não encontrado' 
  })
  async handle(@Param('id') id: string) {
    const result = await this.getPostWithRelationsUseCase.execute({ id })
    
    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.NOT_FOUND)
    }

    return { 
      postWithRelations: HttpPostWithRelationsPresenter.toHttp(result.value.postWithRelations) 
    }
  }
}
