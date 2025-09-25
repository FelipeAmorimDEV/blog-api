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
    const { user: createdUser } = await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456'
    })

    const result = await sut.execute({ id: createdUser.id.toString() })

    expect(result.user).toEqual(createdUser)
    expect(result.user.name).toBe('John Doe')
  })

  it('should throw ResourceNotFoundError when user does not exist', async () => {
    await expect(() => 
      sut.execute({ id: 'non-existent-id' })
    ).rejects.toThrow(ResourceNotFoundError)
  })
})

