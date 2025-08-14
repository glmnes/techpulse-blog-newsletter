import NewsletterForm from '@/components/newsletter/NewsletterForm';

export default function Newsletter() {
  return (
    <div className="container-brutal mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-5xl font-display font-bold mb-6">
          Stay Updated with <span className="text-gradient">Tech Trends</span>
        </h1>
        <p className="text-xl text-brutal-gray-300 mb-8">
          Weekly insights on web development, cloud computing, and AI. 
          No fluff, just practical knowledge for developers.
        </p>
        <div className="card-brutal p-8 mb-8">
          <h2 className="text-2xl font-display font-bold mb-4">What you&apos;ll get:</h2>
          <ul className="text-left text-brutal-gray-300 space-y-3 mb-8">
            <li className="flex items-start">
              <span className="text-cyber-green mr-2">▸</span>
              Weekly tutorials on modern frameworks and best practices
            </li>
            <li className="flex items-start">
              <span className="text-cyber-blue mr-2">▸</span>
              Deep dives into cloud architecture and DevOps strategies
            </li>
            <li className="flex items-start">
              <span className="text-cyber-purple mr-2">▸</span>
              Early access to new guides and exclusive content
            </li>
            <li className="flex items-start">
              <span className="text-cyber-green mr-2">▸</span>
              No spam, unsubscribe anytime
            </li>
          </ul>
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
}
