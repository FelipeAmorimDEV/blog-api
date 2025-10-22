import { GetPostByIdUseCase } from "@/domain/application/usecases/get-post-by-id";
import { Controller, Get, HttpCode, Param, NotFoundException } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { HttpPostPresenter } from "./presenter/http-post-presenter";
import { PostResponseWrapperDto } from "../dtos/post-response.dto";

@ApiTags('posts')
@Controller('/posts')
export class GetPostByIdController {
  constructor(private getPostByIdUseCase: GetPostByIdUseCase) {}

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Buscar post por ID',
    description: 'Retorna os dados de um post específico'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID único do post',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Post encontrado',
    type: PostResponseWrapperDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Post não encontrado' 
  })
  async handle(@Param('id') id: string) {
    const result = await this.getPostByIdUseCase.execute({ id })

    if (result.isLeft()) {
      throw new NotFoundException(result.value.message)
    }

    return { post: HttpPostPresenter.toHttp(result.value.post) }
  }
}
