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
  BookOpen,
  Filter,
  Calendar,
  Plus,
  TrendingUp,
  TrendingDown,
  Clock,
  XCircle,
} from "lucide-react"

interface JournalEntry {
  id: string
  number: string
  date: string
  description: string
  totalDebit: number
  totalCredit: number
  status: "Diterbitkan" | "Draft" | "Dibatalkan"
  type: string
  lines: {
    account: string
    accountName: string
    debit: number
    credit: number
  }[]
}

const journalEntries: JournalEntry[] = [
  {
    id: "JE-001",
    number: "JV.2026.06.00001",
    date: "2026-06-02",
    description: "Pembayaran Invoice PT Maju Jaya - SCW Nano Coating 9H",
    totalDebit: 45000000,
    totalCredit: 45000000,
    status: "Diterbitkan",
    type: "Pembayaran",
    lines: [
      { account: "1101", accountName: "Kas", debit: 45000000, credit: 0 },
      { account: "4101", accountName: "Penjualan Produk", debit: 0, credit: 45000000 },
    ],
  },
  {
    id: "JE-002",
    number: "JV.2026.06.00002",
    date: "2026-06-01",
    description: "Pembelian bahan baku coating dari ChemPro Asia",
    totalDebit: 28500000,
    totalCredit: 28500000,
    status: "Diterbitkan",
    type: "Pembelian",
    lines: [
      { account: "5101", accountName: "Harga Pokok Penjualan", debit: 28500000, credit: 0 },
      { account: "2101", accountName: "Utang Usaha", debit: 0, credit: 28500000 },
    ],
  },
  {
    id: "JE-003",
    number: "JV.2026.06.00003",
    date: "2026-06-01",
    description: "Gaji bulanan tim produksi SCW",
    totalDebit: 125000000,
    totalCredit: 125000000,
    status: "Diterbitkan",
    type: "Biaya Operasional",
    lines: [
      { account: "6101", accountName: "Gaji Karyawan", debit: 125000000, credit: 0 },
      { account: "1101", accountName: "Kas", debit: 0, credit: 125000000 },
    ],
  },
  {
    id: "JE-004",
    number: "JV.2026.05.00004",
    date: "2026-05-31",
    description: "Sewa gudang warehouse Surabaya Mei 2026",
    totalDebit: 15000000,
    totalCredit: 15000000,
    status: "Diterbitkan",
    type: "Biaya Operasional",
    lines: [
      { account: "6102", accountName: "Sewa Gudang", debit: 15000000, credit: 0 },
      { account: "1102", accountName: "Bank BCA", debit: 0, credit: 15000000 },
    ],
  },
  {
    id: "JE-005",
    number: "JV.2026.05.00005",
    date: "2026-05-30",
    description: "Penjualan SCW Body Wash & SCW Tire Shine ke Toko Onderdil",
    totalDebit: 67800000,
    totalCredit: 67800000,
    status: "Draft",
    type: "Penjualan",
    lines: [
      { account: "1102", accountName: "Bank BCA", debit: 67800000, credit: 0 },
      { account: "4101", accountName: "Penjualan Produk", debit: 0, credit: 67800000 },
    ],
  },
  {
    id: "JE-006",
    number: "JV.2026.05.00006",
    date: "2026-05-30",
    description: "Pembayaran invoice dari SPBU Jaya Abadi",
    totalDebit: 32500000,
    totalCredit: 32500000,
    status: "Diterbitkan",
    type: "Pembayaran",
    lines: [
      { account: "1101", accountName: "Kas", debit: 32500000, credit: 0 },
      { account: "1202", accountName: "Piutang Usaha", debit: 0, credit: 32500000 },
    ],
  },
  {
    id: "JE-007",
    number: "JV.2026.05.00007",
    date: "2026-05-29",
    description: "Pembelian SCW Nano Coating 9H untuk stok gudang",
    totalDebit: 85000000,
    totalCredit: 85000000,
    status: "Draft",
    type: "Pembelian",
    lines: [
      { account: "1201", accountName: "Persediaan Barang", debit: 85000000, credit: 0 },
      { account: "2101", accountName: "Utang Usaha", debit: 0, credit: 85000000 },
    ],
  },
  {
    id: "JE-008",
    number: "JV.2026.05.00008",
    date: "2026-05-28",
    description: "Penyesuaian stok SCW Body Polish",
    totalDebit: 12000000,
    totalCredit: 12000000,
    status: "Dibatalkan",
    type: "Penyesuaian",
    lines: [
      { account: "1201", accountName: "Persediaan Barang", debit: 12000000, credit: 0 },
      { account: "6101", accountName: "Harga Pokok Penjualan", debit: 0, credit: 12000000 },
    ],
  },
]

const transactionTypes = [
  "Semua",
  "Penjualan",
  "Pembelian",
  "Pembayaran",
  "Biaya Operasional",
  "Penyesuaian",
]

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
    case "Diterbitkan":
      return <Badge style={{ background: "#eef4ff", color: "#0176d3", border: "1px solid #c8e0f7", fontSize: 11, fontWeight: 600, borderRadius: 4 }}>{status}</Badge>
    case "Draft":
      return <Badge style={{ background: "#fef7e0", color: "#9a6b00", border: "1px solid #f9e0a0", fontSize: 11, fontWeight: 600, borderRadius: 4 }}>{status}</Badge>
    case "Dibatalkan":
      return <Badge style={{ background: "#fef1f0", color: "#ea001e", border: "1px solid #fcc8c8", fontSize: 11, fontWeight: 600, borderRadius: 4 }}>{status}</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function JournalPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "Diterbitkan" | "Draft" | "Dibatalkan">("all")
  const [typeFilter, setTypeFilter] = useState("Semua")
  const [dateFilter, setDateFilter] = useState("Semua")

  const filtered = useMemo(() => {
    return journalEntries.filter((entry) => {
      const matchesSearch =
        entry.description.toLowerCase().includes(search.toLowerCase()) ||
        entry.number.toLowerCase().includes(search.toLowerCase())
      const matchesStatus =
        statusFilter === "all" || entry.status === statusFilter
      const matchesType =
        typeFilter === "Semua" || entry.type === typeFilter
      const matchesDate =
        dateFilter === "Semua" || entry.date.startsWith(dateFilter)
      return matchesSearch && matchesStatus && matchesType && matchesDate
    })
  }, [search, statusFilter, typeFilter, dateFilter])

  const totalCount = journalEntries.length
  const diterbitkanCount = journalEntries.filter((e) => e.status === "Diterbitkan").length
  const draftCount = journalEntries.filter((e) => e.status === "Draft").length
  const dibatalkanCount = journalEntries.filter((e) => e.status === "Dibatalkan").length

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>
            Jurnal Umum
          </h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>
            Daftar semua jurnal transaksi akuntansi
          </p>
        </div>
        <Link href="/accounting/journal/create">
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
            New Journal Entry
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
                <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Total Jurnal</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: "#001526", marginTop: 4 }}>{totalCount}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 8, background: "#eef4ff" }}>
                <BookOpen size={18} style={{ color: "#0176d3" }} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          style={{ cursor: "pointer", transition: "all 100ms", border: statusFilter === "Diterbitkan" ? "2px solid #2e844a" : "1px solid #ecebea" }}
          onClick={() => setStatusFilter("Diterbitkan")}
        >
          <CardContent className="p-4" style={{ padding: 16 }}>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Diterbitkan</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: "#2e844a", marginTop: 4 }}>{diterbitkanCount}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 8, background: "#e8f5ed" }}>
                <TrendingUp size={18} style={{ color: "#2e844a" }} />
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

      {/* Table Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle style={{ fontSize: 15, fontWeight: 600, color: "#001526" }}>Daftar Jurnal</CardTitle>
              <CardDescription style={{ fontSize: 12, color: "#444746", marginTop: 2 }}>
                {filtered.length} jurnal ditemukan
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
              {/* Search */}
              <div style={{ position: "relative" }}>
                <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#444746" }} />
                <input
                  placeholder="Cari nomor jurnal atau keterangan..."
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
              {/* Date Filter */}
              <div style={{ position: "relative" }}>
                <Calendar size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#444746", pointerEvents: "none" }} />
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  style={{
                    height: 32, padding: "0 10px 0 32px",
                    fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 6,
                    background: "#fff", color: "#001526", outline: "none",
                    appearance: "none", WebkitAppearance: "none",
                    minWidth: 130,
                    cursor: "pointer",
                  }}
                >
                  <option value="Semua">Semua Tanggal</option>
                  <option value="2026-06">Juni 2026</option>
                  <option value="2026-05">Mei 2026</option>
                </select>
              </div>
              {/* Type Filter */}
              <div style={{ position: "relative" }}>
                <Filter size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#444746", pointerEvents: "none" }} />
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  style={{
                    height: 32, padding: "0 10px 0 32px",
                    fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 6,
                    background: "#fff", color: "#001526", outline: "none",
                    appearance: "none", WebkitAppearance: "none",
                    minWidth: 150,
                    cursor: "pointer",
                  }}
                >
                  {transactionTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
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
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Keterangan</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Tipe</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "right" }}>Total</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((entry) => (
                <TableRow
                  key={entry.id}
                  style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer", transition: "background 100ms" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f0f7ff"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  onClick={() => window.location.href = `/accounting/journal/${entry.id}`}
                >
                  <TableCell style={{ fontSize: 13, fontWeight: 500, color: "#0176d3" }}>
                    {entry.number}
                  </TableCell>
                  <TableCell style={{ fontSize: 13, color: "#444746" }}>{formatDate(entry.date)}</TableCell>
                  <TableCell style={{ fontSize: 13, color: "#001526", maxWidth: 300 }}>
                    <div className="truncate">
                      {entry.description}
                      <div style={{ fontSize: 11, color: "#444746", marginTop: 1 }}>
                        {entry.lines[0]?.account} - {entry.lines[0]?.accountName}
                        {entry.lines.length > 1 && ` +${entry.lines.length - 1} baris`}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell style={{ fontSize: 13, color: "#444746" }}>
                    <span style={{ fontSize: 12, color: "#444746", background: "#f4f6f9", padding: "2px 8px", borderRadius: 4 }}>
                      {entry.type}
                    </span>
                  </TableCell>
                  <TableCell style={{ fontSize: 13, fontFamily: "monospace", textAlign: "right", color: "#001526" }}>
                    {formatIDR(entry.totalDebit)}
                  </TableCell>
                  <TableCell>{statusBadge(entry.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
