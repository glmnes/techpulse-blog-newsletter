
import Link from "next/link";
import NewsletterForm from "@/components/newsletter/NewsletterForm";
import ArticleCard from "@/components/ArticleCard";
import { getArticles } from "@/lib/articles";

export default async function Home() {
  const latestArticles = await getArticles({ limit: 3 });
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container-brutal">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-5xl lg:text-7xl font-display font-bold tracking-tight mb-6">
              <span className="block text-brutal-gray-100 opacity-90">Building the</span>
              <span className="block text-6xl lg:text-8xl mt-2">
                <span className="text-gradient inline-block animate-fade-in">Tech</span>
                <span className="text-brutal-gray-100 inline-block animate-fade-in animation-delay-200 ml-4">Future</span>
              </span>
            </h1>
            <p className="text-xl text-brutal-gray-300 mb-8 max-w-2xl mx-auto">
              Exploring cutting-edge technologies and their impact on tomorrow. 
              Learn, build, and stay ahead in the tech revolution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/articles" className="btn-brutal">
                Explore Articles
              </Link>
              <Link href="/newsletter" className="btn-brutal bg-transparent hover:bg-brutal-gray-800">
                Join Newsletter
              </Link>
            </div>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-cyber-purple/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        </div>
      </section>

      {/* Featured Topics */}
      <section className="py-16 border-t border-brutal-gray-800">
        <div className="container-brutal">
          <h2 className="text-3xl font-display font-bold mb-12">Core Focus Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-brutal group">
              <div className="text-cyber-green text-5xl mb-4 font-mono">01</div>
              <h3 className="text-xl font-display font-bold mb-2">Web Development</h3>
              <p className="text-brutal-gray-400">Modern frameworks, best practices, performance optimization, and responsive design.</p>
            </div>
            <div className="card-brutal group">
              <div className="text-cyber-blue text-5xl mb-4 font-mono">02</div>
              <h3 className="text-xl font-display font-bold mb-2">Cloud & DevOps</h3>
              <p className="text-brutal-gray-400">Serverless architecture, containerization, CI/CD pipelines, and infrastructure as code.</p>
            </div>
            <div className="card-brutal group">
              <div className="text-cyber-purple text-5xl mb-4 font-mono">03</div>
              <h3 className="text-xl font-display font-bold mb-2">AI & Machine Learning</h3>
              <p className="text-brutal-gray-400">Neural networks, data science, model deployment, and practical AI applications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 border-t border-brutal-gray-800">
        <div className="container-brutal">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-display font-bold">Latest Articles</h2>
            <Link href="/articles" className="text-sm font-mono uppercase tracking-wider text-brutal-gray-400 hover:text-cyber-blue transition-colors">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 border-t border-brutal-gray-800 bg-brutal-gray-950">
        <div className="container-brutal">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-4">Stay Updated with Tech Trends</h2>
            <p className="text-brutal-gray-300 mb-8">
              Weekly insights on the latest in web development, cloud computing, and AI. No fluff, just code.
            </p>
            <div className="flex justify-center">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
