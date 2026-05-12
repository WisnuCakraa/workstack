'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useState, useEffect, useRef } from 'react';
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
  const inputRef = useRef<HTMLInputElement>(null);

  const search = searchParams.get('search') ?? '';
  const sort = searchParams.get('sort') ?? 'name_asc';
  const filter = searchParams.get('filter') ?? 'all';

  const [localSearch, setLocalSearch] = useState(search);
  const [prevSearch, setPrevSearch] = useState(search);
  const [isDebouncing, setIsDebouncing] = useState(false);

  if (search !== prevSearch) {
    setPrevSearch(search);
    setLocalSearch(search);
    setIsDebouncing(false);
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
    if (localSearch !== search) {
      const timer = setTimeout(() => {
        updateParam('search', localSearch);
        setIsDebouncing(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [localSearch, search, updateParam]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-xs">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-400">
          {isDebouncing ? (
            <Icon icon="solar:restart-linear" className="animate-spin text-lg" />
          ) : (
            <Icon icon="solar:magnifer-linear" className="text-lg" />
          )}
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search (type / to focus)..."
          value={localSearch}
          onChange={(e) => {
            setLocalSearch(e.target.value);
            if (e.target.value !== search) {
              setIsDebouncing(true);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setLocalSearch('');
              setIsDebouncing(true);
            }
          }}
          className="w-full rounded-xl border border-indigo-100 bg-white py-2 pl-10 pr-10 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-400 shadow-sm"
        />
        {localSearch && (
          <button
            onClick={() => setLocalSearch('')}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-300 hover:text-rose-400 transition"
          >
            <Icon icon="solar:close-circle-bold-duotone" className="text-lg" />
          </button>
        )}
      </div>

      <div className="flex gap-2">
        <select
          value={filter}
          onChange={(e) => updateParam('filter', e.target.value)}
          className={`rounded-xl border px-3 py-2 text-sm font-medium outline-none transition shadow-sm ${filter !== 'all'
              ? 'border-indigo-300 bg-indigo-50/50 text-indigo-600'
              : 'border-indigo-100 bg-white text-slate-700 focus:border-indigo-400'
            }`}
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
          className={`rounded-xl border px-3 py-2 text-sm font-medium outline-none transition shadow-sm ${sort !== 'name_asc'
              ? 'border-indigo-300 bg-indigo-50/50 text-indigo-600'
              : 'border-indigo-100 bg-white text-slate-700 focus:border-indigo-400'
            }`}
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