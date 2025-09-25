import { UsersRepository } from "@/domain/application/repositories/users-repository"
import { User } from "@/domain/enterprise/entities/user"

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []
  
  findById(id: string): Promise<User | null> {
    return Promise.resolve(this.items.find(item => item.id.toString() === id) || null)
  }
  
  findByEmail(email: string): Promise<User | null> {
    return Promise.resolve(this.items.find(item => item.email === email) || null)
  }
  
  findAll(): Promise<User[]> {
    return Promise.resolve(this.items)
  }
  
  update(user: User): Promise<void> {
    const index = this.items.findIndex(item => item.id.toString() === user.id.toString())
    this.items[index] = user
    return Promise.resolve()
  }
  
  delete(id: string): Promise<void> {
    this.items = this.items.filter(item => item.id.toString() !== id)
    return Promise.resolve()
  }
  
  async create(user: User): Promise<void> {
    this.items.push(user)
  }
}

