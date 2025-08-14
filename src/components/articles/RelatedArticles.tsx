import Link from 'next/link'
import { ArticleWithAuthor } from '@/lib/articles'

interface RelatedArticlesProps {
  currentArticle: ArticleWithAuthor
  allArticles: ArticleWithAuthor[]
}

export default function RelatedArticles({ currentArticle, allArticles }: RelatedArticlesProps) {
  // Algorithm to find related articles
  const getRelatedArticles = () => {
    // Filter out current article
    const otherArticles = allArticles.filter(a => a.id !== currentArticle.id)
    
    // Score each article based on relevance
    const scoredArticles = otherArticles.map(article => {
      let score = 0
      
      // Same category = 5 points
      if (article.category.slug === currentArticle.category.slug) {
        score += 5
      }
      
      // Each matching tag = 2 points
      const currentTags = currentArticle.tags.map(t => t.slug)
      const matchingTags = article.tags.filter(t => currentTags.includes(t.slug))
      score += matchingTags.length * 2
      
      // Same author = 1 point
      if (article.author.name === currentArticle.author.name) {
        score += 1
      }
      
      // Recent articles get slight boost
      const daysDiff = Math.abs(
        new Date(article.publishedAt || 0).getTime() - 
        new Date(currentArticle.publishedAt || 0).getTime()
      ) / (1000 * 60 * 60 * 24)
      
      if (daysDiff < 30) {
        score += 0.5
      }
      
      return { article, score }
    })
    
    // Sort by score and take top 3
    return scoredArticles
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .filter(item => item.score > 0) // Only show if there's some relevance
      .map(item => item.article)
  }
  
  const relatedArticles = getRelatedArticles()
  
  if (relatedArticles.length === 0) return null
  
  return (
    <section className="mt-16 pt-8 border-t border-brutal-gray-800">
      <h2 className="text-2xl font-display font-bold mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedArticles.map(article => (
          <Link 
            key={article.id} 
            href={`/articles/${article.slug}`}
            className="group"
          >
            <article className="card-brutal h-full hover:border-cyber-blue transition-colors">
              {article.coverImage && (
                <div className="aspect-video bg-brutal-gray-800 rounded mb-4 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={article.coverImage} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brutal-gray-500">
                  <span className="text-cyber-green">{article.category.name}</span>
                  <span>•</span>
                  <span>{article.readingTime}</span>
                </div>
                <h3 className="text-lg font-display font-bold group-hover:text-cyber-blue transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-brutal-gray-400 line-clamp-2">
                  {article.excerpt}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}
