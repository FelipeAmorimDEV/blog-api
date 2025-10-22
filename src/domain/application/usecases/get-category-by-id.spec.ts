import { InMemoryCategoriesRepository } from "test/repositories/in-memory-categories-repository"
import { GetCategoryByIdUseCase } from "./get-category-by-id"
import { Category } from "@/domain/enterprise/entities/category"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

let inMemoryCategoriesRepository: InMemoryCategoriesRepository
let sut: GetCategoryByIdUseCase

describe('Get Category By ID', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository()
    sut = new GetCategoryByIdUseCase(inMemoryCategoriesRepository)
  })

  it('should be able to get a category by id', async () => {
    const category = Category.create({
      name: 'Technology',
      slug: 'technology'
    })

    await inMemoryCategoriesRepository.create(category)

    const result = await sut.execute({ id: category.id.toString() })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.category).toEqual(category)
      expect(result.value.category.name).toBe('Technology')
    }
  })

  it('should throw ResourceNotFoundError when category does not exist', async () => {
    const result = await sut.execute({ id: 'non-existent-id' })

    expect(result.isLeft()).toBe(true)
    if (result.isLeft()) {
      expect(result.value.message).toBe('Resource not found')
    }
  })
})

