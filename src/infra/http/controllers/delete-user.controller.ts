import { DeleteUserUseCase } from "@/domain/application/usecases/delete-user";
import { Controller, Delete, HttpCode, Param, NotFoundException } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

@ApiTags('users')
@Controller('/users')
export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ 
    summary: 'Deletar usuário',
    description: 'Remove um usuário do sistema'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID único do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 204, 
    description: 'Usuário deletado com sucesso' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Usuário não encontrado' 
  })
  async handle(@Param('id') id: string) {
    const result = await this.deleteUserUseCase.execute({ id })

    if (result.isLeft()) {
      throw new NotFoundException(result.value.message)
    }
  }
}
