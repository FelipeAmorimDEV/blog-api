import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository"
import { CreateUserUseCase } from "./create-user"
import * as bcrypt from 'bcryptjs'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to create a user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456'
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.user.id).toBeDefined()
      expect(result.value.user.name).toBe('John Doe')
      expect(result.value.user.email).toBe('john@example.com')
      expect(result.value.user.password).not.toBe('123456') // Should be hashed
      expect(await bcrypt.compare('123456', result.value.user.password)).toBe(true)
    }
  })

  it('should not be able to create a user with same email', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456'
    })

    const result = await sut.execute({
      name: 'Jane Doe',
      email: 'john@example.com',
      password: '654321'
    })

    expect(result.isLeft()).toBe(true)
    if (result.isLeft()) {
      expect(result.value.message).toBe('User with same email already exists')
    }
  })
})

