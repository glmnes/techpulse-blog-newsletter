'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface UseKeyboardNavigationProps {
  previousUrl?: string
  nextUrl?: string
  onSearch?: () => void
}

export function useKeyboardNavigation({
  previousUrl,
  nextUrl,
  onSearch
}: UseKeyboardNavigationProps) {
  const router = useRouter()

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return
      }

      switch (event.key.toLowerCase()) {
        case 'j':
          if (nextUrl) {
            router.push(nextUrl)
          }
          break
        case 'k':
          if (previousUrl) {
            router.push(previousUrl)
          }
          break
        case '/':
          event.preventDefault()
          if (onSearch) {
            onSearch()
          }
          break
        case 'escape':
          // Remove focus from any focused element
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur()
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [previousUrl, nextUrl, onSearch, router])
}
