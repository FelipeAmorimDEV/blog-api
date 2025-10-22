import { InMemoryPostsRepository } from "test/repositories/in-memory-posts-repository"
import { GetPostsByStatusUseCase } from "./get-posts-by-status"
import { Post } from "@/domain/enterprise/entities/post"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

let inMemoryPostsRepository: InMemoryPostsRepository
let sut: GetPostsByStatusUseCase

describe('Get Posts By Status', () => {
  beforeEach(() => {
    inMemoryPostsRepository = new InMemoryPostsRepository()
    sut = new GetPostsByStatusUseCase(inMemoryPostsRepository)
  })

  it('should be able to get all posts by status (published and drafts)', async () => {
    const publishedPost = Post.create({
      title: 'Published Post',
      content: 'Content 1',
      excerpt: 'Excerpt 1',
      authorId: new UniqueEntityID('1'),
      categoryId: new UniqueEntityID('1'),
      slug: 'published-post',
      publishedAt: new Date()
    })

    const draftPost = Post.create({
      title: 'Draft Post',
      content: 'Content 2',
      excerpt: 'Excerpt 2',
      authorId: new UniqueEntityID('2'),
      categoryId: new UniqueEntityID('2'),
      slug: 'draft-post'
    })

    await inMemoryPostsRepository.create(publishedPost)
    await inMemoryPostsRepository.create(draftPost)

    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.posts).toHaveLength(2)
      expect(result.value.posts).toEqual(expect.arrayContaining([publishedPost, draftPost]))
    }
  })

  it('should return empty array when no posts exist', async () => {
    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.posts).toHaveLength(0)
      expect(result.value.posts).toEqual([])
    }
  })

  it('should return only published posts when no drafts exist', async () => {
    const publishedPost = Post.create({
      title: 'Published Post',
      content: 'Content 1',
      excerpt: 'Excerpt 1',
      authorId: new UniqueEntityID('1'),
      categoryId: new UniqueEntityID('1'),
      slug: 'published-post',
      publishedAt: new Date()
    })

    await inMemoryPostsRepository.create(publishedPost)

    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.posts).toHaveLength(1)
      expect(result.value.posts[0]).toEqual(publishedPost)
    }
  })

  it('should return only draft posts when no published posts exist', async () => {
    const draftPost = Post.create({
      title: 'Draft Post',
      content: 'Content 1',
      excerpt: 'Excerpt 1',
      authorId: new UniqueEntityID('1'),
      categoryId: new UniqueEntityID('1'),
      slug: 'draft-post'
    })

    await inMemoryPostsRepository.create(draftPost)

    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.posts).toHaveLength(1)
      expect(result.value.posts[0]).toEqual(draftPost)
    }
  })
})
