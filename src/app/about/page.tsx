import Link from 'next/link';

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32 border-b border-brutal-gray-800">
        <div className="container-brutal">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
              Building Tomorrow&apos;s <span className="text-gradient">Technology</span> Today
            </h1>
            <p className="text-xl text-brutal-gray-300 leading-relaxed">
              We&apos;re passionate about cutting-edge technologies and their practical applications. 
              Our mission is to help developers learn, build, and stay ahead in the rapidly 
              evolving tech landscape.
            </p>
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyber-purple/10 rounded-full blur-3xl animate-pulse" />
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 border-b border-brutal-gray-800">
        <div className="container-brutal">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold mb-8">Why This Matters</h2>
            <div className="space-y-6 text-brutal-gray-300">
              <p className="text-lg leading-relaxed">
                Technology evolves faster than ever. New frameworks, tools, and paradigms emerge 
                constantly, making it challenging to stay current. We believe in continuous learning 
                and practical implementation.
              </p>
              <p className="text-lg leading-relaxed">
                Most tech content is either too basic or overly complex. We strike a balance: 
                comprehensive tutorials, real-world examples, and clear explanations that respect 
                your intelligence while remaining accessible.
              </p>
              <p className="text-lg leading-relaxed">
                Whether you&apos;re building web applications, deploying cloud infrastructure, or exploring 
                machine learning, we provide the guides and insights you need to succeed in modern 
                software development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-16 border-b border-brutal-gray-800">
        <div className="container-brutal">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold mb-12">What We Cover</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card-brutal group">
                <h3 className="text-xl font-display font-bold mb-3 text-cyber-green">Frontend Development</h3>
                <p className="text-brutal-gray-300">
                  React, Next.js, Vue, and modern JavaScript frameworks. We cover component patterns, 
                  state management, performance optimization, and responsive design.
                </p>
              </div>
              <div className="card-brutal group">
                <h3 className="text-xl font-display font-bold mb-3 text-cyber-blue">Backend & Cloud</h3>
                <p className="text-brutal-gray-300">
                  Node.js, Python, Go, and cloud platforms. From serverless functions to microservices, 
                  we explore scalable architecture and deployment strategies.
                </p>
              </div>
              <div className="card-brutal group">
                <h3 className="text-xl font-display font-bold mb-3 text-cyber-purple">DevOps & Tools</h3>
                <p className="text-brutal-gray-300">
                  Docker, Kubernetes, CI/CD pipelines, and development workflows. Learn to streamline 
                  your development process and deploy with confidence.
                </p>
              </div>
              <div className="card-brutal group">
                <h3 className="text-xl font-display font-bold mb-3 text-cyber-green">AI & Data Science</h3>
                <p className="text-brutal-gray-300">
                  Machine learning, data analysis, and AI integration. Practical guides for implementing 
                  intelligent features in your applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 border-b border-brutal-gray-800">
        <div className="container-brutal">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold mb-8">Our Approach</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-mono text-sm uppercase tracking-wider text-brutal-gray-400 mb-2">CODE FIRST</h3>
                <p className="text-brutal-gray-300">
                  Real examples, working code, and practical implementations. We believe in learning 
                  by doing, not just reading.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-sm uppercase tracking-wider text-brutal-gray-400 mb-2">BEST PRACTICES</h3>
                <p className="text-brutal-gray-300">
                  Industry standards, design patterns, and proven methodologies. Build software 
                  that scales and maintains.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-sm uppercase tracking-wider text-brutal-gray-400 mb-2">COMMUNITY DRIVEN</h3>
                <p className="text-brutal-gray-300">
                  Learn from real developers solving real problems. Share knowledge and grow 
                  together as a community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-brutal">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-4">Join the Community</h2>
            <p className="text-xl text-brutal-gray-300 mb-8">
              Technology moves fast, but together we can keep up. 
              Let&apos;s learn and build amazing things.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/articles" className="btn-brutal">
                Read Latest Analysis
              </Link>
              <Link href="/newsletter" className="btn-brutal bg-transparent hover:bg-brutal-gray-800">
                Subscribe to Updates
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

