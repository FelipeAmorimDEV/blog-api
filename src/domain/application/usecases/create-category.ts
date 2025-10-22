import { Category } from "@/domain/enterprise/entities/category"
import { CategoriesRepository } from "../repositories/categories-repository"
import { slugify } from "@/core/utils/slugify"
import { Injectable } from "@nestjs/common"
import { Either, right } from "@/core/either"

interface CreateCategoryUseCaseRequest {
  name: string
}

type CreateCategoryUseCaseResponse = Either<
  never,
  { category: Category }
>

@Injectable()
export class CreateCategoryUseCase {
    constructor(private categoryRepository: CategoriesRepository) {}

  async execute(request: CreateCategoryUseCaseRequest): Promise<CreateCategoryUseCaseResponse> {
    const { name } = request

    const category = Category.create({ name, slug: slugify(name) })

    await this.categoryRepository.create(category)

    return right({ category })
  }
}

