import { Suspense } from 'react';
import { getUsers, getPosts, getTodos } from '@/app/lib/api';
import { deriveUserActivity } from '@/app/lib/utils';
import { UserListClient } from './UserListClient';

export const metadata = {
  title: 'Users | User Operations',
  description: 'Browse and filter all users',
};

export default async function UsersPage() {
  const [users, posts, todos] = await Promise.all([
    getUsers(),
    getPosts(),
    getTodos(),
  ]);

  const usersWithActivity = deriveUserActivity(users, posts, todos);

  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          Users
        </h1>
        <p className="mt-2 text-sm font-medium text-slate-400">
          Total {users.length} professional users found
        </p>
      </div>
      <Suspense fallback={
        <div className="grid gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-20 w-full animate-pulse rounded-2xl bg-indigo-50/50" />
          ))}
        </div>
      }>
        <UserListClient initialUsers={usersWithActivity} />
      </Suspense>
    </main>
  );
}