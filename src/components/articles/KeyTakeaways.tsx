import { Lightbulb } from 'lucide-react'

interface KeyTakeawaysProps {
  takeaways: string[]
}

export default function KeyTakeaways({ takeaways }: KeyTakeawaysProps) {
  if (!takeaways || takeaways.length === 0) return null

  return (
    <div className="my-8 p-6 bg-gradient-to-br from-brutal-gray-900 to-brutal-gray-950 border-2 border-cyber-blue rounded-lg">
      <div className="flex items-center gap-3 mb-4">
        <Lightbulb className="w-5 h-5 text-cyber-blue" />
        <h3 className="text-xl font-display font-bold">Key Takeaways</h3>
      </div>
      <ul className="space-y-3">
        {takeaways.map((takeaway, index) => (
          <li key={index} className="flex items-start">
            <span className="text-cyber-blue mr-3 font-mono text-sm">▸</span>
            <span className="text-brutal-gray-300">{takeaway}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
