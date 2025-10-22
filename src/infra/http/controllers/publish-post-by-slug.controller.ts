import { PublishPostBySlugUseCase } from "@/domain/application/usecases/publish-post-by-slug";
import { Controller, Patch, Param, HttpCode, UseGuards, HttpException, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from "@nestjs/swagger";
import { HttpPostPresenter } from "./presenter/http-post-presenter";
import { PostResponseWrapperDto } from "../dtos/post-response.dto";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { CurrentUser } from "../../auth/current-user.decorator";
import { User } from "@/domain/enterprise/entities/user";

@ApiTags('posts')
@Controller('/posts')
export class PublishPostBySlugController {
  constructor(private publishPostBySlugUseCase: PublishPostBySlugUseCase) {}

  @Patch('slug/:slug/publish')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Publicar/Despublicar um post por slug',
    description: 'Alterna o status de publicação do post usando slug. Se publicado, despublica; se rascunho, publica. Requer autenticação JWT.'
  })
  @ApiParam({ name: 'slug', description: 'Slug do post' })
  @ApiResponse({ 
    status: 200, 
    description: 'Status de publicação alterado com sucesso',
    type: PostResponseWrapperDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Post não encontrado' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Token JWT inválido ou ausente' 
  })
  async handle(
    @Param('slug') slug: string,
    @CurrentUser() user: User
  ) {
    const result = await this.publishPostBySlugUseCase.execute({ slug })
    
    if (result.isLeft()) {
      if (result.value.message === 'Post não encontrado') {
        throw new HttpException('Post não encontrado', HttpStatus.NOT_FOUND)
      }
      throw new HttpException('Erro interno do servidor', HttpStatus.INTERNAL_SERVER_ERROR)
    }

    return { post: HttpPostPresenter.toHttp(result.value.post) }
  }
}
