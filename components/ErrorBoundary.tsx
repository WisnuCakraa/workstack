'use client';

import React from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
          <Icon icon="solar:danger-triangle-bold-duotone" className="text-6xl text-rose-400" />
          <h2 className="text-lg font-semibold text-gray-800">
            Something went wrong
          </h2>
          <p className="max-w-sm text-center text-sm text-gray-500">
            {this.state.error?.message ?? 'An unexpected error occurred.'}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="rounded-lg bg-indigo-400 px-4 py-2 text-sm text-white transition hover:bg-indigo-500"
            >
              Try again
            </button>
            <Link
              href="/users"
              className="rounded-lg border border-indigo-100 px-4 py-2 text-sm text-indigo-500 transition hover:bg-indigo-50"
            >
              Back to list
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}