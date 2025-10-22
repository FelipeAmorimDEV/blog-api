import { UpdatePostUseCase } from "@/domain/application/usecases/update-post";
import { Body, Controller, HttpCode, Param, Put, NotFoundException } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from "@nestjs/swagger";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { HttpPostPresenter } from "./presenter/http-post-presenter";
import { UpdatePostDto } from "../dtos/update-post.dto";
import { PostResponseWrapperDto } from "../dtos/post-response.dto";

const updatePostBodySchema = z.object({
  title: z.string().optional().or(z.literal(''))    ,
  content: z.string().optional().or(z.literal('')),
  excerpt: z.string().optional().or(z.literal('')),
  categoryId: z.string().optional().or(z.literal('')),
  publishedAt: z.string().optional().or(z.literal(null)).or(z.literal('null'))
})

type UpdatePostBodySchema = z.infer<typeof updatePostBodySchema>

@ApiTags('posts')
@Controller('/posts')
export class UpdatePostController {
  constructor(private updatePostUseCase: UpdatePostUseCase) {}

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Atualizar post',
    description: 'Atualiza os dados de um post específico'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID único do post',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiBody({ type: UpdatePostDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Post atualizado com sucesso',
    type: PostResponseWrapperDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Post não encontrado' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados de validação inválidos' 
  })
  async handle(@Param('id') id: string, @Body(new ZodValidationPipe(updatePostBodySchema)) body: UpdatePostBodySchema) {
    const { title, content, excerpt, categoryId, publishedAt } = body
    const result = await this.updatePostUseCase.execute({ 
      id, 
      title, 
      content, 
      excerpt, 
      categoryId,
      publishedAt
    })

    if (result.isLeft()) {
      throw new NotFoundException(result.value.message)
    }

    return { post: HttpPostPresenter.toHttp(result.value.post) }
  }
}
