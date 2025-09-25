import { CategoriesRepository } from "../repositories/categories-repository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

interface DeleteCategoryUseCaseRequest {
  id: string
}

export class DeleteCategoryUseCase {
  constructor(private categoryRepository: CategoriesRepository) {}

  async execute(request: DeleteCategoryUseCaseRequest): Promise<void> {
    const { id } = request

    const category = await this.categoryRepository.findById(id)

    if (!category) {
      throw new ResourceNotFoundError()
    }

    await this.categoryRepository.delete(id)
  }
}

