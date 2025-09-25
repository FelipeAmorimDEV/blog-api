import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository"
import { DeleteUserUseCase } from "./delete-user"
import { CreateUserUseCase } from "./create-user"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: DeleteUserUseCase
let createUser: CreateUserUseCase

describe('Delete User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new DeleteUserUseCase(inMemoryUsersRepository)
    createUser = new CreateUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to delete a user', async () => {
    const { user } = await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456'
    })

    await sut.execute({ id: user.id.toString() })

    const deletedUser = await inMemoryUsersRepository.findById(user.id.toString())
    expect(deletedUser).toBeNull()
  })

  it('should throw ResourceNotFoundError when user does not exist', async () => {
    await expect(() => 
      sut.execute({ id: 'non-existent-id' })
    ).rejects.toThrow(ResourceNotFoundError)
  })
})

