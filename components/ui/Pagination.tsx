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
    <div className="flex items-center gap-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center rounded-lg border border-indigo-100 px-3 py-1.5 text-indigo-500 transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Icon icon="solar:alt-arrow-left-linear" className="text-lg" />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`rounded-lg px-3 py-1.5 text-sm transition ${p === currentPage
              ? 'bg-indigo-300 text-white shadow-sm'
              : 'border border-indigo-100 text-indigo-500 hover:bg-indigo-50'
            }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center rounded-lg border border-indigo-100 px-3 py-1.5 text-indigo-500 transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Icon icon="solar:alt-arrow-right-linear" className="text-lg" />
      </button>
    </div>
  );
}