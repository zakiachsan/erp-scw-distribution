"use client"

import React, { useState, useMemo } from "react"
import {
  Star,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type ReviewStatus = "Disetujui" | "Pending" | "Spam"

interface Review {
  id: string
  product: string
  customer: string
  rating: number
  comment: string
  status: ReviewStatus
  date: string
}

const initialReviews: Review[] = [
  { id: "1", product: "SCW Nano Ceramic Pro", customer: "Ahmad Fauzi", rating: 5, comment: "Hasil coating sangat bagus, kilap tahan lama sudah 3 bulan masih mengkilap. Recommended!", status: "Disetujui", date: "2026-05-28" },
  { id: "2", product: "SCW Interior Detailer", customer: "Siti Nurhaliza", rating: 4, comment: "Dashboard jadi bersih dan wangi, tidak lengket. Kemasan praktis.", status: "Disetujui", date: "2026-05-25" },
  { id: "3", product: "SCW Wheel Cleaner", customer: "Budi Hartono", rating: 5, comment: "Brembot hitam luntur dengan cepat, tidak perlu digosok keras. Sangat efektif!", status: "Disetujui", date: "2026-05-22" },
  { id: "4", product: "SCW Shampoo Premium", customer: "Rina Wijaya", rating: 3, comment: "Busa lumayan, tapi kurang wangi. Harga sesuai kualitas.", status: "Pending", date: "2026-05-20" },
  { id: "5", product: "SCW Iron Remover", customer: "Dedi Kurniawan", rating: 5, comment: "Contamination removal sempurna! Warnanya berubah ungu saat bereaksi dengan iron. Top!", status: "Disetujui", date: "2026-05-18" },
  { id: "6", product: "SCW Compound Polish", customer: "Ani Susanti", rating: 4, comment: "Swirl marks berkurang signifikan. Butuh beberapa pass untuk hasil maksimal.", status: "Disetujui", date: "2026-05-15" },
  { id: "7", product: "SCW Quick Detailer", customer: "Eko Prasetyo", rating: 2, comment: "Produk jelek, tidak ada efek apapun. Sia-sia beli.", status: "Spam", date: "2026-05-12" },
  { id: "8", product: "SCW Tire Dressing", customer: "Maya Anggraeni", rating: 5, comment: "Ban jadi hitam mengkilap seperti baru, tahan hujan juga. Puas!", status: "Disetujui", date: "2026-05-10" },
  { id: "9", product: "SCW Microfiber Towel Set", customer: "Fajar Nugroho", rating: 4, comment: "Handuk microfiber lembut, tidak meninggalkan serat. Packagin juga rapi.", status: "Pending", date: "2026-05-08" },
  { id: "10", product: "SCW Clay Bar Kit", customer: "Lina Marlina", rating: 5, comment: "Clay bar sangat empuk dan efektif mengangkat kontaminasi cat. Paket lengkap!", status: "Disetujui", date: "2026-05-05" },
  { id: "11", product: "SCW Dashboard Protectant", customer: "Rudi Hermawan", rating: 3, comment: "Lumayan, tapi efek UV-nya kurang terasa. Cocok untuk pemakaian sehari-hari.", status: "Pending", date: "2026-05-02" },
  { id: "12", product: "SCW Spray Wax", customer: "Diana Putri", rating: 5, comment: "Praktis banget tinggal semprot dan lap, kilap langsung keluar. Suka!", status: "Disetujui", date: "2026-04-28" },
  { id: "13", product: "SCW Glass Cleaner", customer: "Hendra Wijaya", rating: 1, comment: "ini spam bot", status: "Spam", date: "2026-04-25" },
]

const statusFilters: { label: string; value: ReviewStatus | "Semua" }[] = [
  { label: "Semua", value: "Semua" },
  { label: "Disetujui", value: "Disetujui" },
  { label: "Pending", value: "Pending" },
  { label: "Spam", value: "Spam" },
]

const statusConfig: Record<ReviewStatus, { color: string; icon: React.ComponentType<{ className?: string }> }> = {
  Disetujui: { color: "bg-emerald-100 text-emerald-700", icon: CheckCircle },
  Pending: { color: "bg-amber-100 text-amber-700", icon: AlertTriangle },
  Spam: { color: "bg-red-100 text-red-700", icon: XCircle },
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
      <span className="ml-1 text-sm text-muted-foreground">{rating}.0</span>
    </div>
  )
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [activeFilter, setActiveFilter] = useState<ReviewStatus | "Semua">("Semua")

  const filteredReviews = useMemo(() => {
    if (activeFilter === "Semua") return reviews
    return reviews.filter((r) => r.status === activeFilter)
  }, [reviews, activeFilter])

  const counts = useMemo(() => ({
    Semua: reviews.length,
    Disetujui: reviews.filter((r) => r.status === "Disetujui").length,
    Pending: reviews.filter((r) => r.status === "Pending").length,
    Spam: reviews.filter((r) => r.status === "Spam").length,
  }), [reviews])

  const handleApprove = (id: string) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status: "Disetujui" as ReviewStatus } : r)))
  }

  const handleSpam = (id: string) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status: "Spam" as ReviewStatus } : r)))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Ulasan Produk</h1>
        <p className="text-muted-foreground">Kelola ulasan dan rating dari pelanggan</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {statusFilters.map((filter) => {
          const Icon = filter.value === "Semua" ? MessageSquare : statusConfig[filter.value as ReviewStatus]?.icon || MessageSquare
          return (
            <Card
              key={filter.value}
              className={`cursor-pointer transition-all hover:shadow-md ${
                activeFilter === filter.value ? "ring-2 ring-orange-500 border-orange-200" : ""
              }`}
              onClick={() => setActiveFilter(filter.value)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    activeFilter === filter.value ? "bg-orange-100 text-orange-600" : "bg-muted text-muted-foreground"
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{filter.label}</p>
                    <p className="text-2xl font-bold">{counts[filter.value]}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Reviews Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produk</TableHead>
                <TableHead>Pelanggan</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="w-80">Komentar</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review) => {
                const statusInfo = statusConfig[review.status]
                const StatusIcon = statusInfo.icon
                return (
                  <TableRow key={review.id}>
                    <TableCell>
                      <span className="font-medium text-sm">{review.product}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{review.customer}</span>
                    </TableCell>
                    <TableCell>
                      <StarRating rating={review.rating} />
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-muted-foreground line-clamp-2">{review.comment}</p>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={`${statusInfo.color} border-0`}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {review.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {review.status !== "Disetujui" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                            onClick={() => handleApprove(review.id)}
                          >
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Setuju
                          </Button>
                        )}
                        {review.status !== "Spam" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleSpam(review.id)}
                          >
                            <XCircle className="mr-1 h-4 w-4" />
                            Spam
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
