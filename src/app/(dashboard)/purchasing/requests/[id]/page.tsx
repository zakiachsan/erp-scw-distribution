"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ArrowLeft,
  FileText,
} from "lucide-react"

/* ── Types ── */
interface PRItem {
  id: string
  productName: string
  qty: number
  unit: string
  specs: string
  estPrice: number
}

interface PurchaseRequest {
  id: string
  no: string
  date: string
  requester: string
  department: string
  notes: string
  items: PRItem[]
  totalEst: number
  status: "Open" | "Disetujui"
}

const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID")

const initialPRs: PurchaseRequest[] = [
  {
    id: "1",
    no: "PR-2026-0001",
    date: "2026-07-14",
    requester: "Andi Wijaya",
    department: "Purchasing",
    notes: "Pengadaan bahan baku produksi Q3",
    items: [
      { id: "i1", productName: "Ceramic Coating A1", qty: 50, unit: "pcs", specs: "Kemasan 1kg", estPrice: 250000 },
      { id: "i2", productName: "Nano Sealant", qty: 30, unit: "pcs", specs: "Kemasan 500ml", estPrice: 180000 },
    ],
    totalEst: 17900000,
    status: "Disetujui",
  },
  {
    id: "2",
    no: "PR-2026-0002",
    date: "2026-07-15",
    requester: "Siti Aminah",
    department: "Gudang",
    notes: "Rak penyimpanan baru",
    items: [
      { id: "i3", productName: "Rak Besi Heavy Duty", qty: 10, unit: "unit", specs: "200x50x200 cm", estPrice: 1500000 },
    ],
    totalEst: 15000000,
    status: "Open",
  },
  {
    id: "3",
    no: "PR-2026-0003",
    date: "2026-07-10",
    requester: "Dedi Kurniawan",
    department: "Produksi",
    notes: "Spare part mesin produksi",
    items: [
      { id: "i4", productName: "Bearing SKF 6205", qty: 20, unit: "pcs", specs: "SKF original", estPrice: 85000 },
      { id: "i5", productName: "V-Belt B86", qty: 15, unit: "pcs", specs: "Gates", estPrice: 45000 },
    ],
    totalEst: 2375000,
    status: "Disetujui",
  },
]

export default function PRDetailPage() {
  const params = useParams()
  const id = String(params?.id ?? "")
  const pr = initialPRs.find((p) => p.id === id)

  if (!pr) {
    return (
      <div className="space-y-6">
        <Link
          href="/purchasing/requests"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke PR
        </Link>
        <Card>
          <CardContent className="p-8 text-center text-sm text-muted-foreground">
            PR dengan ID <strong>{id}</strong> tidak ditemukan.
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Back */}
      <Link
        href="/purchasing/requests"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke PR
      </Link>

      {/* Header */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-muted-foreground font-sans font-medium">{pr.no}</span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${
                  pr.status === "Disetujui"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-blue-50 text-blue-700 border-blue-200"
                }`}
              >
                {pr.status}
              </span>
            </div>
            <CardTitle className="text-lg">Purchase Request — {pr.no}</CardTitle>
          </div>
          {pr.status === "Disetujui" && (
            <Link href={`/purchasing/quotations?pr=${pr.id}`}>
              <Button>
                <FileText className="mr-1 h-4 w-4" />
                Buat Penawaran
              </Button>
            </Link>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
            <div>
              <span className="text-muted-foreground text-xs">Tanggal</span>
              <p className="font-medium">{new Date(pr.date).toLocaleDateString("id-ID")}</p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs">Pengaju</span>
              <p className="font-medium">{pr.requester}</p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs">Departemen</span>
              <p className="font-medium">{pr.department}</p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs">Estimasi Total</span>
              <p className="font-medium">{fmt(pr.totalEst)}</p>
            </div>
          </div>
          {pr.notes && (
            <div className="text-sm text-muted-foreground mb-4">
              <span className="font-medium text-foreground">Catatan:</span> {pr.notes}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Items Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Daftar Barang</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Nama Barang</TableHead>
                <TableHead>Spesifikasi</TableHead>
                <TableHead className="text-center">Qty</TableHead>
                <TableHead className="text-center">Satuan</TableHead>
                <TableHead className="text-right">Estimasi Harga</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pr.items.map((item, idx) => (
                <TableRow key={item.id}>
                  <TableCell className="text-xs text-muted-foreground">{idx + 1}</TableCell>
                  <TableCell className="font-medium">{item.productName}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{item.specs || "—"}</TableCell>
                  <TableCell className="text-center">{item.qty}</TableCell>
                  <TableCell className="text-center">{item.unit}</TableCell>
                  <TableCell className="text-right">{fmt(item.estPrice)}</TableCell>
                  <TableCell className="text-right font-medium">{fmt(item.estPrice * item.qty)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
