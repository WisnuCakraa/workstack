'use client'

import { useState } from 'react'
import { Todo } from '@/app/lib/types'
import { Icon } from '@iconify/react'

type TabType = 'all' | 'pending' | 'completed'

export function TodosList({ todos }: { todos: Todo[] }) {
  const [tab, setTab] = useState<TabType>('pending')

  const filtered = todos.filter((t) => {
    if (tab === 'pending') return !t.completed
    if (tab === 'completed') return t.completed
    return true
  })

  const tabs: { label: string; value: TabType; count: number; }[] = [
    { label: 'Pending', value: 'pending', count: todos.filter((t) => !t.completed).length },
    { label: 'Completed', value: 'completed', count: todos.filter((t) => t.completed).length },
    { label: 'All', value: 'all', count: todos.length },
  ]

  return (
    <section>
      <h2 className="mb-4 text-xl font-bold text-slate-800">
        Tasks
      </h2>

      <div className="mb-4 flex gap-1 rounded-xl bg-slate-100/50 p-1">
        {tabs.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            data-testid={`tab-${t.value}`}
            className={`flex-1 rounded-lg px-3 py-2 text-xs font-bold transition-all ${tab === t.value
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
              }`}
          >
            {t.label} <span className="ml-1 opacity-60 font-medium">{t.count}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p data-testid="todos-empty" className="text-sm text-gray-400">Nothing here.</p>
      ) : (
        <ul data-testid="todos-list" className="grid gap-2">
          {filtered.slice(0, 8).map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm transition hover:border-indigo-100"
            >
              <div className="shrink-0">
                {todo.completed ? (
                  <Icon icon="solar:check-circle-bold-duotone" className="text-xl text-emerald-500" />
                ) : (
                  <Icon icon="solar:clock-circle-bold-duotone" className="text-xl text-amber-500" />
                )}
              </div>
              <span
                className={`text-sm font-medium ${todo.completed
                  ? 'text-slate-300 line-through'
                  : 'text-slate-600'
                  }`}
              >
                {todo.title}
              </span>
            </li>
          ))}
        </ul>
      )}

      {filtered.length > 8 && (
        <p className="mt-2 text-xs text-gray-400">
          +{filtered.length - 8} more {tab} todos
        </p>
      )}
    </section>
  )
}