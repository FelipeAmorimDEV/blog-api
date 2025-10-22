import { GetPostBySlugUseCase } from "@/domain/application/usecases/get-post-by-slug";
import { Controller, Get, Param, HttpCode, HttpException, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { HttpPostPresenter } from "./presenter/http-post-presenter";
import { PostResponseWrapperDto } from "../dtos/post-response.dto";

@ApiTags('posts')
@Controller('/posts')
export class GetPostBySlugController {
  constructor(private getPostBySlugUseCase: GetPostBySlugUseCase) {}

  @Get('slug/:slug')
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Buscar post por slug',
    description: 'Retorna um post específico usando seu slug'
  })
  @ApiParam({ name: 'slug', description: 'Slug do post' })
  @ApiResponse({ 
    status: 200, 
    description: 'Post encontrado com sucesso',
    type: PostResponseWrapperDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Post não encontrado' 
  })
  async handle(@Param('slug') slug: string) {
    const result = await this.getPostBySlugUseCase.execute({ slug })
    
    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.NOT_FOUND)
    }

    return { post: HttpPostPresenter.toHttp(result.value.post) }
  }
}
