import { AuthenticateUserUseCase } from "@/domain/application/usecases/authenticate-user";
import { Body, Controller, HttpCode, Post, UnauthorizedException } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { HttpUserPresenter } from "./presenter/http-user-presenter";
import { AuthenticateUserDto } from "../dtos/authenticate-user.dto";
import { AuthResponseDto } from "../dtos/auth-response.dto";
import { JwtAuthService } from "../../auth/jwt.service";

const authenticateUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateUserBodySchema = z.infer<typeof authenticateUserBodySchema>

@ApiTags('auth')
@Controller('/sessions')
export class AuthenticateUserController {
  constructor(
    private authenticateUserUseCase: AuthenticateUserUseCase,
    private jwtAuthService: JwtAuthService
  ){}

  @Post()
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Autenticar usuário',
    description: 'Autentica um usuário e retorna um token JWT junto com os dados do usuário'
  })
  @ApiBody({ type: AuthenticateUserDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Usuário autenticado com sucesso',
    type: AuthResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Credenciais inválidas' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados de validação inválidos' 
  })
  async handle(@Body(new ZodValidationPipe(authenticateUserBodySchema)) body: AuthenticateUserBodySchema) {
    const { email, password } = body

    const result = await this.authenticateUserUseCase.execute({ email, password })

    if (result.isLeft()) {
      throw new UnauthorizedException(result.value.message)
    }

    const user = result.value.user
    const token = await this.jwtAuthService.generateToken(user)

    return {
      token,
      user: HttpUserPresenter.toHttp(user)
    }
  }
}
