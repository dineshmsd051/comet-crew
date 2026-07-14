'use client';

import React from 'react';
import { Button } from './button';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  theme?: 'deep' | 'burst' | 'star';
}

export function EmptyState({ icon, title, description, actionLabel, onAction, theme = 'deep' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-cosmic-400/20 bg-nebula-800/50 py-20 px-8 text-center">
      <span className="text-6xl" aria-hidden="true">{icon}</span>
      <h3 className="text-2xl font-bold text-nebula-100">{title}</h3>
      <p className="max-w-sm text-nebula-400">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" size="md" theme={theme} onClick={onAction} className="mt-2">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}