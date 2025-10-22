import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository"
import { GetUserByIdUseCase } from "./get-user-by-id"
import { CreateUserUseCase } from "./create-user"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserByIdUseCase
let createUser: CreateUserUseCase

describe('Get User By ID', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new GetUserByIdUseCase(inMemoryUsersRepository)
    createUser = new CreateUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to get a user by id', async () => {
    const createResult = await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456'
    })

    expect(createResult.isRight()).toBe(true)
    if (createResult.isRight()) {
      const createdUser = createResult.value.user
      const result = await sut.execute({ id: createdUser.id.toString() })

      expect(result.isRight()).toBe(true)
      if (result.isRight()) {
        expect(result.value.user).toEqual(createdUser)
        expect(result.value.user.name).toBe('John Doe')
      }
    }
  })

  it('should throw ResourceNotFoundError when user does not exist', async () => {
    const result = await sut.execute({ id: 'non-existent-id' })

    expect(result.isLeft()).toBe(true)
    if (result.isLeft()) {
      expect(result.value.message).toBe('Resource not found')
    }
  })
})

