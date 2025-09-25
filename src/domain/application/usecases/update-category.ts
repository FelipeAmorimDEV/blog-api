import { Category } from "@/domain/enterprise/entities/category"
import { CategoriesRepository } from "../repositories/categories-repository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { slugify } from "@/core/utils/slugify"

interface UpdateCategoryUseCaseRequest {
  id: string
  name?: string
}

interface UpdateCategoryUseCaseResponse {
  category: Category
}

export class UpdateCategoryUseCase {
  constructor(private categoryRepository: CategoriesRepository) {}

  async execute(request: UpdateCategoryUseCaseRequest): Promise<UpdateCategoryUseCaseResponse> {
    const { id, name } = request

    const category = await this.categoryRepository.findById(id)

    if (!category) {
      throw new ResourceNotFoundError()
    }

    if (name) {
      category.name = name
      category.slug = slugify(name)
    }

    await this.categoryRepository.update(category)

    return { category }
  }
}

