import { Category } from "@/domain/enterprise/entities/category"

export class HttpCategoryPresenter {
  static toHttp(category: Category) {
    return {
      id: category.id.toString(),
      name: category.name,
      slug: category.slug,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    }
  }

  static toHttpList(categories: Category[]) {
    return categories.map(HttpCategoryPresenter.toHttp)
  }
}
