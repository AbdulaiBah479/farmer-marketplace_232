import { useState, useCallback } from 'react'

interface Toast {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
}

const toasts: Toast[] = []
const listeners: Array<(toasts: Toast[]) => void> = []

function notify() {
  listeners.forEach(l => l([...toasts]))
}

export function toast({ title, description, variant = 'default' }: Omit<Toast, 'id'>) {
  const id = Math.random().toString(36).slice(2)
  toasts.push({ id, title, description, variant })
  notify()
  setTimeout(() => {
    const idx = toasts.findIndex(t => t.id === id)
    if (idx > -1) { toasts.splice(idx, 1); notify() }
  }, 4000)
}

export function useToast() {
  const [currentToasts, setCurrentToasts] = useState<Toast[]>([])
  const subscribe = useCallback(() => {
    const handler = (t: Toast[]) => setCurrentToasts(t)
    listeners.push(handler)
    return () => { const i = listeners.indexOf(handler); if (i > -1) listeners.splice(i, 1) }
  }, [])
  useState(subscribe)
  return { toasts: currentToasts, toast }
}
