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

    expect(result.user.id).toBeDefined()
    expect(result.user.name).toBe('John Doe')
    expect(result.user.email).toBe('john@example.com')
    expect(result.user.password).not.toBe('123456') // Should be hashed
    expect(await bcrypt.compare('123456', result.user.password)).toBe(true)
  })

  it('should not be able to create a user with same email', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456'
    })

    await expect(() => 
      sut.execute({
        name: 'Jane Doe',
        email: 'john@example.com',
        password: '654321'
      })
    ).rejects.toThrow('User with same email already exists')
  })
})

