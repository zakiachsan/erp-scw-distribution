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
  ArrowRightLeft,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react"

interface Transfer {
  id: string
  number: string
  date: string
  fromBank: string
  toBank: string
  description: string
  amount: number
  status: "Berhasil" | "Pending" | "Dibatalkan"
}

const mockTransfers: Transfer[] = [
  { id: "T-001", number: "TF.2026.06.00001", date: "2026-06-15", fromBank: "Bank BCA", toBank: "Bank Mandiri", description: "Transfer operasional ke rekening kerja", amount: 50000000, status: "Berhasil" },
  { id: "T-002", number: "TF.2026.06.00002", date: "2026-06-12", fromBank: "Bank Mandiri", toBank: "Bank BCA", description: "Transfer pembayaran supplier batch kedua", amount: 28500000, status: "Berhasil" },
  { id: "T-003", number: "TF.2026.06.00003", date: "2026-06-10", fromBank: "Bank BCA", toBank: "Kas", description: "Setor tunai untuk operasional harian", amount: 15000000, status: "Berhasil" },
  { id: "T-004", number: "TF.2026.05.00004", date: "2026-05-31", fromBank: "Kas", toBank: "Bank BCA", description: "Setoran kas ke rekening BCA", amount: 32500000, status: "Pending" },
  { id: "T-005", number: "TF.2026.05.00005", date: "2026-05-28", fromBank: "Bank BCA", toBank: "Bank Mandiri", description: "Transfer pembayaran gaji karyawan", amount: 125000000, status: "Dibatalkan" },
  { id: "T-006", number: "TF.2026.05.00006", date: "2026-05-25", fromBank: "Bank Mandiri", toBank: "Bank BCA", description: "Transfer dana investasi peralatan", amount: 85000000, status: "Berhasil" },
]

const bankOptions = ["All", "Kas", "Bank BCA", "Bank Mandiri"]

function formatIDR(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

const statusBadge = (status: string) => {
  switch (status) {
    case "Berhasil":
      return <Badge style={{ background: "#e8f5ed", color: "#2e844a", border: "1px solid #b8dcc5", fontSize: 11, fontWeight: 600, borderRadius: 4 }}>{status}</Badge>
    case "Pending":
      return <Badge style={{ background: "#fef7e0", color: "#9a6b00", border: "1px solid #f9e0a0", fontSize: 11, fontWeight: 600, borderRadius: 4 }}>{status}</Badge>
    case "Dibatalkan":
      return <Badge style={{ background: "#fef1f0", color: "#ea001e", border: "1px solid #fcc8c8", fontSize: 11, fontWeight: 600, borderRadius: 4 }}>{status}</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function TransfersPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "Berhasil" | "Pending" | "Dibatalkan">("all")
  const [bankFilter, setBankFilter] = useState("All")

  const filtered = useMemo(() => {
    return mockTransfers.filter((t) => {
      const matchesSearch =
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        t.number.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === "all" || t.status === statusFilter
      const matchesBank = bankFilter === "All" || t.fromBank === bankFilter || t.toBank === bankFilter
      return matchesSearch && matchesStatus && matchesBank
    })
  }, [search, statusFilter, bankFilter])

  const totalTransfers = mockTransfers.length
  const berhasilCount = mockTransfers.filter((t) => t.status === "Berhasil").length
  const pendingCount = mockTransfers.filter((t) => t.status === "Pending").length
  const dibatalkanCount = mockTransfers.filter((t) => t.status === "Dibatalkan").length

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>
            Transfer Bank
          </h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>
            Daftar transfer antar rekening bank SCW Distribution
          </p>
        </div>
        <Link href="/accounting/transfers/create">
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
            Tambah Transfer
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
                <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Total Transfer</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: "#001526", marginTop: 4 }}>{totalTransfers}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 8, background: "#eef4ff" }}>
                <ArrowRightLeft size={18} style={{ color: "#0176d3" }} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          style={{ cursor: "pointer", transition: "all 100ms", border: statusFilter === "Berhasil" ? "2px solid #2e844a" : "1px solid #ecebea" }}
          onClick={() => setStatusFilter("Berhasil")}
        >
          <CardContent className="p-4" style={{ padding: 16 }}>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Berhasil</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: "#2e844a", marginTop: 4 }}>{berhasilCount}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 8, background: "#e8f5ed" }}>
                <CheckCircle2 size={18} style={{ color: "#2e844a" }} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          style={{ cursor: "pointer", transition: "all 100ms", border: statusFilter === "Pending" ? "2px solid #fe9339" : "1px solid #ecebea" }}
          onClick={() => setStatusFilter("Pending")}
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
              <CardTitle style={{ fontSize: 15, fontWeight: 600, color: "#001526" }}>Daftar Transfer</CardTitle>
              <CardDescription style={{ fontSize: 12, color: "#444746", marginTop: 2 }}>
                {filtered.length} transfer ditemukan
                {statusFilter !== "all" && (
                  <span> ({statusFilter})</span>
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
                  placeholder="Cari nomor atau keterangan..."
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
              <div style={{ position: "relative" }}>
                <Filter size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#444746", pointerEvents: "none" }} />
                <select
                  value={bankFilter}
                  onChange={(e) => setBankFilter(e.target.value)}
                  style={{
                    height: 32, padding: "0 10px 0 32px",
                    fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 6,
                    background: "#fff", color: "#001526", outline: "none",
                    appearance: "none", WebkitAppearance: "none",
                    minWidth: 140,
                    cursor: "pointer",
                  }}
                >
                  {bankOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt === "All" ? "Semua Bank" : opt}</option>
                  ))}
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
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Dari Bank</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Ke Bank</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Keterangan</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "right" }}>Total</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((t) => (
                <TableRow
                  key={t.id}
                  style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer", transition: "background 100ms" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f0f7ff"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  onClick={() => window.location.href = `/accounting/transfers/${t.id}`}
                >
                  <TableCell style={{ fontSize: 13, fontWeight: 500, color: "#0176d3" }}>{t.number}</TableCell>
                  <TableCell style={{ fontSize: 13, color: "#444746" }}>{formatDate(t.date)}</TableCell>
                  <TableCell style={{ fontSize: 12, color: "#444746", background: "#f4f6f9", padding: "2px 8px", borderRadius: 4, display: "inline-block" }}>{t.fromBank}</TableCell>
                  <TableCell style={{ fontSize: 12, color: "#444746", background: "#eef4ff", padding: "2px 8px", borderRadius: 4, display: "inline-block" }}>{t.toBank}</TableCell>
                  <TableCell style={{ fontSize: 13, color: "#001526", maxWidth: 250 }} className="truncate">{t.description}</TableCell>
                  <TableCell style={{ fontSize: 13, fontFamily: "monospace", textAlign: "right", color: "#001526", fontWeight: 500 }}>{formatIDR(t.amount)}</TableCell>
                  <TableCell>{statusBadge(t.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
