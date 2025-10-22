import { Category } from "@/domain/enterprise/entities/category"
import { CategoriesRepository } from "../repositories/categories-repository"
import { Injectable } from "@nestjs/common"
import { Either, right } from "@/core/either"

type GetAllCategoriesUseCaseResponse = Either<
  never,
  { categories: Category[] }
>

@Injectable()
export class GetAllCategoriesUseCase {
  constructor(private categoryRepository: CategoriesRepository) {}

  async execute(): Promise<GetAllCategoriesUseCaseResponse> {
    const categories = await this.categoryRepository.findAll()

    return right({ categories })
  }
}

