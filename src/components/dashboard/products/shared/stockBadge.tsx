// components/StockBadge.tsx
import { Badge } from "@/components/ui/badge"

const STOCK_THRESHOLD = {
  LOW: 5,
  OUT: 0,
}

function getStockStatus(stock: number) {
  if (stock <= STOCK_THRESHOLD.OUT) return "Agotado"
  if (stock <= STOCK_THRESHOLD.LOW) return "Pocas unidades"
  return "En stock"
}

export function StockBadge({ stock }: { stock: number }) {
  const status = getStockStatus(stock)
  let variant: "green" | "red" | "yellow" = "green"

  if (status === "Agotado") variant = "red"
  else if (status === "Pocas unidades") variant = "yellow"

  return <Badge variant={variant}>{status}</Badge>
}
