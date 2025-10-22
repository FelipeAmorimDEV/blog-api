import { DeleteCategoryUseCase } from "@/domain/application/usecases/delete-category";
import { Controller, Delete, HttpCode, Param, NotFoundException } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

@ApiTags('categories')
@Controller('/categories')
export class DeleteCategoryController {
  constructor(private deleteCategoryUseCase: DeleteCategoryUseCase) {}

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ 
    summary: 'Deletar categoria',
    description: 'Remove uma categoria do sistema'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID único da categoria',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 204, 
    description: 'Categoria deletada com sucesso' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Categoria não encontrada' 
  })
  async handle(@Param('id') id: string) {
    const result = await this.deleteCategoryUseCase.execute({ id })

    if (result.isLeft()) {
      throw new NotFoundException(result.value.message)
    }
  }
}
