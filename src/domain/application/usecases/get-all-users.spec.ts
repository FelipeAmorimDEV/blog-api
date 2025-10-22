import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository"
import { GetAllUsersUseCase } from "./get-all-users"
import { CreateUserUseCase } from "./create-user"

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetAllUsersUseCase
let createUser: CreateUserUseCase

describe('Get All Users', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new GetAllUsersUseCase(inMemoryUsersRepository)
    createUser = new CreateUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to get all users', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456'
    })

    await createUser.execute({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: '123456'
    })

    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.users).toHaveLength(2)
      expect(result.value.users[0].name).toBe('John Doe')
      expect(result.value.users[1].name).toBe('Jane Doe')
    }
  })

  it('should return empty array when no users exist', async () => {
    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.users).toHaveLength(0)
      expect(result.value.users).toEqual([])
    }
  })
})

