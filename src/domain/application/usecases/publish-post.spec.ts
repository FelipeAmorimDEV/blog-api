import { InMemoryPostsRepository } from "test/repositories/in-memory-posts-repository"
import { PublishPostUseCase } from "./publish-post"
import { Post } from "@/domain/enterprise/entities/post"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

let inMemoryPostsRepository: InMemoryPostsRepository
let sut: PublishPostUseCase

describe('Publish Post', () => {
  beforeEach(() => {
    inMemoryPostsRepository = new InMemoryPostsRepository()
    sut = new PublishPostUseCase(inMemoryPostsRepository)
  })

  it('should be able to publish a draft post', async () => {
    const post = Post.create({
      title: 'Draft Post',
      content: 'Content 1',
      excerpt: 'Excerpt 1',
      authorId: new UniqueEntityID('1'),
      categoryId: new UniqueEntityID('1'),
      slug: 'draft-post'
    })

    await inMemoryPostsRepository.create(post)

    const result = await sut.execute({ id: post.id.toString() })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.post.publishedAt).toBeDefined()
      expect(result.value.post.publishedAt).toBeInstanceOf(Date)
    }
  })

  it('should be able to unpublish a published post', async () => {
    const post = Post.create({
      title: 'Published Post',
      content: 'Content 1',
      excerpt: 'Excerpt 1',
      authorId: new UniqueEntityID('1'),
      categoryId: new UniqueEntityID('1'),
      slug: 'published-post',
      publishedAt: new Date()
    })

    await inMemoryPostsRepository.create(post)

    const result = await sut.execute({ id: post.id.toString() })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.post.publishedAt).toBeUndefined()
    }
  })

  it('should not be able to publish a non-existent post', async () => {
    const result = await sut.execute({ id: 'non-existent-id' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toEqual({ message: 'Post não encontrado' })
  })

  it('should toggle publication status correctly', async () => {
    const post = Post.create({
      title: 'Test Post',
      content: 'Content 1',
      excerpt: 'Excerpt 1',
      authorId: new UniqueEntityID('1'),
      categoryId: new UniqueEntityID('1'),
      slug: 'test-post'
    })

    await inMemoryPostsRepository.create(post)

    // First call should publish the post
    const publishResult = await sut.execute({ id: post.id.toString() })
    expect(publishResult.isRight()).toBe(true)
    if (publishResult.isRight()) {
      expect(publishResult.value.post.publishedAt).toBeDefined()
    }

    // Second call should unpublish the post
    const unpublishResult = await sut.execute({ id: post.id.toString() })
    expect(unpublishResult.isRight()).toBe(true)
    if (unpublishResult.isRight()) {
      expect(unpublishResult.value.post.publishedAt).toBeUndefined()
    }
  })
})
