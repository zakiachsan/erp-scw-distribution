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
  Landmark,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react"

interface Payment {
  id: string
  date: string
  cashBank: string
  description: string
  amount: number
  status: "Lunas" | "Pending" | "Dibatalkan"
}

const payments: Payment[] = [
  { id: "PB.2026.06.00001", date: "2026-06-15", cashBank: "Bank BCA", description: "Pembayaran invoice PT Autogloss Indonesia", amount: 45000000, status: "Lunas" },
  { id: "PB.2026.06.00002", date: "2026-06-12", cashBank: "Bank Mandiri", description: "Pembelian bahan baku coating dari ChemPro Asia", amount: 28500000, status: "Lunas" },
  { id: "PB.2026.06.00003", date: "2026-06-10", cashBank: "Kas", description: "Gaji bulanan tim produksi SCW", amount: 125000000, status: "Lunas" },
  { id: "PB.2026.05.00004", date: "2026-05-31", cashBank: "Bank BCA", description: "Sewa gudang warehouse Surabaya Mei 2026", amount: 15000000, status: "Lunas" },
  { id: "PB.2026.05.00005", date: "2026-05-28", cashBank: "Kas", description: "Biaya operasional kantor SCW", amount: 8200000, status: "Pending" },
  { id: "PB.2026.05.00006", date: "2026-05-25", cashBank: "Bank Mandiri", description: "Pembayaran supplier PT ChemPro Asia batch kedua", amount: 67800000, status: "Lunas" },
  { id: "PB.2026.05.00007", date: "2026-05-20", cashBank: "Bank BCA", description: "Pembelian peralatan produksi coating line", amount: 85000000, status: "Dibatalkan" },
]

type FilterValue = "all" | "lunas" | "pending" | "dibatalkan"

const formatIDR = (val: number) =>
  `Rp ${val.toLocaleString("id-ID")}`

const statusBadge = (status: string) => {
  switch (status) {
    case "Lunas":
      return <Badge style={{ background: "#e8f5ed", color: "#2e844a", border: "1px solid #b8dcc5", fontSize: 11, fontWeight: 600, borderRadius: 4 }}>{status}</Badge>
    case "Pending":
      return <Badge style={{ background: "#fef7e0", color: "#9a6b00", border: "1px solid #f9e0a0", fontSize: 11, fontWeight: 600, borderRadius: 4 }}>{status}</Badge>
    case "Dibatalkan":
      return <Badge style={{ background: "#fef1f0", color: "#ea001e", border: "1px solid #fcc8c8", fontSize: 11, fontWeight: 600, borderRadius: 4 }}>{status}</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function PaymentsPage() {
  const [statusFilter, setStatusFilter] = useState<FilterValue>("all")
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    return payments.filter((p) => {
      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "lunas" && p.status === "Lunas") ||
        (statusFilter === "pending" && p.status === "Pending") ||
        (statusFilter === "dibatalkan" && p.status === "Dibatalkan")
      const matchSearch =
        !search ||
        p.id.toLowerCase().includes(search.toLowerCase()) ||
        p.cashBank.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      return matchStatus && matchSearch
    })
  }, [statusFilter, search])

  const totalCount = payments.length
  const lunasCount = payments.filter((p) => p.status === "Lunas").length
  const pendingCount = payments.filter((p) => p.status === "Pending").length
  const dibatalkanCount = payments.filter((p) => p.status === "Dibatalkan").length

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>
            Pembayaran
          </h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>
            Daftar pembayaran kas & bank SCW Distribution
          </p>
        </div>
        <Link href="/accounting/payments/create">
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
            Tambah Pembayaran
          </button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card
          style={{ cursor: "pointer", transition: "all 100ms", border: statusFilter === "all" ? "2px solid #0176d3" : "1px solid #ecebea" }}
          onClick={() => setStatusFilter("all")}
        >
          <CardContent className="p-4" style={{ padding: 16 }}>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Total Pembayaran</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: "#001526", marginTop: 4 }}>{totalCount}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 8, background: "#eef4ff" }}>
                <Landmark size={18} style={{ color: "#0176d3" }} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          style={{ cursor: "pointer", transition: "all 100ms", border: statusFilter === "lunas" ? "2px solid #2e844a" : "1px solid #ecebea" }}
          onClick={() => setStatusFilter("lunas")}
        >
          <CardContent className="p-4" style={{ padding: 16 }}>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Lunas</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: "#2e844a", marginTop: 4 }}>{lunasCount}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 8, background: "#e8f5ed" }}>
                <CheckCircle2 size={18} style={{ color: "#2e844a" }} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          style={{ cursor: "pointer", transition: "all 100ms", border: statusFilter === "pending" ? "2px solid #fe9339" : "1px solid #ecebea" }}
          onClick={() => setStatusFilter("pending")}
        >
          <CardContent className="p-4" style={{ padding: 16 }}>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Pending</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: "#9a6b00", marginTop: 4 }}>{pendingCount}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 8, background: "#fff4e5" }}>
                <Clock size={18} style={{ color: "#fe9339" }} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          style={{ cursor: "pointer", transition: "all 100ms", border: statusFilter === "dibatalkan" ? "2px solid #ea001e" : "1px solid #ecebea" }}
          onClick={() => setStatusFilter("dibatalkan")}
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

      {/* Table Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle style={{ fontSize: 15, fontWeight: 600, color: "#001526" }}>Daftar Pembayaran</CardTitle>
              <CardDescription style={{ fontSize: 12, color: "#444746", marginTop: 2 }}>
                {filtered.length} pembayaran ditemukan
                {statusFilter !== "all" && (
                  <span> ({statusFilter === "lunas" ? "Lunas" : statusFilter === "pending" ? "Pending" : "Dibatalkan"})</span>
                )}
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              {statusFilter !== "all" && (
                <button
                  style={{ padding: "5px 12px", fontSize: 12, fontWeight: 500, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}
                  onClick={() => setStatusFilter("all")}
                >
                  Clear filter
                </button>
              )}
              <div style={{ position: "relative" }}>
                <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#444746" }} />
                <input
                  placeholder="Cari nomor / kas / keterangan..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    height: 32, width: 240,
                    padding: "0 10px 0 32px",
                    fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6,
                    outline: "none",
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = "#0176d3"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "#d8d8d8"}
                />
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
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Kas/Bank</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Keterangan</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "right" }}>Nilai</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: "center", padding: "48px 16px", fontSize: 13, color: "#444746" }}>
                    Tidak ada pembayaran ditemukan
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((p) => (
                  <TableRow
                    key={p.id}
                    style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer", transition: "background 100ms" }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#f0f7ff"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    onClick={() => window.location.href = `/accounting/payments/${p.id}`}
                  >
                    <TableCell style={{ fontSize: 13, fontWeight: 500, color: "#0176d3" }}>{p.id}</TableCell>
                    <TableCell style={{ fontSize: 13, color: "#444746" }}>{p.date}</TableCell>
                    <TableCell style={{ fontSize: 13, color: "#444746" }}>
                      <span style={{ fontSize: 12, color: "#444746", background: "#f4f6f9", padding: "2px 8px", borderRadius: 4 }}>{p.cashBank}</span>
                    </TableCell>
                    <TableCell style={{ fontSize: 13, color: "#001526", maxWidth: 300 }} className="truncate">{p.description}</TableCell>
                    <TableCell style={{ fontSize: 13, fontFamily: "monospace", textAlign: "right", color: "#001526", fontWeight: 500 }}>{formatIDR(p.amount)}</TableCell>
                    <TableCell>{statusBadge(p.status)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
