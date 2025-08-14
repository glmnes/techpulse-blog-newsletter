import { notFound } from 'next/navigation'
import { getArticles, getArticleBySlug } from '@/lib/articles'
import MdxRenderer from '@/components/articles/MdxRenderer'
import TableOfContents from '@/components/articles/TableOfContents'
import KeyTakeaways from '@/components/articles/KeyTakeaways'
import SocialShareButtons from '@/components/articles/SocialShareButtons'
import RelatedArticles from '@/components/articles/RelatedArticles'
import ScrollProgress from '@/components/articles/ScrollProgress'

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map(article => ({ id: article.slug }))
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = await getArticleBySlug(id)
  if (!article) return notFound()
  
  // Fetch all articles for related articles
  const allArticles = await getArticles()

  return (
    <article className="py-12">
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      
      <div className="container-brutal">
        {/* Article Header */}
        <header className="mb-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-brutal-gray-500 mb-4">
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
          
          <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-xl text-brutal-gray-300 mb-8">
            {article.excerpt}
          </p>
          
          <div className="flex items-center justify-between border-t border-b border-brutal-gray-800 py-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-brutal-gray-400">By</span>
              <span className="font-medium">{article.author.name}</span>
            </div>
            <time className="text-sm text-brutal-gray-500">
              {article.publishedAt?.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
          
          {/* Social Share Buttons */}
          <div className="mt-6">
            <SocialShareButtons 
              title={article.title}
              url={`/articles/${article.slug}`}
              excerpt={article.excerpt}
            />
          </div>
        </header>
        {/* Key Takeaways */}
        {article.takeaways && (
          <div className="max-w-4xl mx-auto">
            <KeyTakeaways takeaways={article.takeaways} />
          </div>
        )}

        {/* Cover Image */}
        {article.coverImage && (
          <div className="aspect-video bg-brutal-gray-800 rounded-lg mb-12 overflow-hidden max-w-4xl mx-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={article.coverImage} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Content with ToC */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 max-w-7xl mx-auto">
          {/* Table of Contents - Desktop */}
          <aside className="hidden lg:block lg:col-span-2">
            <div className="sticky top-8">
              <TableOfContents content={article.content} />
            </div>
          </aside>
          
          {/* Main Content */}
          <div className="lg:col-span-8 lg:col-start-3 max-w-4xl mx-auto prose prose-invert prose-lg
            prose-headings:font-display prose-headings:font-bold
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-brutal-gray-300 prose-p:leading-relaxed
            prose-a:text-cyber-blue prose-a:no-underline hover:prose-a:text-cyber-purple
            prose-strong:text-white prose-strong:font-semibold
            prose-ul:text-brutal-gray-300 prose-li:marker:text-cyber-green
            prose-ol:text-brutal-gray-300
            prose-blockquote:border-l-4 prose-blockquote:border-cyber-purple prose-blockquote:pl-4 prose-blockquote:italic
            prose-code:text-cyber-green prose-code:bg-brutal-gray-900 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-brutal-gray-900 prose-pre:border prose-pre:border-brutal-gray-800
            prose-table:border-collapse prose-th:border prose-th:border-brutal-gray-700 prose-th:p-2 prose-td:border prose-td:border-brutal-gray-700 prose-td:p-2
          ">
            <MdxRenderer content={article.content} />
          </div>
        </div>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-brutal-gray-800 max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <span key={tag.slug} className="text-sm font-mono uppercase tracking-wider text-brutal-gray-400 bg-brutal-gray-900 px-3 py-1.5 rounded border border-brutal-gray-800 hover:border-cyber-blue transition-colors">
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Related Articles */}
        <div className="max-w-6xl mx-auto">
          <RelatedArticles 
            currentArticle={article}
            allArticles={allArticles}
          />
        </div>
      </div>
    </article>
  )
}
