"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  Play,
  Calendar,
  Clock,
} from "lucide-react"

interface PackingVideo {
  id: string
  packingId: string
  customer: string
  thumbnailColor: string
  duration: string
  uploadedAt: string
  fileSize: string
  items: string
}

const videos: PackingVideo[] = [
  { id: "V01", packingId: "PK-003", customer: "UD Shinemax", thumbnailColor: "bg-indigo-200", duration: "3:45", uploadedAt: "2026-05-28 17:30", fileSize: "85 MB", items: "SCW Spray Wax x30, SCW Glass Cleaner x20" },
  { id: "V02", packingId: "PK-008", customer: "PT Autogloss Indonesia", thumbnailColor: "bg-blue-200", duration: "5:12", uploadedAt: "2026-05-25 14:15", fileSize: "120 MB", items: "SCW Snow Foam x15, SCW Ceramic Coating x8" },
  { id: "V03", packingId: "PK-010", customer: "GlossUp Bali", thumbnailColor: "bg-violet-200", duration: "2:30", uploadedAt: "2026-05-22 11:00", fileSize: "58 MB", items: "SCW Interior Detailer x20" },
  { id: "V04", packingId: "PK-012", customer: "CV Ceramic Pro JKT", thumbnailColor: "bg-emerald-200", duration: "4:18", uploadedAt: "2026-05-20 16:45", fileSize: "98 MB", items: "SCW Tire Gel x30, SCW Trim Restorer x10" },
  { id: "V05", packingId: "PK-015", customer: "DetailPro Semarang", thumbnailColor: "bg-amber-200", duration: "1:55", uploadedAt: "2026-05-18 09:30", fileSize: "42 MB", items: "SCW Polish Compound x5" },
  { id: "V06", packingId: "PK-018", customer: "AutoCare Makassar", thumbnailColor: "bg-rose-200", duration: "6:02", uploadedAt: "2026-05-15 13:20", fileSize: "145 MB", items: "SCW Snow Foam x25, SCW Shampoo Plus x15" },
  { id: "V07", packingId: "PK-020", customer: "CV ProShine SBY", thumbnailColor: "bg-cyan-200", duration: "3:10", uploadedAt: "2026-05-12 10:45", fileSize: "72 MB", items: "SCW Spray Wax x20, SCW Glass Cleaner x15" },
  { id: "V08", packingId: "PK-022", customer: "PT DetailWorks BDG", thumbnailColor: "bg-lime-200", duration: "2:45", uploadedAt: "2026-05-10 15:00", fileSize: "62 MB", items: "SCW Iron Decontamination x10" },
]

export default function PackingVideosPage() {
  const [search, setSearch] = useState("")

  const filtered = videos.filter((v) =>
    v.packingId.toLowerCase().includes(search.toLowerCase()) ||
    v.customer.toLowerCase().includes(search.toLowerCase()) ||
    v.id.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Packing Video Gallery</h1>
          <p className="text-muted-foreground">
            Browse and search packing process videos
          </p>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by packing ID, video ID, or customer name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Video Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {filtered.map((video) => (
          <Card key={video.id} className="overflow-hidden hover:shadow-md transition-shadow">
            {/* Thumbnail */}
            <div className={`relative aspect-video ${video.thumbnailColor} flex items-center justify-center`}>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/80 shadow-lg cursor-pointer hover:bg-white transition-colors">
                <Play className="h-6 w-6 text-indigo-600 ml-1" />
              </div>
              <Badge className="absolute bottom-2 right-2 bg-black/60 text-white text-xs">
                {video.duration}
              </Badge>
            </div>
            <CardContent className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs font-medium">{video.packingId}</p>
                <p className="text-xs text-muted-foreground">{video.fileSize}</p>
              </div>
              <p className="text-sm font-medium truncate">{video.customer}</p>
              <p className="text-xs text-muted-foreground truncate">{video.items}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {video.uploadedAt}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No videos found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
