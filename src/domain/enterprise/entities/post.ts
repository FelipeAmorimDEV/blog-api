import { Entity } from "@/core/entities/entities";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export class Post extends Entity<PostProps> {

    get authorId() {
        return this.props.authorId
    }

    get slug() {
        return this.props.slug
    }

    get title() {
        return this.props.title
    }

    get content() {
        return this.props.content
    }
    
    get excerpt() {
        return this.props.excerpt
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }
    
    
    get publishedAt() {
        return this.props.publishedAt
    }


    get isArchived() {
        return this.props.isArchived
    }

    get isFeatured() {
        return this.props.isFeatured
    }   

    get categoryId() {
        return this.props.categoryId
    }

    set title(title: string) {
        this.props.title = title
        this.props.updatedAt = new Date()
    }

    set content(content: string) {
        this.props.content = content
        this.props.updatedAt = new Date()
    }

    set excerpt(excerpt: string) {
        this.props.excerpt = excerpt
        this.props.updatedAt = new Date()
    }

    set categoryId(categoryId: UniqueEntityID) {
        this.props.categoryId = categoryId
        this.props.updatedAt = new Date()
    }

    set slug(slug: string) {
        this.props.slug = slug
        this.props.updatedAt = new Date()
    }

  static create(props: Optional<PostProps, 'createdAt'>, id?: UniqueEntityID) {
    const post = new Post({
        ...props,
        createdAt: props.createdAt ?? new Date()
    }, id)
    return post
  }
}

type PostProps = {  
  authorId: UniqueEntityID
  categoryId: UniqueEntityID
  slug: string
  title: string
  content: string
  excerpt: string
  createdAt: Date
  updatedAt?: Date
  publishedAt?: Date
  isArchived?: boolean
  isFeatured?: boolean
}