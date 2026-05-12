'use client'
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
      <p className="text-slate-500 font-medium">Something went wrong: {error.message}</p>
      <button
        onClick={reset}
        className="rounded-xl bg-indigo-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-600"
      >
        Try again
      </button>
    </div>
  );
}