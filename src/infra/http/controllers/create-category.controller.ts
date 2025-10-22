import { CreateCategoryUseCase } from "@/domain/application/usecases/create-category";
import { Body, Controller, HttpCode, Post, HttpException, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { HttpCategoryPresenter } from "./presenter/http-category-presenter";
import { CreateCategoryDto } from "../dtos/create-category.dto";
import { CategoryResponseWrapperDto } from "../dtos/category-response.dto";

const createCategoryBodySchema = z.object({
  name: z.string(),
})

type CreateCategoryBodySchema = z.infer<typeof createCategoryBodySchema>

@ApiTags('categories')
@Controller('/categories')
export class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ 
    summary: 'Criar uma nova categoria',
    description: 'Cria uma nova categoria no sistema'
  })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Categoria criada com sucesso',
    type: CategoryResponseWrapperDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados de validação inválidos' 
  })
  async handle(@Body(new ZodValidationPipe(createCategoryBodySchema)) body: CreateCategoryBodySchema) {
    const { name } = body
    const result = await this.createCategoryUseCase.execute({ name })

    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST)
    }

    return { category: HttpCategoryPresenter.toHttp(result.value.category) }
  }
}
