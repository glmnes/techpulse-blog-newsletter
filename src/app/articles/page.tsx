import ArticleCard from '@/components/ArticleCard';
import { getArticles } from '@/lib/articles';

export default async function ArticlesPage() {
  const articles = await getArticles();
  return (
    <div className="py-12">
      <div className="container-brutal">
        <h1 className="text-4xl font-display font-bold mb-8">Articles</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
