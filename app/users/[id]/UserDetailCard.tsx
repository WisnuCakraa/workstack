import { User } from '@/app/lib/types';
import { Icon } from '@iconify/react';

export function UserDetailCard({ user }: { user: User }) {
  return (
    <div data-testid="user-detail-card" className="rounded-2xl border border-indigo-100 bg-white p-8 shadow-sm">
      <div className="mb-8 border-b border-slate-100 pb-6">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          {user.name}
        </h1>
        <div className="mt-2 flex items-center gap-2 text-indigo-500">
          <Icon icon="solar:user-circle-linear" className="text-xl" />
          <p className="text-sm font-medium">@{user.username}</p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <section data-testid="contact-section">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-400">
            Contact
          </h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-3">
              <Icon icon="solar:letter-linear" className="text-indigo-400" />
              <a
                href={`mailto:${user.email}`}
                className="text-indigo-600 font-medium hover:underline"
              >
                {user.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Icon icon="solar:phone-linear" className="text-indigo-400" />
              <span className="text-slate-600 font-medium">
                {user.phone}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Icon icon="solar:global-linear" className="text-indigo-400" />
              <a
                href={`https://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 font-medium hover:underline"
              >
                {user.website}
              </a>
            </li>
          </ul>
        </section>

        <section data-testid="address-section">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-400">
            Address
          </h2>
          <div className="flex gap-3">
            <Icon icon="solar:map-point-linear" className="mt-1 text-indigo-400 shrink-0" />
            <address className="space-y-1 text-sm not-italic text-slate-600 font-medium leading-relaxed">
              <p>{user.address.street}, {user.address.suite}</p>
              <p>{user.address.city}</p>
              <p className="text-slate-400 font-normal">{user.address.zipcode}</p>
            </address>
          </div>
        </section>

        <section data-testid="company-section" className="sm:col-span-2">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-400">
            Company
          </h2>
          <div className="flex gap-4 rounded-2xl bg-indigo-50/50 p-6 border border-indigo-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-indigo-500 shadow-sm shrink-0">
              <Icon icon="solar:case-linear" className="text-2xl" />
            </div>
            <div>
              <p className="font-bold text-slate-800">
                {user.company.name}
              </p>
              <p className="mt-1 text-sm italic text-slate-500">
                &ldquo;{user.company.catchPhrase}&rdquo;
              </p>
            </div>
          </div>
        </section>
      </div >
    </div >
  );
}