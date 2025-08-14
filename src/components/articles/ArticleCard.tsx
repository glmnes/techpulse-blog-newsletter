import Link from 'next/link'
import Image from 'next/image'
import { Clock, User } from 'lucide-react'

interface ArticleCardProps {
  article: {
    id: string
    slug: string
    title: string
    excerpt: string
    coverImage?: string
    category: {
      name: string
      slug: string
    }
    author: {
      name: string
      image?: string
    }
    readingTime: string
    publishedAt: string
  }
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="card-brutal group h-full flex flex-col">
      <Link href={`/articles/${article.slug}`} className="block">
        <div className="aspect-video bg-brutal-gray-800 rounded mb-4 overflow-hidden relative">
          {article.coverImage ? (
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brutal-gray-700 to-brutal-gray-900" />
          )}
          
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-brutal-black/80 backdrop-blur-sm text-cyber-green text-xs font-mono uppercase tracking-wider rounded">
              {article.category.name}
            </span>
          </div>
        </div>
      </Link>

      <div className="flex-1 flex flex-col">
        <Link href={`/articles/${article.slug}`} className="block group">
          <h3 className="text-xl font-display font-bold mb-2 group-hover:text-cyber-blue transition-colors line-clamp-2">
            {article.title}
          </h3>
        </Link>
        
        <p className="text-brutal-gray-400 text-sm mb-4 line-clamp-3 flex-1">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-brutal-gray-500">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{article.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{article.readingTime}</span>
            </div>
          </div>
          
          <time dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
        </div>
      </div>
    </article>
  )
}
