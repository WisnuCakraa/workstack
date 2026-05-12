'use client'
import Link from 'next/link';
import { Icon } from '@iconify/react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
      <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-400">
        <Icon icon="solar:danger-triangle-bold-duotone" className="text-3xl" />
      </div>
      <p className="text-slate-500 font-medium">Failed to load user: {error.message}</p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="rounded-xl bg-indigo-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-600"
        >
          Try again
        </button>
        <Link
          href="/users"
          className="rounded-xl border-2 border-indigo-50 bg-white px-6 py-2.5 text-sm font-bold text-indigo-500 transition hover:bg-indigo-50"
        >
          Back to List
        </Link>
      </div>
    </div>
  );
}