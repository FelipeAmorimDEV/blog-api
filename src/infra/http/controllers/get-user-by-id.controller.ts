import { GetUserByIdUseCase } from "@/domain/application/usecases/get-user-by-id";
import { Controller, Get, HttpCode, Param, NotFoundException } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { HttpUserPresenter } from "./presenter/http-user-presenter";
import { UserResponseWrapperDto } from "../dtos/user-response.dto";

@ApiTags('users')
@Controller('/users')
export class GetUserByIdController {
  constructor(private getUserByIdUseCase: GetUserByIdUseCase) {}

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Buscar usuário por ID',
    description: 'Retorna os dados de um usuário específico'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID único do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Usuário encontrado',
    type: UserResponseWrapperDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Usuário não encontrado' 
  })
  async handle(@Param('id') id: string) {
    const result = await this.getUserByIdUseCase.execute({ id })

    if (result.isLeft()) {
      throw new NotFoundException(result.value.message)
    }

    return { user: HttpUserPresenter.toHttp(result.value.user) }
  }
}
