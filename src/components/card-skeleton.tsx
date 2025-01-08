import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "./ui/card"

export function CardSkeleton() {
  return (
    <Card className="p-4">
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
    </Card>
  )
}
