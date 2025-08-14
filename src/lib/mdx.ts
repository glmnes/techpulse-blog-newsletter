import { serialize } from 'next-mdx-remote/serialize'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism-plus'

export async function parseMdx(content: string) {
  const { data, content: mdxContent } = matter(content)
  
  const mdxSource = await serialize(mdxContent, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        rehypeCodeTitles,
        rehypePrism,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'wrap',
            properties: {
              className: ['anchor'],
            },
          },
        ],
      ],
    },
  })

  return {
    frontmatter: data,
    content: mdxSource,
    readingTime: readingTime(mdxContent).text,
  }
}

export function extractHeadings(content: string) {
  const headingLines = content
    .split('\n')
    .filter(line => /^#{1,3}\s/.test(line))

  return headingLines.map(line => {
    const level = line.match(/^#+/)?.[0].length || 1
    const text = line.replace(/^#+\s/, '').trim()
    const id = text.toLowerCase().replace(/[^\w]+/g, '-')
    
    return { level, text, id }
  })
}
