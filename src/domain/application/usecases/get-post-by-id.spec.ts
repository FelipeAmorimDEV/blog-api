import { InMemoryPostsRepository } from "test/repositories/in-memory-posts-repository"
import { GetPostByIdUseCase } from "./get-post-by-id"
import { Post } from "@/domain/enterprise/entities/post"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

let inMemoryPostsRepository: InMemoryPostsRepository
let sut: GetPostByIdUseCase

describe('Get Post By ID', () => {
  beforeEach(() => {
    inMemoryPostsRepository = new InMemoryPostsRepository()
    sut = new GetPostByIdUseCase(inMemoryPostsRepository)
  })

  it('should be able to get a post by id', async () => {
    const post = Post.create({
      title: 'Post 1',
      content: 'Content 1',
      excerpt: 'Excerpt 1',
      authorId: new UniqueEntityID('1'),
      categoryId: new UniqueEntityID('1'),
      slug: 'post-1'
    })

    await inMemoryPostsRepository.create(post)

    const result = await sut.execute({ id: post.id.toString() })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.post).toEqual(post)
      expect(result.value.post.title).toBe('Post 1')
    }
  })

  it('should throw ResourceNotFoundError when post does not exist', async () => {
    const result = await sut.execute({ id: 'non-existent-id' })

    expect(result.isLeft()).toBe(true)
    if (result.isLeft()) {
      expect(result.value.message).toBe('Resource not found')
    }
  })
})

