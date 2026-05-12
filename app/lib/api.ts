import { User, Post, Todo } from './types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const defaultOptions: RequestInit = {
  next: { revalidate: 60 },
};

export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${BASE_URL}/users`, defaultOptions);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export async function getUserById(id: number): Promise<User> {
  const res = await fetch(`${BASE_URL}/users/${id}`, defaultOptions);
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
}

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts`, defaultOptions);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(`${BASE_URL}/todos`, defaultOptions);
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
}

export async function getPostsByUserId(userId: number): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts?userId=${userId}`, defaultOptions);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export async function getTodosByUserId(userId: number): Promise<Todo[]> {
  const res = await fetch(`${BASE_URL}/todos?userId=${userId}`, defaultOptions);
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
}
