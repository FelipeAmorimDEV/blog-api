import { GetPostsByStatusUseCase } from "@/domain/application/usecases/get-posts-by-status";
import { Controller, Get, HttpCode, UseGuards, HttpException, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { HttpPostPresenter } from "../presenter/http-post-presenter";
import { JwtAuthGuard } from "../../../auth/jwt-auth.guard";
import { AdminAuthGuard } from "../../../auth/admin-auth.guard";

@ApiTags('admin')
@Controller('/admin/posts')
export class GetPostsByStatusController {
  constructor(private getPostsByStatusUseCase: GetPostsByStatusUseCase) {}

  @Get('by-status')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Listar todos os posts (Admin)',
    description: 'Retorna todos os posts (publicados e rascunhos) em um array único. Apenas para administradores.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Todos os posts retornados com sucesso'
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
    const result = await this.getPostsByStatusUseCase.execute()
    
    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    return {
      posts: result.value.posts.map(post => HttpPostPresenter.toHttp(post))
    }
  }
}
