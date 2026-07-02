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
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react"

interface Reconciliation {
  id: string
  number: string
  date: string
  bank: string
  period: string
  selisih: number
  status: "Selesai" | "Draft" | "Dibatalkan"
}

const mockReconciliations: Reconciliation[] = [
  { id: "RC-001", number: "RK.2026.06.00001", date: "2026-06-15", bank: "Bank BCA", period: "Juni 2026", selisih: 0, status: "Selesai" },
  { id: "RC-002", number: "RK.2026.06.00002", date: "2026-06-10", bank: "Bank Mandiri", period: "Juni 2026", selisih: 250000, status: "Selesai" },
  { id: "RC-003", number: "RK.2026.05.00003", date: "2026-05-31", bank: "Bank BCA", period: "Mei 2026", selisih: 0, status: "Draft" },
  { id: "RC-004", number: "RK.2026.05.00004", date: "2026-05-25", bank: "Bank Mandiri", period: "Mei 2026", selisih: 500000, status: "Draft" },
  { id: "RC-005", number: "RK.2026.04.00005", date: "2026-04-30", bank: "Bank BCA", period: "April 2026", selisih: 0, status: "Dibatalkan" },
]

const bankOptions = ["All", "Bank BCA", "Bank Mandiri"]

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
    case "Selesai":
      return <Badge style={{ background: "#e8f5ed", color: "#2e844a", border: "1px solid #b8dcc5", fontSize: 11, fontWeight: 600, borderRadius: 4 }}>{status}</Badge>
    case "Draft":
      return <Badge style={{ background: "#fef7e0", color: "#9a6b00", border: "1px solid #f9e0a0", fontSize: 11, fontWeight: 600, borderRadius: 4 }}>{status}</Badge>
    case "Dibatalkan":
      return <Badge style={{ background: "#fef1f0", color: "#ea001e", border: "1px solid #fcc8c8", fontSize: 11, fontWeight: 600, borderRadius: 4 }}>{status}</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function ReconciliationPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "Selesai" | "Draft" | "Dibatalkan">("all")
  const [bankFilter, setBankFilter] = useState("All")

  const filtered = useMemo(() => {
    return mockReconciliations.filter((r) => {
      const matchesSearch =
        r.number.toLowerCase().includes(search.toLowerCase()) ||
        r.bank.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === "all" || r.status === statusFilter
      const matchesBank = bankFilter === "All" || r.bank === bankFilter
      return matchesSearch && matchesStatus && matchesBank
    })
  }, [search, statusFilter, bankFilter])

  const totalReconciliations = mockReconciliations.length
  const selesaiCount = mockReconciliations.filter((r) => r.status === "Selesai").length
  const draftCount = mockReconciliations.filter((r) => r.status === "Draft").length
  const dibatalkanCount = mockReconciliations.filter((r) => r.status === "Dibatalkan").length

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>
            Rekonsiliasi Bank
          </h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>
            Cocokkan data rekening bank dengan jurnal akuntansi
          </p>
        </div>
        <Link href="/accounting/reconciliation/create">
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
            Tambah Rekonsiliasi
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
                <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Total Rekonsiliasi</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: "#001526", marginTop: 4 }}>{totalReconciliations}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 8, background: "#eef4ff" }}>
                <Landmark size={18} style={{ color: "#0176d3" }} />
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
          style={{ cursor: "pointer", transition: "all 100ms", border: statusFilter === "Draft" ? "2px solid #fe9339" : "1px solid #ecebea" }}
          onClick={() => setStatusFilter("Draft")}
        >
          <CardContent className="p-4" style={{ padding: 16 }}>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Draft</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: "#9a6b00", marginTop: 4 }}>{draftCount}</p>
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
              <CardTitle style={{ fontSize: 15, fontWeight: 600, color: "#001526" }}>Daftar Rekonsiliasi</CardTitle>
              <CardDescription style={{ fontSize: 12, color: "#444746", marginTop: 2 }}>
                {filtered.length} rekonsiliasi ditemukan
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
                  placeholder="Cari nomor atau bank..."
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
                  <option value="All">Semua Bank</option>
                  {bankOptions.filter(b => b !== "All").map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
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
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Bank</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Periode</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "right" }}>Selisih</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow
                  key={r.id}
                  style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer", transition: "background 100ms" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f0f7ff"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  onClick={() => window.location.href = `/accounting/reconciliation/${r.id}`}
                >
                  <TableCell style={{ fontSize: 13, fontWeight: 500, color: "#0176d3" }}>{r.number}</TableCell>
                  <TableCell style={{ fontSize: 13, color: "#444746" }}>{formatDate(r.date)}</TableCell>
                  <TableCell style={{ fontSize: 12, color: "#444746", background: "#f4f6f9", padding: "2px 8px", borderRadius: 4, display: "inline-block" }}>{r.bank}</TableCell>
                  <TableCell style={{ fontSize: 13, color: "#001526" }}>{r.period}</TableCell>
                  <TableCell style={{ fontSize: 13, fontFamily: "monospace", textAlign: "right", color: r.selisih > 0 ? "#ea001e" : "#001526", fontWeight: 500 }}>
                    {r.selisih === 0 ? "-" : formatIDR(r.selisih)}
                  </TableCell>
                  <TableCell>{statusBadge(r.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
