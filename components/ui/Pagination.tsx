import { Icon } from '@iconify/react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-100 bg-white text-indigo-500 shadow-sm transition hover:bg-indigo-50 hover:border-indigo-200 disabled:opacity-40 disabled:hover:bg-white active:scale-95"
      >
        <Icon icon="solar:alt-arrow-left-linear" className="text-xl" />
      </button>

      <div className="flex items-center gap-1.5">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            aria-label={`Go to page ${p}`}
            aria-current={currentPage === p ? 'page' : undefined}
            className={`h-10 w-10 rounded-xl text-sm font-bold transition active:scale-95 ${
              currentPage === p
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-100'
                : 'text-slate-400 hover:bg-indigo-50 hover:text-indigo-500'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-100 bg-white text-indigo-500 shadow-sm transition hover:bg-indigo-50 hover:border-indigo-200 disabled:opacity-40 disabled:hover:bg-white active:scale-95"
      >
        <Icon icon="solar:alt-arrow-right-linear" className="text-xl" />
      </button>
    </div>
  );
}