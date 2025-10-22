import { Post } from './post'
import { User } from './user'
import { Category } from './category'

export class PostWithRelations {
  constructor(
    public readonly post: Post,
    public readonly author: User,
    public readonly category: Category
  ) {}

  static create(
    post: Post,
    author: User,
    category: Category
  ): PostWithRelations {
    return new PostWithRelations(post, author, category)
  }
}
