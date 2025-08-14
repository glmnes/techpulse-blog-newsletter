'use client'

import Link from 'next/link'
import { useState } from 'react'

interface ArticleCardProps {
  article: {
    id: string
    slug: string
    title: string
    excerpt: string
    coverImage: string | null
    category: {
      name: string
      slug: string
    }
    readingTime: string | null
    author: {
      name: string | null
    }
    publishedAt: Date | null
    tags: {
      name: string
      slug: string
    }[]
    premium?: boolean
  }
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <Link href={`/articles/${article.slug}`}>
      <article className="card-brutal group cursor-pointer h-full hover:border-cyber-blue hover:shadow-lg hover:shadow-cyber-blue/20 transition-all duration-300">
        <div className="aspect-video bg-brutal-gray-800 rounded mb-4 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-brutal-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
          {article.coverImage && !imageError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={article.coverImage} 
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brutal-gray-700 to-brutal-gray-900 flex items-center justify-center">
              <span className="text-4xl font-mono text-brutal-gray-600">
                {article.category.name.substring(0, 2).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brutal-gray-500">
            <span className="text-cyber-green">{article.category.name}</span>
            <span>•</span>
            <span>{article.readingTime}</span>
            {article.premium && (
              <>
                <span>•</span>
                <span className="text-cyber-purple">Premium</span>
              </>
            )}
          </div>
          <h3 className="text-xl font-display font-bold group-hover:text-cyber-blue transition-colors">
            {article.title}
          </h3>
          <p className="text-brutal-gray-400 text-sm line-clamp-2">
            {article.excerpt}
          </p>
          {article.author.name && article.publishedAt && (
            <div className="flex items-center justify-between pt-2 text-sm text-brutal-gray-500">
              <span>by {article.author.name}</span>
              <time>{article.publishedAt.toLocaleDateString()}</time>
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}
