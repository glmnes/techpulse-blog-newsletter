'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Articles', href: '/articles' },
  { name: 'About', href: '/about' },
  { name: 'Newsletter', href: '/newsletter' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brutal-gray-800 bg-brutal-black/95 backdrop-blur supports-[backdrop-filter]:bg-brutal-black/60">
      <div className="container-brutal">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-display font-bold tracking-tight">
              Tech<span className="text-gradient">Pulse</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-mono uppercase tracking-wider transition-colors hover:text-cyber-blue",
                  pathname === item.href
                    ? "text-cyber-blue"
                    : "text-brutal-gray-400"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/newsletter" className="btn-brutal text-xs">
              Subscribe
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
