import { Icon } from '@iconify/react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
}

export function EmptyState({
  title = 'No results found',
  description = 'Try adjusting your search or filter.',
  onReset,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-slate-300 shadow-inner">
        <Icon icon="solar:magnifer-zoom-out-linear" className="text-3xl" />
      </div>
      <h3 className="mb-2 text-lg font-bold text-slate-700">
        {title}
      </h3>
      <p className="max-w-[200px] text-sm font-medium text-slate-400">{description}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="mt-6 rounded-xl bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-600 transition hover:bg-indigo-100 active:scale-95"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}