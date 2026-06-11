import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'USD', locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatNumber(num: number, locale = 'en-US') {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
  return new Intl.NumberFormat(locale).format(num)
}

export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions) {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  }).format(d)
}

export function formatRelativeTime(date: Date | string) {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffSeconds < 60) return 'just now'
  if (diffMinutes < 60) return `${diffMinutes}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return formatDate(d)
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

export function truncate(str: string, length: number) {
  return str.length > length ? `${str.substring(0, length)}...` : str
}

export function generateId(prefix = '') {
  const id = Math.random().toString(36).substring(2) + Date.now().toString(36)
  return prefix ? `${prefix}_${id}` : id
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return function (...args: Parameters<T>) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    active: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20',
    inactive: 'text-gray-600 bg-gray-50 dark:bg-gray-900/20',
    pending: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20',
    success: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20',
    error: 'text-red-600 bg-red-50 dark:bg-red-900/20',
    warning: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20',
    new: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20',
    open: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20',
    closed: 'text-gray-600 bg-gray-50 dark:bg-gray-900/20',
    completed: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20',
    draft: 'text-gray-600 bg-gray-50 dark:bg-gray-900/20',
    published: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20',
    scheduled: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20',
  }
  return colors[status.toLowerCase()] || 'text-gray-600 bg-gray-50 dark:bg-gray-900/20'
}

export function calculateGrowth(current: number, previous: number) {
  if (previous === 0) return current > 0 ? 100 : 0
  return ((current - previous) / previous) * 100
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
