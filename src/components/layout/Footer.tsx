import Link from 'next/link'

const footerLinks = {
  main: [
    { name: 'About', href: '/about' },
    { name: 'Articles', href: '/articles' },
    { name: 'Newsletter', href: '/newsletter' },
    { name: 'Contact', href: '/contact' },
  ],
  social: [
    { name: 'Twitter', href: 'https://twitter.com/glmnes' },
    { name: 'GitHub', href: 'https://github.com/glmnes' },
    { name: 'Discord', href: 'https://discord.gg/glmnes' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-brutal-gray-800 bg-brutal-gray-950">
      <div className="container-brutal py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-display font-bold mb-4">
              Tech<span className="text-gradient">Pulse</span>
            </h3>
            <p className="text-brutal-gray-400 text-sm">
              Exploring emerging technologies and their impact on tomorrow.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-sm uppercase tracking-wider text-brutal-gray-500 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {footerLinks.main.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brutal-gray-400 hover:text-cyber-blue transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-sm uppercase tracking-wider text-brutal-gray-500 mb-4">
              Connect
            </h4>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brutal-gray-400 hover:text-cyber-blue transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-brutal-gray-800">
          <p className="text-center text-brutal-gray-500 text-sm">
            &copy; {new Date().getFullYear()} TechPulse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
