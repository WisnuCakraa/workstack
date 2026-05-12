import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-slate-50 font-sans min-h-screen">
      <main className="flex w-full max-w-4xl flex-1 flex-col items-center justify-center bg-white px-8 py-24 sm:rounded-3xl sm:my-12 sm:shadow-xl sm:shadow-indigo-100/50 text-center">
        <div className="mb-12 flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-500 shadow-inner">
          <Icon icon="solar:users-group-rounded-bold-duotone" className="text-5xl" />
        </div>

        <div className="flex flex-col items-center gap-6 mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-800">
            Workstack <span className="text-indigo-500">Ops</span>
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-slate-500 font-medium">
            A minimalist dashboard for managing your professional network.
            Track activities, posts, and tasks with a clean pastel interface.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/users"
            className="flex h-14 items-center justify-center gap-3 rounded-2xl bg-indigo-500 px-8 text-lg font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-600 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Icon icon="solar:globus-linear" className="text-xl" />
            Browse Users
          </Link>
          <a
            href="https://github.com/WisnuCakraa/workstack"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 items-center justify-center gap-3 rounded-2xl border-2 border-indigo-100 bg-white px-8 text-lg font-bold text-indigo-500 transition hover:bg-indigo-50 hover:border-indigo-200"
          >
            <Icon icon="solar:code-bold-duotone" className="text-xl" />
            Source Code
          </a>
        </div>
      </main>
    </div>
  );
}
