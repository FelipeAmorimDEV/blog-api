import { Category } from "@/domain/enterprise/entities/category"
import { CategoriesRepository } from "../repositories/categories-repository"
import { Injectable } from "@nestjs/common"
import { Either, left, right } from "@/core/either"
import { slugify } from "@/core/utils/slugify"

interface UpdateCategoryUseCaseRequest {
  id: string
  name?: string
}

type UpdateCategoryUseCaseResponse = Either<
  { message: string },
  { category: Category }
>

@Injectable()
export class UpdateCategoryUseCase {
  constructor(private categoryRepository: CategoriesRepository) {}

  async execute(request: UpdateCategoryUseCaseRequest): Promise<UpdateCategoryUseCaseResponse> {
    const { id, name } = request

    const category = await this.categoryRepository.findById(id)

    if (!category) {
      return left({ message: 'Resource not found' })
    }

    if (name) {
      category.name = name
      category.slug = slugify(name)
    }

    await this.categoryRepository.update(category)

    return right({ category })
  }
}

