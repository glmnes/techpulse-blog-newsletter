'use client'

import { Twitter, Linkedin, Link2, Mail } from 'lucide-react'
import { useState, useEffect } from 'react'

interface SocialShareButtonsProps {
  title: string
  url: string
  excerpt: string
}

export default function SocialShareButtons({ title, url, excerpt }: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [shareUrl, setShareUrl] = useState(url)

  useEffect(() => {
    // Only update the URL on the client side
    setShareUrl(`${window.location.origin}${url}`)
  }, [url])

  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedExcerpt = encodeURIComponent(excerpt)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedExcerpt}%0A%0A${encodedUrl}`
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-mono uppercase tracking-wider text-brutal-gray-500 mr-2">
        Share:
      </span>
      
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded border border-brutal-gray-800 hover:border-cyber-blue hover:text-cyber-blue transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </a>
      
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded border border-brutal-gray-800 hover:border-cyber-blue hover:text-cyber-blue transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </a>
      
      <a
        href={shareLinks.email}
        className="p-2 rounded border border-brutal-gray-800 hover:border-cyber-purple hover:text-cyber-purple transition-colors"
        aria-label="Share via Email"
      >
        <Mail className="w-4 h-4" />
      </a>
      
      <button
        onClick={copyToClipboard}
        className="p-2 rounded border border-brutal-gray-800 hover:border-cyber-green hover:text-cyber-green transition-colors relative"
        aria-label="Copy link"
      >
        <Link2 className="w-4 h-4" />
        {copied && (
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-brutal-gray-900 text-cyber-green text-xs px-2 py-1 rounded whitespace-nowrap">
            Copied!
          </span>
        )}
      </button>
    </div>
  )
}
