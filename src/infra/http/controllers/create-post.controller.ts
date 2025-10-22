import { CreatePostUseCase } from "@/domain/application/usecases/create-post";
import { Body, Controller, HttpCode, Post, UseGuards, HttpException, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from "@nestjs/swagger";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { HttpPostPresenter } from "./presenter/http-post-presenter";
import { CreatePostDto } from "../dtos/create-post.dto";
import { PostResponseWrapperDto } from "../dtos/post-response.dto";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { CurrentUser } from "../../auth/current-user.decorator";
import { User } from "@/domain/enterprise/entities/user";

const createPostBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  imagem: z.string().optional(),
  categoryId: z.string(),
})

type CreatePostBodySchema = z.infer<typeof createPostBodySchema>

@ApiTags('posts')
@Controller('/posts')
export class CreatePostController {
  constructor(private createPostUseCase: CreatePostUseCase) {}

  @Post()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Criar um novo post',
    description: 'Cria um novo post no blog. Requer autenticação JWT.'
  })
  @ApiBody({ type: CreatePostDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Post criado com sucesso',
    type: PostResponseWrapperDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados de validação inválidos' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Token JWT inválido ou ausente' 
  })
  async handle(
    @Body(new ZodValidationPipe(createPostBodySchema)) body: CreatePostBodySchema,
    @CurrentUser() user: User
  ) {
    const { title, content, imagem, categoryId } = body
    const result = await this.createPostUseCase.execute({ 
      title, 
      content, 
      imagem, 
      authorId: user.id.toString(), 
      categoryId 
    })
    
    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST)
    }

    return { post: HttpPostPresenter.toHttp(result.value.post) }
  }
}