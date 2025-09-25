import { InMemoryPostsRepository } from "test/repositories/in-memory-posts-repository"
import { CreatePostUseCase } from "./create-post"

let inMemoryPostsRepository: InMemoryPostsRepository
let sut: CreatePostUseCase
describe('Create Post', () => {

    beforeEach(() => {
        inMemoryPostsRepository = new InMemoryPostsRepository()
        sut = new CreatePostUseCase(inMemoryPostsRepository)
    })

  it('should be able to create a post', async () => {
    const result = await sut.execute({
      title: 'Post 1',
      content: 'Content 1',
      excerpt: 'Excerpt 1',
      authorId: '1',
      categoryId: '1',
    })

    expect(result.post.id).toBeDefined()
    expect(result.post.title).toBe('Post 1')
    expect(result.post.content).toBe('Content 1')
    expect(result.post.excerpt).toBe('Excerpt 1')
  })
})