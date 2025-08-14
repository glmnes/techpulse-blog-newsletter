'use client'

import { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Extract headings from content
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = content
    
    const extractedHeadings: TocItem[] = []
    const headingElements = tempDiv.querySelectorAll('h2, h3')
    
    headingElements.forEach((heading) => {
      const id = heading.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || ''
      extractedHeadings.push({
        id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1))
      })
    })
    
    setHeadings(extractedHeadings)

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0% -70% 0%',
        threshold: 1.0
      }
    )

    // Observe all headings
    document.querySelectorAll('article h2, article h3').forEach((heading) => {
      const id = heading.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || ''
      heading.id = id
      observer.observe(heading)
    })

    return () => observer.disconnect()
  }, [content])

  if (headings.length === 0) return null

  return (
    <nav className="max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h3 className="text-sm font-mono uppercase tracking-wider text-brutal-gray-500 mb-4">
        Table of Contents
      </h3>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
          >
            <a
              href={`#${heading.id}`}
              className={`flex items-center gap-2 py-1 transition-colors ${
                activeId === heading.id
                  ? 'text-cyber-blue'
                  : 'text-brutal-gray-400 hover:text-brutal-gray-200'
              }`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center'
                })
              }}
            >
              <ChevronRight className={`w-3 h-3 transition-transform ${
                activeId === heading.id ? 'rotate-90' : ''
              }`} />
              <span className={heading.level === 2 ? 'font-medium' : ''}>
                {heading.text}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
