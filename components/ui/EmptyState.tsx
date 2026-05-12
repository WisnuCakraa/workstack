import { Icon } from '@iconify/react';

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({
  title = 'No results found',
  description = 'Try adjusting your search or filter.',
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
    </div>
  );
}