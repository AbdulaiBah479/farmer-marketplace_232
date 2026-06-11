'use client'
import { useToast } from '@/hooks/use-toast'

export function Toaster() {
  const { toasts } = useToast()
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full">
      {toasts.map(({ id, title, description, variant }) => (
        <div
          key={id}
          className={`p-4 rounded-xl border shadow-lg backdrop-blur text-sm transition-all ${
            variant === 'destructive'
              ? 'bg-red-950 border-red-800 text-red-200'
              : 'bg-gray-900 border-white/10 text-white'
          }`}
        >
          {title && <p className="font-semibold">{title}</p>}
          {description && <p className="text-gray-400 text-xs mt-0.5">{description}</p>}
        </div>
      ))}
    </div>
  )
}
