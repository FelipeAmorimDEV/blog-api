import { UpdateCategoryUseCase } from "@/domain/application/usecases/update-category";
import { Body, Controller, HttpCode, Param, Put, NotFoundException } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from "@nestjs/swagger";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { HttpCategoryPresenter } from "./presenter/http-category-presenter";
import { UpdateCategoryDto } from "../dtos/update-category.dto";
import { CategoryResponseWrapperDto } from "../dtos/category-response.dto";

const updateCategoryBodySchema = z.object({
  name: z.string().optional(),
}).partial()

type UpdateCategoryBodySchema = z.infer<typeof updateCategoryBodySchema>

@ApiTags('categories')
@Controller('/categories')
export class UpdateCategoryController {
  constructor(private updateCategoryUseCase: UpdateCategoryUseCase) {}

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Atualizar categoria',
    description: 'Atualiza os dados de uma categoria específica'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID único da categoria',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Categoria atualizada com sucesso',
    type: CategoryResponseWrapperDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Categoria não encontrada' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados de validação inválidos' 
  })
  async handle(@Param('id') id: string, @Body(new ZodValidationPipe(updateCategoryBodySchema)) body: UpdateCategoryBodySchema) {
    const { name } = body
    const result = await this.updateCategoryUseCase.execute({ 
      id, 
      name 
    })

    if (result.isLeft()) {
      throw new NotFoundException(result.value.message)
    }

    return { category: HttpCategoryPresenter.toHttp(result.value.category) }
  }
}
