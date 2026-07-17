"use client"

import { Suspense } from "react"
import QuotationsListContent from "./page-content"

export default function QuotationsListPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-muted-foreground">Memuat...</div>}>
      <QuotationsListContent />
    </Suspense>
  )
}
