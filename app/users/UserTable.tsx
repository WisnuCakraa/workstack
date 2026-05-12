
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { UserWithActivity } from '@/app/lib/types';

interface UserTableProps {
  users: UserWithActivity[];
}

export function UserTable({ users }: UserTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-indigo-100 bg-white shadow-sm shadow-indigo-100/50">
      <table className="w-full text-sm text-slate-600">
        <thead>
          <tr className="border-b border-indigo-100 bg-slate-50/50">
            {['Name', 'Email', 'Website', 'Posts', 'Done', 'Pending'].map(
              (h) => (
                <th
                  key={h}
                  className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                >
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {users.map((user) => (
            <tr
              key={user.id}
              data-testid="user-row"
              className="group relative bg-white transition-colors hover:bg-indigo-50/40"
            >
              <td className="px-4 py-3">
                <Link
                  href={`/users/${user.id}`}
                  className="font-semibold text-slate-700 hover:text-indigo-600 after:absolute after:inset-0"
                >
                  {user.name}
                </Link>
              </td>
              <td className="px-4 py-3 text-slate-500">
                {user.email}
              </td>
              <td className="px-4 py-3">
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 text-slate-400 hover:text-indigo-500 hover:underline"
                >
                  {user.website}
                </a>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Icon icon="solar:document-text-linear" className="text-slate-400" />
                  {user.totalPosts}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1.5 font-medium text-emerald-600">
                  <Icon icon="solar:check-circle-bold-duotone" className="text-emerald-500 text-lg" />
                  {user.completedTodos}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className={`flex items-center gap-1.5 font-medium ${user.pendingTodos > 5 ? 'text-rose-500' : 'text-amber-500'}`}>
                  <Icon icon="solar:clock-circle-bold-duotone" className={`text-lg ${user.pendingTodos > 5 ? 'text-rose-400' : 'text-amber-400'}`} />
                  {user.pendingTodos}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}