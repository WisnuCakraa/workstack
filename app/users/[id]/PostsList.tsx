'use client'

import { useState } from 'react'
import { Post } from '@/app/lib/types'
import { Icon } from '@iconify/react'

export function PostsList({ posts }: { posts: Post[] }) {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? posts : posts.slice(0, 3)

  if (posts.length === 0) {
    return (
      <section>
        <h2 className="mb-3 text-base font-semibold text-gray-900">
          Posts
        </h2>
        <p className="text-sm text-gray-400">No posts yet.</p>
      </section>
    )
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Icon icon="solar:document-text-bold-duotone" className="text-indigo-400" />
          Posts
          <span className="text-sm font-medium text-slate-300 ml-1">
            {posts.length}
          </span>
        </h2>
      </div>

      <ul className="space-y-3">
        {visible.map((post) => (
          <li
            key={post.id}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:border-indigo-100"
          >
            <p className="mb-2 font-bold capitalize text-slate-800 line-clamp-1">
              {post.title}
            </p>
            <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{post.body}</p>
          </li>
        ))}
      </ul>

      {posts.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition"
        >
          <Icon icon={expanded ? "solar:alt-arrow-up-linear" : "solar:alt-arrow-down-linear"} />
          {expanded ? 'Show less' : `See ${posts.length - 3} more publications`}
        </button>
      )}
    </section>
  )
}