import { CategoriesRepository } from "@/domain/application/repositories/categories-repository"
import { Category } from "@/domain/enterprise/entities/category"

export class InMemoryCategoriesRepository implements CategoriesRepository {
  public items: Category[] = []
  
  findById(id: string): Promise<Category | null> {
    return Promise.resolve(this.items.find(item => item.id.toString() === id) || null)
  }
  
  findAll(): Promise<Category[]> {
    return Promise.resolve(this.items)
  }
  
  update(category: Category): Promise<void> {
    const index = this.items.findIndex(item => item.id.toString() === category.id.toString())
    this.items[index] = category
    return Promise.resolve()
  }
  
  delete(id: string): Promise<void> {
    this.items = this.items.filter(item => item.id.toString() !== id)
    return Promise.resolve()
  }
  
  async create(category: Category): Promise<void> {
    this.items.push(category)
  }
}

