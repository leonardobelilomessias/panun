"use client"

import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { HouseResultSearch } from "./HouseResultSearch"

export default function PropertiesPage() {
  return (
    <Suspense fallback={<SkeletonResults />}>
      <HouseResultSearch />
    </Suspense>
  )
}



function SkeletonResults() {
  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-[350px] w-full rounded-lg" />
            ))}
        </div>
      </div>
    </div>
  )
}
