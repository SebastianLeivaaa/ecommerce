import { Loader2 } from "lucide-react"

interface SpinnerProps extends React.ComponentProps<"div"> {
  size?: number
}

export function Spinner({ className, size = 24, ...props }: SpinnerProps) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      {...props}
    >
      <Loader2 className="animate-spin" width={size} height={size} />
    </div>
  )
}
