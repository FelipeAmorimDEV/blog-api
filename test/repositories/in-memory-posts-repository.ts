import { PostsRepository } from "@/domain/application/repositories/posts-repository"
import { Post } from "@/domain/enterprise/entities/post"

export class InMemoryPostsRepository implements PostsRepository {
  public items: Post[] = []
  
  findById(id: string): Promise<Post | null> {
    return Promise.resolve(this.items.find(item => item.id.toString() === id) || null)
  }
  findAll(): Promise<Post[]> {
    return Promise.resolve(this.items)
  }
  update(post: Post): Promise<void> {
    const index = this.items.findIndex(item => item.id.toString() === post.id.toString())
    this.items[index] = post
    return Promise.resolve()
  }
  delete(id: string): Promise<void> {
    this.items = this.items.filter(item => item.id.toString() !== id)
    return Promise.resolve()
  }
  

  async create(post: Post): Promise<void> {
    this.items.push(post)
  }
}