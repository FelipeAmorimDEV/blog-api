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

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.category.id).toBeDefined()
      expect(result.value.category.name).toBe('Technology')
      expect(result.value.category.slug).toBe('technology')
    }
  })
})
