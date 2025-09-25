import { InMemoryPostsRepository } from "test/repositories/in-memory-posts-repository"
import { DeletePostUseCase } from "./delete-post"
import { Post } from "@/domain/enterprise/entities/post"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

let inMemoryPostsRepository: InMemoryPostsRepository
let sut: DeletePostUseCase

describe('Delete Post', () => {
  beforeEach(() => {
    inMemoryPostsRepository = new InMemoryPostsRepository()
    sut = new DeletePostUseCase(inMemoryPostsRepository)
  })

  it('should be able to delete a post', async () => {
    const post = Post.create({
      title: 'Post 1',
      content: 'Content 1',
      excerpt: 'Excerpt 1',
      authorId: new UniqueEntityID('1'),
      categoryId: new UniqueEntityID('1'),
      slug: 'post-1'
    })

    await inMemoryPostsRepository.create(post)

    await sut.execute({ id: post.id.toString() })

    const deletedPost = await inMemoryPostsRepository.findById(post.id.toString())
    expect(deletedPost).toBeNull()
  })

  it('should throw ResourceNotFoundError when post does not exist', async () => {
    await expect(() => 
      sut.execute({ id: 'non-existent-id' })
    ).rejects.toThrow(ResourceNotFoundError)
  })
})

