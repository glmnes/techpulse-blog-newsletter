import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface ArticleWithAuthor {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string | null
  published: boolean
  featured: boolean
  premium: boolean
  author: {
    name: string | null
    image: string | null
  }
  category: {
    name: string
    slug: string
  }
  tags: {
    name: string
    slug: string
  }[]
  readingTime: string | null
  viewCount: number
  createdAt: Date
  updatedAt: Date
  publishedAt: Date | null
  takeaways?: string[]
}

const articlesDirectory = path.join(process.cwd(), 'content/articles')

export async function getArticles({
  limit,
  featured,
  published = true
}: {
  limit?: number
  featured?: boolean
  published?: boolean
} = {}): Promise<ArticleWithAuthor[]> {
  try {
    // Create directory if it doesn't exist
    if (!fs.existsSync(articlesDirectory)) {
      fs.mkdirSync(articlesDirectory, { recursive: true })
      return []
    }

    // Get all MDX files
    const fileNames = fs.readdirSync(articlesDirectory)
    const allArticles = fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map(fileName => {
        const slug = fileName.replace(/\.mdx$/, '')
        const fullPath = path.join(articlesDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        // Convert categories and tags to expected format
        const categories = data.categories || []
        const tags = (data.tags || []).map((tag: string) => ({
          name: tag,
          slug: tag.toLowerCase().replace(/\s+/g, '-')
        }))

        return {
          id: slug,
          slug,
          title: data.title,
          excerpt: data.excerpt,
          content,
          coverImage: data.coverImage || null,
          published: data.published ?? true,
          featured: data.featured ?? false,
          premium: data.premium ?? false,
          author: {
            name: data.author || 'Anonymous',
            image: null
          },
          category: {
            name: categories[0] || 'Uncategorized',
            slug: categories[0]?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized'
          },
          tags,
          readingTime: data.readingTime || null,
          viewCount: data.viewCount || 0,
          createdAt: new Date(data.date || Date.now()),
          updatedAt: new Date(data.date || Date.now()),
          publishedAt: data.published ? new Date(data.date || Date.now()) : null,
          takeaways: data.takeaways || undefined
        } as ArticleWithAuthor
      })

    // Filter articles
    let filteredArticles = allArticles
    if (published !== undefined) {
      filteredArticles = filteredArticles.filter(a => a.published === published)
    }
    if (featured !== undefined) {
      filteredArticles = filteredArticles.filter(a => a.featured === featured)
    }

    // Sort by date
    filteredArticles.sort((a, b) => 
      (b.publishedAt?.getTime() || 0) - (a.publishedAt?.getTime() || 0)
    )

    // Apply limit
    if (limit) {
      filteredArticles = filteredArticles.slice(0, limit)
    }

    return filteredArticles
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

export async function getArticleBySlug(slug: string): Promise<ArticleWithAuthor | null> {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const categories = data.categories || []
    const tags = (data.tags || []).map((tag: string) => ({
      name: tag,
      slug: tag.toLowerCase().replace(/\s+/g, '-')
    }))

    return {
      id: slug,
      slug,
      title: data.title,
      excerpt: data.excerpt,
      content,
      coverImage: data.coverImage || null,
      published: data.published ?? true,
      featured: data.featured ?? false,
      premium: data.premium ?? false,
      author: {
        name: data.author || 'Anonymous',
        image: null
      },
      category: {
        name: categories[0] || 'Uncategorized',
        slug: categories[0]?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized'
      },
      tags,
      readingTime: data.readingTime || null,
      viewCount: data.viewCount || 0,
      createdAt: new Date(data.date || Date.now()),
      updatedAt: new Date(data.date || Date.now()),
      publishedAt: data.published ? new Date(data.date || Date.now()) : null,
      takeaways: data.takeaways || undefined
    }
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
}

export async function getAllCategories(): Promise<string[]> {
  const articles = await getArticles()
  const categories = new Set<string>()
  
  articles.forEach(article => {
    if (article.category.name !== 'Uncategorized') {
      categories.add(article.category.name)
    }
  })
  
  return Array.from(categories)
}

export async function getAllTags(): Promise<string[]> {
  const articles = await getArticles()
  const tags = new Set<string>()
  
  articles.forEach(article => {
    article.tags.forEach(tag => tags.add(tag.name))
  })
  
  return Array.from(tags).sort()
}
