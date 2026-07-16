import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'

const variants: Record<Variant, string> = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-500 disabled:bg-indigo-300',
  secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
  ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
  danger: 'bg-red-600 text-white hover:bg-red-500 disabled:bg-red-300',
}

export const Button = ({
  variant = 'primary',
  className,
  loading,
  children,
  disabled,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; loading?: boolean }) => (
  <button
    disabled={disabled || loading}
    className={cn(
      'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium',
      'transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500',
      'disabled:cursor-not-allowed',
      variants[variant],
      className,
    )}
    {...props}
  >
    {loading && (
      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
    )}
    {children}
  </button>
)