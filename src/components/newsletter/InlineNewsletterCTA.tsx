'use client'

import { useState } from 'react'
import { Loader2, Mail } from 'lucide-react'

interface InlineNewsletterCTAProps {
  variant?: 'default' | 'minimal'
  position?: 'start' | 'middle' | 'end'
}

export default function InlineNewsletterCTA({ 
  variant = 'default',
  position = 'middle' 
}: InlineNewsletterCTAProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Check your email to confirm subscription!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong')
      }
    } catch (err) {
      console.error('Newsletter subscription error:', err)
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  const getHeadline = () => {
    switch (position) {
      case 'start':
        return 'Before you dive in...'
      case 'end':
        return 'Want more like this?'
      default:
        return 'Stay on the cutting edge'
    }
  }

  const getSubheadline = () => {
    switch (position) {
      case 'start':
        return 'Get weekly updates on AGI progress and enhancement tech.'
      case 'end':
        return 'Join our newsletter for weekly analysis of AGI breakthroughs.'
      default:
        return 'Weekly insights on AGI and convergence technologies.'
    }
  }

  if (variant === 'minimal') {
    return (
      <div className="my-8 p-4 bg-brutal-gray-900 border border-brutal-gray-800 rounded">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <Mail className="hidden sm:block w-5 h-5 text-cyber-blue mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-brutal-gray-300 mb-2">{getSubheadline()}</p>
            <div className="flex gap-2">
              <input
                type="email"
                name="email"
                id="inline-newsletter-email-minimal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={status === 'loading'}
                autoComplete="email"
                className="flex-1 px-3 py-2 bg-brutal-black border border-brutal-gray-800 rounded text-sm font-mono placeholder-brutal-gray-600 focus:border-cyber-blue focus:outline-none transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-4 py-2 bg-cyber-blue text-brutal-black font-bold text-sm rounded hover:bg-cyber-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Subscribe'}
              </button>
            </div>
            {message && (
              <p className={`mt-2 text-xs ${
                status === 'success' ? 'text-cyber-green' : 'text-warning-red'
              }`}>
                {message}
              </p>
            )}
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="my-12 p-6 sm:p-8 bg-gradient-to-br from-brutal-gray-900 to-brutal-gray-950 border-2 border-brutal-gray-800 rounded-lg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-blue/10 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <h3 className="text-2xl font-display font-bold mb-2">
          {getHeadline()}
        </h3>
        <p className="text-brutal-gray-300 mb-6">
          {getSubheadline()}
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            name="email"
            id="inline-newsletter-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={status === 'loading'}
            autoComplete="email"
            className="flex-1 px-4 py-3 bg-brutal-black border-2 border-brutal-gray-800 rounded font-mono text-sm placeholder-brutal-gray-600 focus:border-cyber-blue focus:outline-none transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-brutal whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Subscribing...
              </>
            ) : (
              'Get Weekly Updates'
            )}
          </button>
        </form>
        
        {message && (
          <p className={`mt-4 text-sm ${
            status === 'success' ? 'text-cyber-green' : 'text-warning-red'
          }`}>
            {message}
          </p>
        )}
      </div>
    </div>
  )
}
