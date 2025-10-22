import { GetPostBySlugWithRelationsUseCase } from "@/domain/application/usecases/get-post-by-slug-with-relations";
import { Controller, Get, Param, HttpCode, HttpException, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { HttpPostWithRelationsPresenter } from "./presenter/http-post-with-relations-presenter";
import { PostWithRelationsWrapperDto } from "../dtos/post-with-relations-response.dto";

@ApiTags('posts')
@Controller('/posts')
export class GetPostBySlugWithRelationsController {
  constructor(private getPostBySlugWithRelationsUseCase: GetPostBySlugWithRelationsUseCase) {}

  @Get('slug/:slug/with-relations')
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Buscar post por slug com relacionamentos',
    description: 'Retorna um post específico com dados do autor e categoria usando slug'
  })
  @ApiParam({ name: 'slug', description: 'Slug do post' })
  @ApiResponse({ 
    status: 200, 
    description: 'Post encontrado com sucesso',
    type: PostWithRelationsWrapperDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Post não encontrado' 
  })
  async handle(@Param('slug') slug: string) {
    const result = await this.getPostBySlugWithRelationsUseCase.execute({ slug })
    
    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.NOT_FOUND)
    }

    return { 
      postWithRelations: HttpPostWithRelationsPresenter.toHttp(result.value.postWithRelations) 
    }
  }
}
