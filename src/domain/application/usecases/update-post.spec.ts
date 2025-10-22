import { InMemoryPostsRepository } from "test/repositories/in-memory-posts-repository"
import { UpdatePostUseCase } from "./update-post"
import { Post } from "@/domain/enterprise/entities/post"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

let inMemoryPostsRepository: InMemoryPostsRepository
let sut: UpdatePostUseCase

describe('Update Post', () => {
  beforeEach(() => {
    inMemoryPostsRepository = new InMemoryPostsRepository()
    sut = new UpdatePostUseCase(inMemoryPostsRepository)
  })

  it('should be able to update a post', async () => {
    const post = Post.create({
      title: 'Post 1',
      content: 'Content 1',
      excerpt: 'Excerpt 1',
      authorId: new UniqueEntityID('1'),
      categoryId: new UniqueEntityID('1'),
      slug: 'post-1'
    })

    await inMemoryPostsRepository.create(post)

    const result = await sut.execute({
      id: post.id.toString(),
      title: 'Updated Post',
      content: 'Updated Content'
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.post.title).toBe('Updated Post')
      expect(result.value.post.content).toBe('Updated Content')
      expect(result.value.post.slug).toBe('updated-post')
      expect(result.value.post.updatedAt).toBeDefined()
    }
  })

  it('should update only provided fields', async () => {
    const post = Post.create({
      title: 'Post 1',
      content: 'Content 1',
      excerpt: 'Excerpt 1',
      authorId: new UniqueEntityID('1'),
      categoryId: new UniqueEntityID('1'),
      slug: 'post-1'
    })

    await inMemoryPostsRepository.create(post)

    const result = await sut.execute({
      id: post.id.toString(),
      title: 'Updated Title Only'
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.post.title).toBe('Updated Title Only')
      expect(result.value.post.content).toBe('Content 1')
      expect(result.value.post.excerpt).toBe('Excerpt 1')
      expect(result.value.post.slug).toBe('updated-title-only')
    }
  })

  it('should throw ResourceNotFoundError when post does not exist', async () => {
    const result = await sut.execute({ 
      id: 'non-existent-id',
      title: 'Updated Title'
    })

    expect(result.isLeft()).toBe(true)
    if (result.isLeft()) {
      expect(result.value.message).toBe('Resource not found')
    }
  })
})
