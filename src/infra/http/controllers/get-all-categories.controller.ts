import { GetAllCategoriesUseCase } from "@/domain/application/usecases/get-all-categories";
import { Controller, Get, HttpCode } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { HttpCategoryPresenter } from "./presenter/http-category-presenter";
import { CategoriesListResponseDto } from "../dtos/category-response.dto";

@ApiTags('categories')
@Controller('/categories')
export class GetAllCategoriesController {
  constructor(private getAllCategoriesUseCase: GetAllCategoriesUseCase) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Listar todas as categorias',
    description: 'Retorna uma lista de todas as categorias'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de categorias retornada com sucesso',
    type: CategoriesListResponseDto
  })
  async handle() {
    const result = await this.getAllCategoriesUseCase.execute()

    if (result.isLeft()) {
      throw new Error('Unexpected error')
    }

    return { categories: HttpCategoryPresenter.toHttpList(result.value.categories) }
  }
}
