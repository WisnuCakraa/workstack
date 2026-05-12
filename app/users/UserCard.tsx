import Link from 'next/link';
import { Icon } from '@iconify/react';
import { UserWithActivity } from '@/app/lib/types';

export function UserCard({ user }: { user: UserWithActivity }) {
  return (
    <Link
      href={`/users/${user.id}`}
      className="block rounded-2xl border border-indigo-100 bg-white p-5 transition-all hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100 active:scale-[0.98]"
    >
      <div className="mb-1 font-medium text-slate-800">
        {user.name}
      </div>
      <div className="mb-4 text-sm text-slate-500">{user.email}</div>

      <div className="flex gap-2 text-xs">
        <span className="flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-slate-600 border border-slate-100">
          <Icon icon="solar:document-text-linear" />
          {user.totalPosts}
        </span>
        <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-600 border border-emerald-100">
          <Icon icon="solar:check-circle-bold-duotone" />
          {user.completedTodos}
        </span>
        <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-amber-600 border border-amber-100">
          <Icon icon="solar:clock-circle-bold-duotone" />
          {user.pendingTodos}
        </span>
      </div>
    </Link>
  );
}