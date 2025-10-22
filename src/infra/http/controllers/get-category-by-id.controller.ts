import { GetCategoryByIdUseCase } from "@/domain/application/usecases/get-category-by-id";
import { Controller, Get, HttpCode, Param, NotFoundException } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { HttpCategoryPresenter } from "./presenter/http-category-presenter";
import { CategoryResponseWrapperDto } from "../dtos/category-response.dto";

@ApiTags('categories')
@Controller('/categories')
export class GetCategoryByIdController {
  constructor(private getCategoryByIdUseCase: GetCategoryByIdUseCase) {}

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Buscar categoria por ID',
    description: 'Retorna os dados de uma categoria específica'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID único da categoria',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Categoria encontrada',
    type: CategoryResponseWrapperDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Categoria não encontrada' 
  })
  async handle(@Param('id') id: string) {
    const result = await this.getCategoryByIdUseCase.execute({ id })

    if (result.isLeft()) {
      throw new NotFoundException(result.value.message)
    }

    return { category: HttpCategoryPresenter.toHttp(result.value.category) }
  }
}
