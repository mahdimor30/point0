import { cn } from '@/lib/utils'
import { forwardRef, type InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, className, id, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={cn(
          'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400',
          'focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-indigo-500',
          error ? 'border-red-400' : 'border-slate-200',
          className,
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  ),
)
Input.displayName = 'Input'