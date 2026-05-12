import { UserWithActivity, Post, Todo, User } from '@/app/lib/types';

export const mockUsers: UserWithActivity[] = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    phone: '1-770-736-0800',
    website: 'hildegard.org',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: { lat: '-37.3159', lng: '81.1496' },
    },
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets',
    },
    totalPosts: 10,
    completedTodos: 5,
    pendingTodos: 5,
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    phone: '010-692-6593',
    website: 'anastasia.net',
    address: {
      street: 'Victor Plains',
      suite: 'Suite 879',
      city: 'Wisokyburgh',
      zipcode: '90566-7771',
      geo: { lat: '-43.9509', lng: '-34.4618' },
    },
    company: {
      name: 'Deckow-Crist',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains',
    },
    totalPosts: 10,
    completedTodos: 0,
    pendingTodos: 10,
  },
];

export const mockUser: User = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  phone: '1-770-736-0800',
  website: 'hildegard.org',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: { lat: '-37.3159', lng: '81.1496' },
  },
  company: {
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets',
  },
};

export const mockPosts: Post[] = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  userId: 1,
  title: `Post title ${i + 1}`,
  body: `Post body ${i + 1}`,
}));

export const mockTodos: Todo[] = [
  { id: 1, userId: 1, title: 'Todo pending 1', completed: false },
  { id: 2, userId: 1, title: 'Todo pending 2', completed: false },
  { id: 3, userId: 1, title: 'Todo completed 1', completed: true },
];