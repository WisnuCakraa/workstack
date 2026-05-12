import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import type { Metadata } from 'next'
import { getUserById, getPostsByUserId, getTodosByUserId } from '@/app/lib/api'
import { UserDetailCard } from './UserDetailCard'
import { PostsList } from './PostsList'
import { TodosList } from './TodosList'
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id: rawId } = await params;
  const id = Number(rawId);
  if (isNaN(id)) return { title: 'User not found' }

  try {
    const user = await getUserById(id)
    return {
      title: `${user.name} | User Operations`,
      description: `${user.name} — ${user.email} — ${user.company.name}`,
    }
  } catch {
    return { title: 'User not found' }
  }
}

export default async function UserDetailPage({ params }: PageProps) {
  const { id: rawId } = await params;
  const id = Number(rawId);

  if (isNaN(id)) notFound();

  const [user, posts, todos] = await Promise.all([
    getUserById(id).catch(() => null),
    getPostsByUserId(id),
    getTodosByUserId(id),
  ]);

  if (!user) notFound();

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <Link
        href="/users"
        className="inline-flex items-center gap-2 text-sm font-bold text-indigo-500 hover:text-indigo-600 transition group"
      >
        <Icon icon="solar:alt-arrow-left-linear" className="transition-transform group-hover:-translate-x-1" />
        Back to Users List
      </Link>

      <UserDetailCard user={user} />

      <ErrorBoundary>
        <div className="space-y-8 rounded-2xl border border-indigo-100 bg-indigo-50/30 p-8 shadow-sm">
          <PostsList posts={posts} />
          <div className="h-px bg-indigo-100" />
          <TodosList todos={todos} />
        </div>
      </ErrorBoundary>
    </main>
  );
}