import { Post } from "@/domain/enterprise/entities/post";
import { PostWithRelations } from "@/domain/enterprise/entities/post-with-relations";

export abstract class PostsRepository {
  abstract create(post: Post): Promise<void>
  abstract findById(id: string): Promise<Post | null>
  abstract findBySlug(slug: string): Promise<Post | null>
  abstract findByIdWithRelations(id: string): Promise<PostWithRelations | null>
  abstract findBySlugWithRelations(slug: string): Promise<PostWithRelations | null>
  abstract findAll(): Promise<Post[]>
  abstract findAllWithRelations(): Promise<PostWithRelations[]>
  abstract findPublished(): Promise<Post[]>
  abstract findDrafts(): Promise<Post[]>
  abstract findPublishedWithRelations(): Promise<PostWithRelations[]>
  abstract findDraftsWithRelations(): Promise<PostWithRelations[]>
  abstract update(post: Post): Promise<void>
  abstract delete(id: string): Promise<void>
}