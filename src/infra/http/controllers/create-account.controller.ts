import { CreateUserUseCase } from "@/domain/application/usecases/create-user";
import { Body, ConflictException, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { HttpUserPresenter } from "./presenter/http-user-presenter";
import { CreateAccountDto } from "../dtos/create-account.dto";
import { UserResponseWrapperDto } from "../dtos/user-response.dto";

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string()
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@ApiTags('users')
@Controller('/accounts')
export class CreateAccountController {
  constructor(private createUserUseCase: CreateUserUseCase){}

  @Post()
  @HttpCode(201)
  @ApiOperation({ 
    summary: 'Criar uma nova conta de usuário',
    description: 'Cria uma nova conta de usuário no sistema'
  })
  @ApiBody({ type: CreateAccountDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Usuário criado com sucesso',
    type: UserResponseWrapperDto
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Email já está em uso' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados de validação inválidos' 
  })
  async handle(@Body(new ZodValidationPipe(createAccountBodySchema)) body: CreateAccountBodySchema) {
    const { name, email, password } = body

    const result = await this.createUserUseCase.execute({ name, email, password })

    if (result.isLeft()) {
      throw new ConflictException(result.value.message)
    }

    return { user: HttpUserPresenter.toHttp(result.value.user) }
  }
}