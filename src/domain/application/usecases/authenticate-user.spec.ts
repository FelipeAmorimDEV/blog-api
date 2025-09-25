import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository"
import { AuthenticateUserUseCase } from "./authenticate-user"
import { CreateUserUseCase } from "./create-user"
import * as bcrypt from 'bcryptjs'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: AuthenticateUserUseCase
let createUser: CreateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUserUseCase(inMemoryUsersRepository)
    createUser = new CreateUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to authenticate a user', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456'
    })

    const result = await sut.execute({
      email: 'john@example.com',
      password: '123456'
    })

    expect(result.user).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user'
      })
    )
  })

  it('should not be able to authenticate with wrong email', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456'
    })

    await expect(() => 
      sut.execute({
        email: 'wrong@example.com',
        password: '123456'
      })
    ).rejects.toThrow('Invalid credentials')
  })

  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456'
    })

    await expect(() => 
      sut.execute({
        email: 'john@example.com',
        password: 'wrong-password'
      })
    ).rejects.toThrow('Invalid credentials')
  })
})

