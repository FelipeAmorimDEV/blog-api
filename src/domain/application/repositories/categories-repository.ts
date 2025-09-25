import { Category } from "@/domain/enterprise/entities/category"

export interface CategoriesRepository {
  create(category: Category): Promise<void>
  findById(id: string): Promise<Category | null>
  findAll(): Promise<Category[]>
  update(category: Category): Promise<void>
  delete(id: string): Promise<void>
}