import { UsersRepository } from "../repositories/users-repository";
import * as bcrypt from 'bcryptjs';

interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUserUseCaseResponse {
  user: {
    id: string
    name: string
    email: string
    role: string
    avatar?: string
  }
}

export class AuthenticateUserUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(request: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const { email, password } = request

    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new Error('Invalid credentials')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new Error('Invalid credentials')
    }

    return {
      user: {
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    }
  }
}

