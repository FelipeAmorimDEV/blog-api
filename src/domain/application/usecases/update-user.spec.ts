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
    const createResult = await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456'
    })

    expect(createResult.isRight()).toBe(true)
    if (createResult.isRight()) {
      const user = createResult.value.user
      const result = await sut.execute({
        id: user.id.toString(),
        name: 'Updated John',
        email: 'updated@example.com'
      })

      expect(result.isRight()).toBe(true)
      if (result.isRight()) {
        expect(result.value.user.name).toBe('Updated John')
        expect(result.value.user.email).toBe('updated@example.com')
        expect(result.value.user.updatedAt).toBeDefined()
      }
    }
  })

  it('should be able to update password', async () => {
    const createResult = await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456'
    })

    expect(createResult.isRight()).toBe(true)
    if (createResult.isRight()) {
      const user = createResult.value.user
      const result = await sut.execute({
        id: user.id.toString(),
        password: 'new-password'
      })

      expect(result.isRight()).toBe(true)
      if (result.isRight()) {
        expect(await bcrypt.compare('new-password', result.value.user.password)).toBe(true)
        expect(await bcrypt.compare('123456', result.value.user.password)).toBe(false)
      }
    }
  })

  it('should not be able to update email to existing email', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456'
    })

    const createResult2 = await createUser.execute({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: '123456'
    })

    expect(createResult2.isRight()).toBe(true)
    if (createResult2.isRight()) {
      const user2 = createResult2.value.user
      const result = await sut.execute({
        id: user2.id.toString(),
        email: 'john@example.com'
      })

      expect(result.isLeft()).toBe(true)
      if (result.isLeft()) {
        expect(result.value.message).toBe('Email already in use')
      }
    }
  })

  it('should throw ResourceNotFoundError when user does not exist', async () => {
    const result = await sut.execute({ 
      id: 'non-existent-id',
      name: 'Updated Name'
    })

    expect(result.isLeft()).toBe(true)
    if (result.isLeft()) {
      expect(result.value.message).toBe('Resource not found')
    }
  })
})

