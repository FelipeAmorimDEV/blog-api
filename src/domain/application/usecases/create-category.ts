import { Category } from "@/domain/enterprise/entities/category"
import { CategoriesRepository } from "../repositories/categories-repository"
import { slugify } from "@/core/utils/slugify"

interface CreateCategoryUseCaseRequest {
  name: string
}

interface CreateCategoryUseCaseResponse {
  category: Category
}

export class CreateCategoryUseCase {
    constructor(private categoryRepository: CategoriesRepository) {}

  async execute(request: CreateCategoryUseCaseRequest): Promise<CreateCategoryUseCaseResponse> {
    const { name } = request

    const category = Category.create({ name, slug: slugify(name) })

    await this.categoryRepository.create(category)

    return { category }
  }
}

