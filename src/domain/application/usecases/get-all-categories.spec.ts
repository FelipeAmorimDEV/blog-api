import { InMemoryCategoriesRepository } from "test/repositories/in-memory-categories-repository"
import { GetAllCategoriesUseCase } from "./get-all-categories"
import { Category } from "@/domain/enterprise/entities/category"

let inMemoryCategoriesRepository: InMemoryCategoriesRepository
let sut: GetAllCategoriesUseCase

describe('Get All Categories', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository()
    sut = new GetAllCategoriesUseCase(inMemoryCategoriesRepository)
  })

  it('should be able to get all categories', async () => {
    const category1 = Category.create({
      name: 'Technology',
      slug: 'technology'
    })

    const category2 = Category.create({
      name: 'Science',
      slug: 'science'
    })

    await inMemoryCategoriesRepository.create(category1)
    await inMemoryCategoriesRepository.create(category2)

    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.categories).toHaveLength(2)
      expect(result.value.categories).toEqual([category1, category2])
    }
  })

  it('should return empty array when no categories exist', async () => {
    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.categories).toHaveLength(0)
      expect(result.value.categories).toEqual([])
    }
  })
})

