// libs/shared/ui/src/lib/button.tsx
'use client';

import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'glow';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: React.ReactNode;
  /* Theme: 'deep' | 'burst' | 'star' */
  theme?: 'deep' | 'burst' | 'star';
}

// ── Variant styles (theme-agnostic base, theme applied via className) ──
const variantClasses = (theme: string = 'deep'): Record<ButtonVariant, string> => {
  const themeMap = {
    deep: {
      primary: 'bg-deep-void-500 text-white hover:bg-deep-void-600 focus-visible:ring-deep-void-500 active:bg-deep-void-700 disabled:bg-deep-void-300 disabled:text-deep-void-500 shadow-glow-md hover:shadow-glow-lg',
      secondary: 'bg-deep-nebula-700 text-deep-cosmic-400 border-2 border-deep-cosmic-500 hover:bg-deep-nebula-600 focus-visible:ring-deep-cosmic-500 disabled:opacity-40',
      accent: 'bg-deep-cosmic-500 text-white hover:bg-deep-cosmic-600 focus-visible:ring-deep-cosmic-400 active:bg-deep-cosmic-700 shadow-glow-md',
      ghost: 'bg-transparent text-deep-nebula-100 hover:bg-deep-nebula-800 hover:text-deep-cosmic-400 focus-visible:ring-deep-void-500 transition-all',
      glow: 'bg-deep-void-500 text-white hover:shadow-glow-xl focus-visible:ring-deep-cosmic-400 animate-glow',
    },
    burst: {
      primary: 'bg-burst-plasma-500 text-white hover:bg-burst-plasma-600 focus-visible:ring-burst-plasma-400 active:bg-burst-plasma-700 disabled:bg-burst-plasma-300 shadow-glow-md hover:shadow-glow-lg',
      secondary: 'bg-burst-void-700 text-burst-aurora-400 border-2 border-burst-aurora-500 hover:bg-burst-void-600 focus-visible:ring-burst-aurora-400 disabled:opacity-40',
      accent: 'bg-burst-aurora-500 text-white hover:bg-burst-aurora-600 focus-visible:ring-burst-aurora-400 active:bg-burst-aurora-700 shadow-glow-md',
      ghost: 'bg-transparent text-burst-void-50 hover:bg-burst-void-800 hover:text-burst-aurora-400 focus-visible:ring-burst-plasma-500 transition-all',
      glow: 'bg-burst-plasma-500 text-white hover:shadow-glow-xl focus-visible:ring-burst-aurora-400 animate-glow',
    },
    star: {
      primary: 'bg-star-midnight-500 text-white hover:bg-star-midnight-600 focus-visible:ring-star-midnight-400 active:bg-star-midnight-700 disabled:bg-star-midnight-300 shadow-glow-md hover:shadow-glow-lg',
      secondary: 'bg-star-silver-700 text-star-aurora-400 border-2 border-star-aurora-500 hover:bg-star-silver-600 focus-visible:ring-star-aurora-400 disabled:opacity-40',
      accent: 'bg-star-aurora-500 text-white hover:bg-star-aurora-600 focus-visible:ring-star-aurora-400 active:bg-star-aurora-700 shadow-glow-md',
      ghost: 'bg-transparent text-star-silver-50 hover:bg-star-silver-800 hover:text-star-aurora-400 focus-visible:ring-star-midnight-500 transition-all',
      glow: 'bg-star-midnight-500 text-white hover:shadow-glow-xl focus-visible:ring-star-aurora-400 animate-glow',
    },
  };
  return themeMap[theme] || themeMap.deep;
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-5 py-2.5 text-sm rounded-lg font-semibold',
  lg: 'px-7 py-3 text-base rounded-xl font-semibold',
  xl: 'px-8 py-4 text-lg rounded-2xl font-bold',
};

export function Button({
  variant = 'primary',
  size = 'md',
  theme = 'deep',
  isLoading = false,
  className = '',
  disabled,
  children,
  ...props
}: ButtonProps) {
  const variantMap = variantClasses(theme);

  return (
    <button
      {...props}
      disabled={disabled ?? isLoading}
      className={[
        'inline-flex items-center justify-center gap-2 font-semibold',
        'transition-all duration-200 outline-none',
        'focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed',
        variantMap[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12" cy="12" r="10"
              stroke="currentColor" strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
          <span>Loading…</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}