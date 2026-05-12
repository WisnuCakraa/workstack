import { User, Post, Todo, UserWithActivity } from './types';

export function deriveUserActivity(
  users: User[],
  posts: Post[],
  todos: Todo[]
): UserWithActivity[] {
  return users.map((user) => ({
    ...user,
    totalPosts: posts.filter((p) => p.userId === user.id).length,
    completedTodos: todos.filter((t) => t.userId === user.id && t.completed)
      .length,
    pendingTodos: todos.filter((t) => t.userId === user.id && !t.completed)
      .length,
  }));
}