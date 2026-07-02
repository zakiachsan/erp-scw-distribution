"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Search,
  Plus,
  ClipboardList,
  Filter,
  Clock,
  CheckCircle2,
  XCircle,
  FileEdit,
} from "lucide-react"

interface WorkOrder {
  id: string
  number: string
  date: string
  customer: string
  keterangan: string
  status: "Dalam Proses" | "Selesai" | "Dibatalkan" | "Draft"
}

const workOrders: WorkOrder[] = [
  { id: "JC-001", number: "JC.2026.06.00001", date: "2026-06-18", customer: "PT Autogloss Indonesia", keterangan: "Coating SCW Nano Coating 9H untuk 10 unit Toyota", status: "Dalam Proses" },
  { id: "JC-002", number: "JC.2026.06.00002", date: "2026-06-17", customer: "CV Ceramic Pro JKT", keterangan: "Pembuatan batch SCW Body Wash 50L", status: "Dalam Proses" },
  { id: "JC-003", number: "JC.2026.06.00003", date: "2026-06-16", customer: "PT DetailWorks BDG", keterangan: "Produksi SCW Tire Shine 100 botol", status: "Selesai" },
  { id: "JC-004", number: "JC.2026.06.00004", date: "2026-06-15", customer: "GlossUp Bali", keterangan: "Coating interior leather treatment", status: "Selesai" },
  { id: "JC-005", number: "JC.2026.06.00005", date: "2026-06-14", customer: "CV ProShine SBY", keterangan: "Proses detailing paket showroom", status: "Draft" },
  { id: "JC-006", number: "JC.2026.06.00006", date: "2026-06-12", customer: "DetailPro Semarang", keterangan: "Produksi batch kecil SCW Glass Coating", status: "Selesai" },
  { id: "JC-007", number: "JC.2026.06.00007", date: "2026-06-10", customer: "UD Shinemax", keterangan: "Coating full body 20 unit", status: "Dibatalkan" },
  { id: "JC-008", number: "JC.2026.06.00008", date: "2026-06-08", customer: "AutoCare Makassar", keterangan: "Detailing harian 5 unit", status: "Selesai" },
]

const statusBadge = (status: string) => {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    "Dalam Proses": { bg: "#eef4ff", text: "#0176d3", border: "#c8e0f7" },
    Selesai: { bg: "#e8f5ed", text: "#2e844a", border: "#b8dcc5" },
    Dibatalkan: { bg: "#fef1f0", text: "#ea001e", border: "#fcc8c8" },
    Draft: { bg: "#fef7e0", text: "#9a6b00", border: "#f9e0a0" },
  }
  const c = colors[status] || { bg: "#f4f6f9", text: "#444746", border: "#e0e0e0" }
  return (
    <span style={{ fontSize: 11, fontWeight: 600, background: c.bg, color: c.text, border: `1px solid ${c.border}`, padding: "2px 8px", borderRadius: 4 }}>
      {status}
    </span>
  )
}

const categoryFilterOptions = ["Semua", "Dalam Proses", "Selesai", "Draft", "Dibatalkan"]

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export default function WorkOrdersPage() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("Semua")
  const [statusFilter, setStatusFilter] = useState<"all" | "Dalam Proses" | "Selesai" | "Dibatalkan" | "Draft">("all")

  const filtered = useMemo(() => {
    return workOrders.filter((order) => {
      const matchesSearch =
        order.customer.toLowerCase().includes(search.toLowerCase()) ||
        order.number.toLowerCase().includes(search.toLowerCase()) ||
        order.keterangan.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = categoryFilter === "Semua" || order.status === categoryFilter
      const matchesStatus = statusFilter === "all" || order.status === statusFilter
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [search, categoryFilter, statusFilter])

  const totalCount = workOrders.length
  const dalamProsesCount = workOrders.filter((o) => o.status === "Dalam Proses").length
  const selesaiCount = workOrders.filter((o) => o.status === "Selesai").length
  const dibatalkanCount = workOrders.filter((o) => o.status === "Dibatalkan").length

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>
            Pekerjaan Pesanan
          </h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>
            Daftar pekerjaan pesanan produksi SCW Distribution
          </p>
        </div>
        <Link href="/accounting/inventory/work-orders/create">
          <button
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "7px 14px", fontSize: 13, fontWeight: 600,
              background: "#0176d3", color: "#fff",
              border: "1px solid #0176d3", borderRadius: 6,
              cursor: "pointer", transition: "all 100ms",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#014486"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#0176d3"}
          >
            <Plus size={15} />
            Buat Pekerjaan
          </button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card
          style={{ cursor: "pointer", transition: "all 100ms", border: statusFilter === "all" ? "2px solid #0176d3" : "1px solid #ecebea" }}
          onClick={() => setStatusFilter("all")}
        >
          <CardContent className="p-4" style={{ padding: 16 }}>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Total</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: "#001526", marginTop: 4 }}>{totalCount}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 8, background: "#eef4ff" }}>
                <ClipboardList size={18} style={{ color: "#0176d3" }} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          style={{ cursor: "pointer", transition: "all 100ms", border: statusFilter === "Dalam Proses" ? "2px solid #0176d3" : "1px solid #ecebea" }}
          onClick={() => setStatusFilter("Dalam Proses")}
        >
          <CardContent className="p-4" style={{ padding: 16 }}>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Dalam Proses</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: "#0176d3", marginTop: 4 }}>{dalamProsesCount}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 8, background: "#eef4ff" }}>
                <Clock size={18} style={{ color: "#0176d3" }} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          style={{ cursor: "pointer", transition: "all 100ms", border: statusFilter === "Selesai" ? "2px solid #2e844a" : "1px solid #ecebea" }}
          onClick={() => setStatusFilter("Selesai")}
        >
          <CardContent className="p-4" style={{ padding: 16 }}>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Selesai</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: "#2e844a", marginTop: 4 }}>{selesaiCount}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 8, background: "#e8f5ed" }}>
                <CheckCircle2 size={18} style={{ color: "#2e844a" }} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          style={{ cursor: "pointer", transition: "all 100ms", border: statusFilter === "Dibatalkan" ? "2px solid #ea001e" : "1px solid #ecebea" }}
          onClick={() => setStatusFilter("Dibatalkan")}
        >
          <CardContent className="p-4" style={{ padding: 16 }}>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Dibatalkan</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: "#ea001e", marginTop: 4 }}>{dibatalkanCount}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 8, background: "#fef1f0" }}>
                <XCircle size={18} style={{ color: "#ea001e" }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle style={{ fontSize: 15, fontWeight: 600, color: "#001526" }}>Pekerjaan Pesanan</CardTitle>
              <CardDescription style={{ fontSize: 12, color: "#444746", marginTop: 2 }}>
                {filtered.length} pekerjaan pesanan ditemukan
                {statusFilter !== "all" && (<span> ({statusFilter})</span>)}
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              {statusFilter !== "all" && (
                <button style={{ padding: "5px 12px", fontSize: 12, fontWeight: 500, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}
                  onClick={() => setStatusFilter("all")}>Clear filter</button>
              )}
              <div style={{ position: "relative" }}>
                <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#444746" }} />
                <input placeholder="Cari nomor, pelanggan, atau keterangan..." value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ height: 32, width: 240, padding: "0 10px 0 32px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none" }}
                  onFocus={(e) => e.currentTarget.style.borderColor = "#0176d3"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "#d8d8d8"} />
              </div>
              <div style={{ position: "relative" }}>
                <Filter size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#444746", pointerEvents: "none" }} />
                <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
                  style={{ height: 32, padding: "0 10px 0 32px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 6, background: "#fff", color: "#001526", outline: "none", appearance: "none", WebkitAppearance: "none", minWidth: 140, cursor: "pointer" }}>
                  {categoryFilterOptions.map((cat) => (<option key={cat} value={cat}>{cat === "Semua" ? "Semua Status" : cat}</option>))}
                </select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Nomor #</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Tanggal</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Pelanggan</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Keterangan</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((order) => (
                <TableRow key={order.id} style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer", transition: "background 100ms" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f0f7ff"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  onClick={() => window.location.href = `/accounting/inventory/work-orders/${order.id}`}>
                  <TableCell style={{ fontSize: 13, fontWeight: 500, color: "#0176d3" }}>{order.number}</TableCell>
                  <TableCell style={{ fontSize: 13, color: "#444746" }}>{formatDate(order.date)}</TableCell>
                  <TableCell style={{ fontSize: 13, color: "#001526" }}>{order.customer}</TableCell>
                  <TableCell style={{ fontSize: 13, color: "#444746", maxWidth: 300 }} className="truncate">{order.keterangan}</TableCell>
                  <TableCell>{statusBadge(order.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
