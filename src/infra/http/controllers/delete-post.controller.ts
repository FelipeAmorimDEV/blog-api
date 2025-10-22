import { DeletePostUseCase } from "@/domain/application/usecases/delete-post";
import { Controller, Delete, HttpCode, Param, NotFoundException } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

@ApiTags('posts')
@Controller('/posts')
export class DeletePostController {
  constructor(private deletePostUseCase: DeletePostUseCase) {}

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ 
    summary: 'Deletar post',
    description: 'Remove um post do sistema'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID único do post',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 204, 
    description: 'Post deletado com sucesso' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Post não encontrado' 
  })
  async handle(@Param('id') id: string) {
    const result = await this.deletePostUseCase.execute({ id })

    if (result.isLeft()) {
      throw new NotFoundException(result.value.message)
    }
  }
}
