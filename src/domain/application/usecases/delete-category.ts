import { CategoriesRepository } from "../repositories/categories-repository"
import { Injectable } from "@nestjs/common"
import { Either, left, right } from "@/core/either"

interface DeleteCategoryUseCaseRequest {
  id: string
}

type DeleteCategoryUseCaseResponse = Either<
  { message: string },
  void
>

@Injectable()
export class DeleteCategoryUseCase {
  constructor(private categoryRepository: CategoriesRepository) {}

  async execute(request: DeleteCategoryUseCaseRequest): Promise<DeleteCategoryUseCaseResponse> {
    const { id } = request

    const category = await this.categoryRepository.findById(id)

    if (!category) {
      return left({ message: 'Resource not found' })
    }

    await this.categoryRepository.delete(id)

    return right(undefined)
  }
}

