import { UpdateUserUseCase } from "@/domain/application/usecases/update-user";
import { Body, Controller, HttpCode, Param, Put, NotFoundException, ConflictException } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from "@nestjs/swagger";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { HttpUserPresenter } from "./presenter/http-user-presenter";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { UserResponseWrapperDto } from "../dtos/user-response.dto";

const updateUserBodySchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  role: z.string().optional(),
  avatar: z.string().optional(),
}).partial()

type UpdateUserBodySchema = z.infer<typeof updateUserBodySchema>

@ApiTags('users')
@Controller('/users')
export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Atualizar usuário',
    description: 'Atualiza os dados de um usuário específico'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID único do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Usuário atualizado com sucesso',
    type: UserResponseWrapperDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Usuário não encontrado' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Email já está em uso' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados de validação inválidos' 
  })
  async handle(@Param('id') id: string, @Body(new ZodValidationPipe(updateUserBodySchema)) body: UpdateUserBodySchema) {
    const { name, email, password, role, avatar } = body
    const result = await this.updateUserUseCase.execute({ 
      id, 
      name, 
      email, 
      password, 
      role, 
      avatar 
    })

    if (result.isLeft()) {
      if (result.value.message === 'Email already in use') {
        throw new ConflictException(result.value.message)
      }
      throw new NotFoundException(result.value.message)
    }

    return { user: HttpUserPresenter.toHttp(result.value.user) }
  }
}
