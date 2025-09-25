import { Entity } from "@/core/entities/entities"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"               
import { Optional } from "@/core/types/optional"
export class Category extends Entity<CategoryProps> {
    get name() {
        return this.props.name
    }

    get slug() {
        return this.props.slug
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    set name(name: string) {
        this.props.name = name
        this.props.updatedAt = new Date()
    }

    set slug(slug: string) {
        this.props.slug = slug
        this.props.updatedAt = new Date()
    }

  static create(props: Optional<CategoryProps, 'createdAt'>, id?: UniqueEntityID) {
    const category = new Category({
        ...props,
        createdAt: props.createdAt ?? new Date()
    }, id)
    return category
  }
}

type CategoryProps = {
  name: string
  slug: string
  createdAt: Date
  updatedAt?: Date
}