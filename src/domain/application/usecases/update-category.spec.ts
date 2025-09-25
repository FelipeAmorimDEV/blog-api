import { InMemoryCategoriesRepository } from "test/repositories/in-memory-categories-repository"
import { UpdateCategoryUseCase } from "./update-category"
import { Category } from "@/domain/enterprise/entities/category"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

let inMemoryCategoriesRepository: InMemoryCategoriesRepository
let sut: UpdateCategoryUseCase

describe('Update Category', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository()
    sut = new UpdateCategoryUseCase(inMemoryCategoriesRepository)
  })

  it('should be able to update a category', async () => {
    const category = Category.create({
      name: 'Technology',
      slug: 'technology'
    })

    await inMemoryCategoriesRepository.create(category)

    const result = await sut.execute({
      id: category.id.toString(),
      name: 'Updated Technology'
    })

    expect(result.category.name).toBe('Updated Technology')
    expect(result.category.slug).toBe('updated-technology')
    expect(result.category.updatedAt).toBeDefined()
  })

  it('should throw ResourceNotFoundError when category does not exist', async () => {
    await expect(() => 
      sut.execute({ 
        id: 'non-existent-id',
        name: 'Updated Name'
      })
    ).rejects.toThrow(ResourceNotFoundError)
  })
})

