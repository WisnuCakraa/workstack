'use client'
import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <Skeleton className="h-6 w-28 rounded-lg" />
      <div className="space-y-6 rounded-2xl border border-indigo-100 bg-white p-8 shadow-sm">
        <Skeleton className="h-9 w-64 rounded-xl" />
        <Skeleton className="h-5 w-48 rounded-lg" />
        <div className="grid grid-cols-2 gap-6 pt-4">
          <Skeleton className="h-24 rounded-2xl" />
          <Skeleton className="h-24 rounded-2xl" />
        </div>
      </div>
      <Skeleton className="h-64 w-full rounded-2xl" />
      <Skeleton className="h-64 w-full rounded-2xl" />
    </div>
  );
}