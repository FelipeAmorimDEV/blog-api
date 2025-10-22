import { Category } from "@/domain/enterprise/entities/category"
import { CategoriesRepository } from "../repositories/categories-repository"
import { Injectable } from "@nestjs/common"
import { Either, left, right } from "@/core/either"

interface GetCategoryByIdUseCaseRequest {
  id: string
}

type GetCategoryByIdUseCaseResponse = Either<
  { message: string },
  { category: Category }
>

@Injectable()
export class GetCategoryByIdUseCase {
  constructor(private categoryRepository: CategoriesRepository) {}

  async execute(request: GetCategoryByIdUseCaseRequest): Promise<GetCategoryByIdUseCaseResponse> {
    const { id } = request

    const category = await this.categoryRepository.findById(id)

    if (!category) {
      return left({ message: 'Resource not found' })
    }

    return right({ category })
  }
}
