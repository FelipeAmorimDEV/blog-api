import { User } from "@/domain/enterprise/entities/user"
import { UsersRepository } from "../repositories/users-repository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import * as bcrypt from 'bcryptjs'

interface UpdateUserUseCaseRequest {
  id: string
  name?: string
  email?: string
  password?: string
  role?: string
  avatar?: string
}

interface UpdateUserUseCaseResponse {
  user: User
}

export class UpdateUserUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(request: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const { id, name, email, password, role, avatar } = request

    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    if (name) {
      user.name = name
    }

    if (email) {
      const userWithSameEmail = await this.userRepository.findByEmail(email)
      if (userWithSameEmail && userWithSameEmail.id.toString() !== id) {
        throw new Error('Email already in use')
      }
      user.email = email
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 8)
      user.password = hashedPassword
    }

    if (role) {
      user.role = role
    }

    if (avatar !== undefined) {
      user.avatar = avatar
    }

    await this.userRepository.update(user)

    return { user }
  }
}

