import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository"
import { UpdateUserUseCase } from "./update-user"
import { CreateUserUseCase } from "./create-user"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import * as bcrypt from 'bcryptjs'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: UpdateUserUseCase
let createUser: CreateUserUseCase

describe('Update User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new UpdateUserUseCase(inMemoryUsersRepository)
    createUser = new CreateUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to update a user', async () => {
    const { user } = await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456'
    })

    const result = await sut.execute({
      id: user.id.toString(),
      name: 'Updated John',
      email: 'updated@example.com'
    })

    expect(result.user.name).toBe('Updated John')
    expect(result.user.email).toBe('updated@example.com')
    expect(result.user.updatedAt).toBeDefined()
  })

  it('should be able to update password', async () => {
    const { user } = await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456'
    })

    const result = await sut.execute({
      id: user.id.toString(),
      password: 'new-password'
    })

    expect(await bcrypt.compare('new-password', result.user.password)).toBe(true)
    expect(await bcrypt.compare('123456', result.user.password)).toBe(false)
  })

  it('should not be able to update email to existing email', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456'
    })

    const { user: user2 } = await createUser.execute({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: '123456'
    })

    await expect(() => 
      sut.execute({
        id: user2.id.toString(),
        email: 'john@example.com'
      })
    ).rejects.toThrow('Email already in use')
  })

  it('should throw ResourceNotFoundError when user does not exist', async () => {
    await expect(() => 
      sut.execute({ 
        id: 'non-existent-id',
        name: 'Updated Name'
      })
    ).rejects.toThrow(ResourceNotFoundError)
  })
})

