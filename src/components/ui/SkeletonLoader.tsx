import { cn } from '@/lib/utils'

interface SkeletonLoaderProps {
  className?: string
  lines?: number
  type?: 'text' | 'title' | 'card' | 'image'
}

export default function SkeletonLoader({ 
  className, 
  lines = 1, 
  type = 'text' 
}: SkeletonLoaderProps) {
  const baseClass = "animate-pulse bg-brutal-gray-800 rounded"
  
  if (type === 'card') {
    return (
      <div className={cn("card-brutal", className)}>
        <div className={cn(baseClass, "aspect-video mb-4")} />
        <div className="space-y-3">
          <div className={cn(baseClass, "h-4 w-24")} />
          <div className={cn(baseClass, "h-6 w-full")} />
          <div className={cn(baseClass, "h-4 w-3/4")} />
        </div>
      </div>
    )
  }
  
  if (type === 'image') {
    return <div className={cn(baseClass, "aspect-video", className)} />
  }
  
  if (type === 'title') {
    return <div className={cn(baseClass, "h-8 w-3/4", className)} />
  }
  
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, index) => (
        <div 
          key={index} 
          className={cn(
            baseClass, 
            "h-4",
            index === lines - 1 ? "w-3/4" : "w-full",
            className
          )} 
        />
      ))}
    </div>
  )
}
