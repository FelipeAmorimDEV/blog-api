import { InMemoryCategoriesRepository } from "test/repositories/in-memory-categories-repository"
import { DeleteCategoryUseCase } from "./delete-category"
import { Category } from "@/domain/enterprise/entities/category"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

let inMemoryCategoriesRepository: InMemoryCategoriesRepository
let sut: DeleteCategoryUseCase

describe('Delete Category', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository()
    sut = new DeleteCategoryUseCase(inMemoryCategoriesRepository)
  })

  it('should be able to delete a category', async () => {
    const category = Category.create({
      name: 'Technology',
      slug: 'technology'
    })

    await inMemoryCategoriesRepository.create(category)

    await sut.execute({ id: category.id.toString() })

    const deletedCategory = await inMemoryCategoriesRepository.findById(category.id.toString())
    expect(deletedCategory).toBeNull()
  })

  it('should throw ResourceNotFoundError when category does not exist', async () => {
    await expect(() => 
      sut.execute({ id: 'non-existent-id' })
    ).rejects.toThrow(ResourceNotFoundError)
  })
})

