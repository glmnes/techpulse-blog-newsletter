import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import InlineNewsletterCTA from '@/components/newsletter/InlineNewsletterCTA'

// Custom components for MDX
const components = {
  h1: ({ children }: { children: ReactNode }) => (
    <h1 className="text-4xl font-display font-bold mt-8 mb-4 text-brutal-gray-100">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: ReactNode }) => (
    <h2 className="text-3xl font-display font-bold mt-8 mb-4 text-brutal-gray-100">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <h3 className="text-2xl font-display font-bold mt-6 mb-3 text-brutal-gray-100">
      {children}
    </h3>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <p className="text-brutal-gray-300 mb-4 leading-relaxed">
      {children}
    </p>
  ),
  a: ({ href, children }: { href?: string; children: ReactNode }) => (
    <Link 
      href={href || '#'} 
      className="text-cyber-blue hover:text-cyber-purple underline underline-offset-2 transition-colors"
    >
      {children}
    </Link>
  ),
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="list-disc list-inside mb-4 text-brutal-gray-300 space-y-2">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: ReactNode }) => (
    <ol className="list-decimal list-inside mb-4 text-brutal-gray-300 space-y-2">
      {children}
    </ol>
  ),
  li: ({ children }: { children: ReactNode }) => (
    <li className="ml-4">
      {children}
    </li>
  ),
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="border-l-4 border-cyber-green pl-4 py-2 mb-4 italic text-brutal-gray-400">
      {children}
    </blockquote>
  ),
  code: ({ children }: { children: ReactNode }) => (
    <code className="bg-brutal-gray-800 text-cyber-green px-2 py-1 rounded font-mono text-sm">
      {children}
    </code>
  ),
  pre: ({ children }: { children: ReactNode }) => (
    <pre className="bg-brutal-gray-900 border border-brutal-gray-800 rounded p-4 overflow-x-auto mb-4">
      {children}
    </pre>
  ),
  hr: () => (
    <hr className="border-brutal-gray-800 my-8" />
  ),
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <div className="my-8">
      <Image
        src={src || ''}
        alt={alt || ''}
        width={800}
        height={400}
        className="rounded-lg w-full h-auto"
      />
    </div>
  ),
  // Custom component for callouts
  Callout: ({ type = 'info', children }: { type?: 'info' | 'warning' | 'success'; children: ReactNode }) => {
    const styles = {
      info: 'bg-brutal-gray-900 border-cyber-blue text-cyber-blue',
      warning: 'bg-brutal-gray-900 border-warning-red text-warning-red',
      success: 'bg-brutal-gray-900 border-cyber-green text-cyber-green',
    }
    
    return (
      <div className={`border-2 ${styles[type]} rounded p-4 mb-4`}>
        <div className="text-brutal-gray-300">{children}</div>
      </div>
    )
  },
  // Newsletter CTA component
  NewsletterCTA: InlineNewsletterCTA,
}

interface MdxRendererProps {
  content: string
}

export default function MdxRenderer({ content }: MdxRendererProps) {
  // Function to inject newsletter CTA into content
  const injectNewsletterCTA = (mdxContent: string) => {
    // Split content by paragraphs or sections
    const lines = mdxContent.split('\n')
    const totalLines = lines.length
    
    // Calculate position for CTA (approximately 40% through the article)
    const ctaPosition = Math.floor(totalLines * 0.4)
    
    // Find a good place to insert (after a paragraph break)
    let insertIndex = ctaPosition
    for (let i = ctaPosition; i < Math.min(ctaPosition + 20, totalLines); i++) {
      if (lines[i] === '' && i > 0 && lines[i - 1] !== '') {
        insertIndex = i
        break
      }
    }
    
    // Insert the CTA component
    lines.splice(insertIndex, 0, '<NewsletterCTA variant="minimal" position="middle" />')
    
    return lines.join('\n')
  }
  
  // Only inject CTA if content is long enough (more than 50 lines)
  const processedContent = content.split('\n').length > 50 
    ? injectNewsletterCTA(content) 
    : content
  
  return (
    <MDXRemote source={processedContent} components={components} />
  )
}
