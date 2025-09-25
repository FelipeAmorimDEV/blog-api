import { Post } from "@/domain/enterprise/entities/post";

export interface PostsRepository {
  create(post: Post): Promise<void>
  findById(id: string): Promise<Post | null>
  findAll(): Promise<Post[]>
  update(post: Post): Promise<void>
  delete(id: string): Promise<void>
}