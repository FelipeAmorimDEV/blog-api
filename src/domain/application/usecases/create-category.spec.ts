import { InMemoryCategoriesRepository } from "test/repositories/in-memory-categories-repository"
import { CreateCategoryUseCase } from "./create-category"

let inMemoryCategoriesRepository: InMemoryCategoriesRepository
let sut: CreateCategoryUseCase

describe('Create Category', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository()
    sut = new CreateCategoryUseCase(inMemoryCategoriesRepository)
  })

  it('should be able to create a category', async () => {
    const result = await sut.execute({
      name: 'Technology'
    })

    expect(result.category.id).toBeDefined()
    expect(result.category.name).toBe('Technology')
    expect(result.category.slug).toBe('technology')
  })
})
