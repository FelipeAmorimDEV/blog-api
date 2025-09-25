import { Category } from "@/domain/enterprise/entities/category"
import { CategoriesRepository } from "../repositories/categories-repository"

interface GetAllCategoriesUseCaseResponse {
  categories: Category[]
}

export class GetAllCategoriesUseCase {
  constructor(private categoryRepository: CategoriesRepository) {}

  async execute(): Promise<GetAllCategoriesUseCaseResponse> {
    const categories = await this.categoryRepository.findAll()

    return { categories }
  }
}

