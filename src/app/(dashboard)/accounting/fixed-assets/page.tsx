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
  Package,
  Filter,
  Landmark,
  Building,
  Factory,
  Car,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react"

interface FixedAsset {
  id: number
  name: string
  purchaseDate: string
  quantity: number
  totalAsset: number
  category: string
  status: "active" | "fully-depreciated" | "disposed"
}

const mockAssets: FixedAsset[] = [
  { id: 1, name: "Gedung Gudang Surabaya", purchaseDate: "15/01/2020", quantity: 1, totalAsset: 850000000, category: "Gedung", status: "active" },
  { id: 2, name: "Mesin Filling SCW", purchaseDate: "01/06/2021", quantity: 2, totalAsset: 320000000, category: "Peralatan", status: "active" },
  { id: 3, name: "Mesin Mixing Bahan Coating", purchaseDate: "01/06/2021", quantity: 1, totalAsset: 185000000, category: "Peralatan", status: "active" },
  { id: 4, name: "Mitsubishi L300 Box", purchaseDate: "10/03/2022", quantity: 3, totalAsset: 285000000, category: "Kendaraan", status: "active" },
  { id: 5, name: "Toyota HiAce Distribusi", purchaseDate: "20/01/2023", quantity: 2, totalAsset: 520000000, category: "Kendaraan", status: "active" },
  { id: 6, name: "Komputer Server & Jaringan", purchaseDate: "05/08/2023", quantity: 1, totalAsset: 85000000, category: "Peralatan", status: "active" },
  { id: 7, name: "Printer Label & Barcode", purchaseDate: "15/02/2024", quantity: 4, totalAsset: 15000000, category: "Peralatan", status: "active" },
  { id: 8, name: "Rak Gudang Steel", purchaseDate: "20/05/2020", quantity: 10, totalAsset: 45000000, category: "Peralatan", status: "fully-depreciated" },
  { id: 9, name: "Tanah Gudang", purchaseDate: "01/01/2019", quantity: 1, totalAsset: 450000000, category: "Tanah", status: "active" },
  { id: 10, name: "Forklift Electric", purchaseDate: "12/07/2022", quantity: 2, totalAsset: 120000000, category: "Peralatan", status: "active" },
  { id: 11, name: "Laptop Office Lenovo", purchaseDate: "01/09/2022", quantity: 8, totalAsset: 24000000, category: "Peralatan", status: "fully-depreciated" },
  { id: 12, name: "Kendaraan Motor Operasional", purchaseDate: "10/04/2021", quantity: 3, totalAsset: 18000000, category: "Kendaraan", status: "disposed" },
]

function formatIDR(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`
}

const kategoriFilterOptions = ["Semua", "Tanah", "Gedung", "Peralatan", "Kendaraan"]

const categoryIcons: Record<string, typeof Building> = {
  Tanah: Landmark,
  Gedung: Building,
  Peralatan: Factory,
  Kendaraan: Car,
}

const statusConfig: Record<FixedAsset["status"], { label: string; className: string }> = {
  active: { label: "Aktif", className: "bg-emerald-100 text-emerald-800" },
  "fully-depreciated": { label: "Fully Depreciated", className: "bg-amber-100 text-amber-800" },
  disposed: { label: "Disposed", className: "bg-red-100 text-red-800" },
}

const statusBadge = (status: FixedAsset["status"]) => {
  const config = statusConfig[status]
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    active: { bg: "#e8f5ed", text: "#2e844a", border: "#b8dcc5" },
    "fully-depreciated": { bg: "#fef7e0", text: "#9a6b00", border: "#f9e0a0" },
    disposed: { bg: "#fef1f0", text: "#ea001e", border: "#fcc8c8" },
  }
  const c = colors[status] || colors.active
  return (
    <span style={{ fontSize: 11, fontWeight: 600, background: c.bg, color: c.text, border: `1px solid ${c.border}`, padding: "2px 8px", borderRadius: 4 }}>
      {config.label}
    </span>
  )
}

export default function FixedAssetsPage() {
  const [search, setSearch] = useState("")
  const [kategoriFilter, setKategoriFilter] = useState("Semua")
  const [statusFilter, setStatusFilter] = useState<"all" | FixedAsset["status"]>("all")

  const filteredAssets = useMemo(() => {
    return mockAssets.filter((a) => {
      const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase())
      const matchesKategori = kategoriFilter === "Semua" || a.category === kategoriFilter
      const matchesStatus = statusFilter === "all" || a.status === statusFilter
      return matchesSearch && matchesKategori && matchesStatus
    })
  }, [search, kategoriFilter, statusFilter])

  const totalAssets = mockAssets.length
  const activeCount = mockAssets.filter((a) => a.status === "active").length
  const depreciatedCount = mockAssets.filter((a) => a.status === "fully-depreciated").length
  const disposedCount = mockAssets.filter((a) => a.status === "disposed").length

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>
            Aset Tetap
          </h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>
            Daftar aset tetap SCW Distribution
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card
          style={{ cursor: "pointer", transition: "all 100ms", border: statusFilter === "all" ? "2px solid #0176d3" : "1px solid #ecebea" }}
          onClick={() => setStatusFilter("all")}
        >
          <CardContent className="p-4" style={{ padding: 16 }}>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Total Aset</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: "#001526", marginTop: 4 }}>{totalAssets}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 8, background: "#eef4ff" }}>
                <Package size={18} style={{ color: "#0176d3" }} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          style={{ cursor: "pointer", transition: "all 100ms", border: statusFilter === "active" ? "2px solid #2e844a" : "1px solid #ecebea" }}
          onClick={() => setStatusFilter("active")}
        >
          <CardContent className="p-4" style={{ padding: 16 }}>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Aktif</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: "#2e844a", marginTop: 4 }}>{activeCount}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 8, background: "#e8f5ed" }}>
                <CheckCircle size={18} style={{ color: "#2e844a" }} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          style={{ cursor: "pointer", transition: "all 100ms", border: statusFilter === "fully-depreciated" ? "2px solid #fe9339" : "1px solid #ecebea" }}
          onClick={() => setStatusFilter("fully-depreciated")}
        >
          <CardContent className="p-4" style={{ padding: 16 }}>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Fully Depreciated</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: "#9a6b00", marginTop: 4 }}>{depreciatedCount}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 8, background: "#fff4e5" }}>
                <AlertTriangle size={18} style={{ color: "#fe9339" }} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          style={{ cursor: "pointer", transition: "all 100ms", border: statusFilter === "disposed" ? "2px solid #ea001e" : "1px solid #ecebea" }}
          onClick={() => setStatusFilter("disposed")}
        >
          <CardContent className="p-4" style={{ padding: 16 }}>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Disposed</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: "#ea001e", marginTop: 4 }}>{disposedCount}</p>
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
              <CardTitle style={{ fontSize: 15, fontWeight: 600, color: "#001526" }}>Aset Tetap</CardTitle>
              <CardDescription style={{ fontSize: 12, color: "#444746", marginTop: 2 }}>
                {filteredAssets.length} aset ditemukan
                {statusFilter !== "all" && (
                  <span> ({statusConfig[statusFilter].label})</span>
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
                  placeholder="Search nama aset..."
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
                  value={kategoriFilter}
                  onChange={(e) => setKategoriFilter(e.target.value)}
                  style={{
                    height: 32, padding: "0 10px 0 32px",
                    fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 6,
                    background: "#fff", color: "#001526", outline: "none",
                    appearance: "none", WebkitAppearance: "none",
                    minWidth: 140,
                    cursor: "pointer",
                  }}
                >
                  {kategoriFilterOptions.map((k) => (
                    <option key={k} value={k}>{k === "Semua" ? "Semua Kategori" : k}</option>
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
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Nama Aset</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Tanggal Beli</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "center" }}>Kuantitas</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "right" }}>Total Aset</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} style={{ textAlign: "center", padding: "40px 16px", fontSize: 13, color: "#444746" }}>
                    Tidak ada aset ditemukan
                  </TableCell>
                </TableRow>
              ) : (
                filteredAssets.map((asset) => {
                  const Icon = categoryIcons[asset.category] || Building
                  return (
                    <TableRow
                      key={asset.id}
                      style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer", transition: "background 100ms" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#f0f7ff"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                      onClick={() => window.location.href = `/accounting/fixed-assets/${asset.id}`}
                    >
                      <TableCell style={{ fontSize: 13, fontWeight: 500, color: "#0176d3" }}>{asset.id}</TableCell>
                      <TableCell style={{ fontSize: 13, color: "#001526" }}>
                        <div className="flex items-center gap-2">
                          <Icon size={14} style={{ color: "#444746" }} />
                          <span style={{ fontWeight: 500 }}>{asset.name}</span>
                          {statusBadge(asset.status)}
                        </div>
                      </TableCell>
                      <TableCell style={{ fontSize: 13, color: "#444746" }}>{asset.purchaseDate}</TableCell>
                      <TableCell style={{ textAlign: "center", fontSize: 13, color: "#001526" }}>{asset.quantity}</TableCell>
                      <TableCell style={{ fontSize: 13, fontFamily: "monospace", textAlign: "right", color: "#001526" }}>{formatIDR(asset.totalAsset)}</TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
