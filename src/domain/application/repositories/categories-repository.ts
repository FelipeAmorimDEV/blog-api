import { Category } from "@/domain/enterprise/entities/category"

export abstract class CategoriesRepository {
  abstract create(category: Category): Promise<void>
  abstract  findById(id: string): Promise<Category | null>
  abstract findAll(): Promise<Category[]>
  abstract update(category: Category): Promise<void>
  abstract delete(id: string): Promise<void>
}