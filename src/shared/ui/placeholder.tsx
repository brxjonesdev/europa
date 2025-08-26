import { ReactNode } from "react"

interface PlaceholderProps {
  message?: string
  icon?: ReactNode
}

export default function Placeholder({ 
  message = "Coming Soon", 
  icon 
}: PlaceholderProps) {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500">
      <div className="flex flex-col items-center gap-2 p-6 text-center">
        {icon ? icon : <span className="text-3xl">✨</span>}
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  )
}
