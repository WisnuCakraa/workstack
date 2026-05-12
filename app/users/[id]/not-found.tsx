import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <div className="text-5xl">👤</div>
      <h2 className="text-lg font-semibold text-gray-900">
        User not found
      </h2>
      <p className="text-sm text-gray-500">
        The user you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Link
        href="/users"
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
      >
        Back to list
      </Link>
    </div>
  );
}