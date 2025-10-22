import { User } from "@/domain/enterprise/entities/user"

export class HttpUserPresenter {
  static toHttp(user: User) {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar ?? '',
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  static toHttpList(users: User[]) {
    return users.map(HttpUserPresenter.toHttp)
  }
}
