import { GetPostsByStatusWithRelationsUseCase } from "@/domain/application/usecases/get-posts-by-status-with-relations";
import { Controller, Get, HttpCode, UseGuards, HttpException, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { HttpPostWithNamesPresenter } from "../presenter/http-post-with-names-presenter";
import { JwtAuthGuard } from "../../../auth/jwt-auth.guard";
import { AdminAuthGuard } from "../../../auth/admin-auth.guard";

@ApiTags('admin')
@Controller('/admin/posts')
export class GetPostsByStatusWithRelationsController {
  constructor(private getPostsByStatusWithRelationsUseCase: GetPostsByStatusWithRelationsUseCase) {}

  @Get('by-status/with-relations')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Listar todos os posts com nomes (Admin)',
    description: 'Retorna todos os posts (publicados e rascunhos) com nomes do autor e categoria incluídos no objeto post. Apenas para administradores.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Todos os posts com nomes retornados com sucesso'
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Token JWT inválido ou ausente' 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Acesso negado. Apenas administradores' 
  })
  async handle() {
    const result = await this.getPostsByStatusWithRelationsUseCase.execute()
    
    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    return {
      posts: result.value.postsWithRelations.map(postWithRelations => 
        HttpPostWithNamesPresenter.toHttp(postWithRelations)
      )
    }
  }
}
