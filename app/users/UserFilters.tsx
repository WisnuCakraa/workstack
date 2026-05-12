'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

const SORT_OPTIONS = [
  { label: 'Name (A-Z)', value: 'name_asc' },
  { label: 'Name (Z-A)', value: 'name_desc' },
  { label: 'Most pending todos', value: 'pending_desc' },
  { label: 'Most posts', value: 'posts_desc' },
];

const FILTER_OPTIONS = [
  { label: 'All users', value: 'all' },
  { label: 'Has pending todos', value: 'has_pending' },
  { label: 'No completed todos', value: 'no_completed' },
];

export function UserFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get('search') ?? '';
  const sort = searchParams.get('sort') ?? 'name_asc';
  const filter = searchParams.get('filter') ?? 'all';

  const [localSearch, setLocalSearch] = useState(search);
  const [prevSearch, setPrevSearch] = useState(search);

  if (search !== prevSearch) {
    setPrevSearch(search);
    setLocalSearch(search);
  }

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      if (key !== 'page') params.delete('page');

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== search) {
        updateParam('search', localSearch);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [localSearch, search, updateParam]);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-xs">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-400">
          <Icon icon="solar:magnifer-linear" className="text-lg" />
        </div>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="w-full rounded-xl border border-indigo-100 bg-white py-2 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-400 shadow-sm"
        />
      </div>

      <div className="flex gap-2">
        <select
          value={filter}
          onChange={(e) => updateParam('filter', e.target.value)}
          className="rounded-xl border border-indigo-100 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 shadow-sm"
        >
          {FILTER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => updateParam('sort', e.target.value)}
          className="rounded-xl border border-indigo-100 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 shadow-sm"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}