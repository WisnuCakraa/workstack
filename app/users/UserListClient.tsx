'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useMemo, useCallback } from 'react';
import { UserWithActivity } from '@/app/lib/types';
import { UserTable } from './UserTable';
import { UserCard } from './UserCard';
import { UserFilters } from './UserFilters';
import { EmptyState } from '@/components/ui/EmptyState';
import { Pagination } from '@/components/ui/Pagination';

const PAGE_SIZE = 5;

interface UserListClientProps {
  initialUsers: UserWithActivity[];
}

export function UserListClient({ initialUsers }: UserListClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const search = searchParams.get('search')?.toLowerCase() ?? '';
  const sort = searchParams.get('sort') ?? 'name_asc';
  const filter = searchParams.get('filter') ?? 'all';
  const page = Number(searchParams.get('page') ?? '1');

  const filtered = useMemo(() => {
    let result = [...initialUsers];

    if (search) {
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(search) ||
          u.email.toLowerCase().includes(search)
      );
    }

    if (filter === 'has_pending') {
      result = result.filter((u) => u.pendingTodos > 0);
    } else if (filter === 'no_completed') {
      result = result.filter((u) => u.completedTodos === 0);
    }

    result.sort((a, b) => {
      switch (sort) {
        case 'name_desc':
          return b.name.localeCompare(a.name);
        case 'pending_desc':
          return b.pendingTodos - a.pendingTodos;
        case 'posts_desc':
          return b.totalPosts - a.totalPosts;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return result;
  }, [initialUsers, search, sort, filter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const safePage = Math.min(Math.max(1, page), totalPages || 1);
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(newPage));
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  return (
    <div className="space-y-4">
      <UserFilters />

      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="hidden md:block">
            <UserTable users={paginated} />
          </div>

          <div className="grid gap-3 md:hidden">
            {paginated.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Showing {(safePage - 1) * PAGE_SIZE + 1}–
              {Math.min(safePage * PAGE_SIZE, filtered.length)} of{' '}
              {filtered.length} users
            </p>
            <Pagination
              currentPage={safePage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
}