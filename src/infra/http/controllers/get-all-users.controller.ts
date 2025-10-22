import { GetAllUsersUseCase } from "@/domain/application/usecases/get-all-users";
import { Controller, Get, HttpCode } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { HttpUserPresenter } from "./presenter/http-user-presenter";
import { UsersListResponseDto } from "../dtos/user-response.dto";

@ApiTags('users')
@Controller('/users')
export class GetAllUsersController {
  constructor(private getAllUsersUseCase: GetAllUsersUseCase) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Listar todos os usuários',
    description: 'Retorna uma lista de todos os usuários cadastrados'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de usuários retornada com sucesso',
    type: UsersListResponseDto
  })
  async handle() {
    const result = await this.getAllUsersUseCase.execute()

    if (result.isLeft()) {
      throw new Error('Unexpected error')
    }

    return { users: HttpUserPresenter.toHttpList(result.value.users) }
  }
}
