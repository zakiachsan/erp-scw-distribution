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
  Plus,
  Download,
  Car,
  Building,
  Monitor,
  Factory,
  TrendingDown,
} from "lucide-react"

interface FixedAsset {
  id: string
  name: string
  category: string
  icon: string
  purchaseDate: string
  purchaseValue: number
  usefulLife: number
  accumulatedDepreciation: number
  bookValue: number
  status: "Active" | "Fully Depreciated" | "Disposed"
}

const assets: FixedAsset[] = [
  { id: "FA-001", name: "Gedung Gudang Surabaya", category: "Building", icon: "building", purchaseDate: "2020-01-15", purchaseValue: 850000000, usefulLife: 20, accumulatedDepreciation: 212500000, bookValue: 637500000, status: "Active" },
  { id: "FA-002", name: "Mesin Filling SCW", category: "Equipment", icon: "factory", purchaseDate: "2021-06-01", purchaseValue: 320000000, usefulLife: 10, accumulatedDepreciation: 96000000, bookValue: 224000000, status: "Active" },
  { id: "FA-003", name: "Mesin Mixing Bahan Coating", category: "Equipment", icon: "factory", purchaseDate: "2021-06-01", purchaseValue: 185000000, usefulLife: 10, accumulatedDepreciation: 55500000, bookValue: 129500000, status: "Active" },
  { id: "FA-004", name: "Mitsubishi L300 Box", category: "Vehicle", icon: "car", purchaseDate: "2022-03-10", purchaseValue: 285000000, usefulLife: 8, accumulatedDepreciation: 71250000, bookValue: 213750000, status: "Active" },
  { id: "FA-005", name: "Toyota HiAce Distribusi", category: "Vehicle", icon: "car", purchaseDate: "2023-01-20", purchaseValue: 520000000, usefulLife: 8, accumulatedDepreciation: 65000000, bookValue: 455000000, status: "Active" },
  { id: "FA-006", name: "Komputer Server & Jaringan", category: "IT Equipment", icon: "monitor", purchaseDate: "2023-08-05", purchaseValue: 85000000, usefulLife: 5, accumulatedDepreciation: 34000000, bookValue: 51000000, status: "Active" },
  { id: "FA-007", name: "Printer Label & Barcode", category: "IT Equipment", icon: "monitor", purchaseDate: "2024-02-15", purchaseValue: 15000000, usefulLife: 5, accumulatedDepreciation: 4500000, bookValue: 10500000, status: "Active" },
  { id: "FA-008", name: "Rak Gudang Steel", category: "Equipment", icon: "factory", purchaseDate: "2020-05-20", purchaseValue: 45000000, usefulLife: 10, accumulatedDepreciation: 22500000, bookValue: 22500000, status: "Active" },
  { id: "FA-009", name: "Laptop Office Lenovo", category: "IT Equipment", icon: "monitor", purchaseDate: "2022-09-01", purchaseValue: 24000000, usefulLife: 4, accumulatedDepreciation: 24000000, bookValue: 0, status: "Fully Depreciated" },
  { id: "FA-010", name: "Kendaraan Motor Operasional", category: "Vehicle", icon: "car", purchaseDate: "2021-04-10", purchaseValue: 18000000, usefulLife: 5, accumulatedDepreciation: 18000000, bookValue: 0, status: "Fully Depreciated" },
]

function formatIDR(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`
}

const totalPurchaseValue = assets.reduce((sum, a) => sum + a.purchaseValue, 0)
const totalAccumDep = assets.reduce((sum, a) => sum + a.accumulatedDepreciation, 0)
const totalBookValue = assets.reduce((sum, a) => sum + a.bookValue, 0)

const categoryIcons: Record<string, typeof Building> = {
  building: Building,
  equipment: Factory,
  car: Car,
  monitor: Monitor,
}

const statusBadge = (status: string) => {
  switch (status) {
    case "Active":
      return <Badge style={{ background: "#e8f5ed", color: "#2e844a", border: "1px solid #b8dcc5", fontSize: 11, fontWeight: 600, borderRadius: 4 }}>{status}</Badge>
    case "Fully Depreciated":
      return <Badge style={{ background: "#f4f6f9", color: "#444746", border: "1px solid #e0e0e0", fontSize: 11, fontWeight: 600, borderRadius: 4 }}>{status}</Badge>
    case "Disposed":
      return <Badge style={{ background: "#fef1f0", color: "#ea001e", border: "1px solid #fcc8c8", fontSize: 11, fontWeight: 600, borderRadius: 4 }}>{status}</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function FixedAssetPage() {
  const [categoryFilter, setCategoryFilter] = useState("All")

  const filteredAssets =
    categoryFilter === "All"
      ? assets
      : assets.filter((a) => a.category === categoryFilter)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>
            Fixed Asset Management
          </h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>
            Pengelolaan aset tetap SCW Distribution
          </p>
        </div>
        <div className="flex gap-2">
          <button
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "7px 14px", fontSize: 13, fontWeight: 500,
              background: "#fff", color: "#0176d3",
              border: "1px solid #d8d8d8", borderRadius: 6,
              cursor: "pointer", transition: "all 100ms",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#f0f7ff"; e.currentTarget.style.borderColor = "#0176d3" }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#d8d8d8" }}
          >
            <Download size={14} />
            Export
          </button>
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
            Add Asset
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4" style={{ padding: 16, borderLeft: "4px solid #0176d3" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Total Assets</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#0176d3", marginTop: 4 }}>{assets.length}</p>
            <p style={{ fontSize: 11, color: "#444746", marginTop: 2 }}>items registered</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4" style={{ padding: 16, borderLeft: "4px solid #7b4c9e" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Total Purchase Value</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#7b4c9e", marginTop: 4 }}>{formatIDR(totalPurchaseValue)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4" style={{ padding: 16, borderLeft: "4px solid #fe9339" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Accumulated Depreciation</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#9a6b00", marginTop: 4 }}>{formatIDR(totalAccumDep)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4" style={{ padding: 16, borderLeft: "4px solid #2e844a" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Net Book Value</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#2e844a", marginTop: 4 }}>{formatIDR(totalBookValue)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card>
        <CardContent className="p-4" style={{ padding: 16 }}>
          <div className="flex items-center gap-4">
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", marginBottom: 4 }}>Category</p>
              <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v ?? '')}>
                <SelectTrigger style={{ width: 200, height: 32, fontSize: 12, borderRadius: 6 }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  <SelectItem value="Building">Building</SelectItem>
                  <SelectItem value="Equipment">Equipment</SelectItem>
                  <SelectItem value="Vehicle">Vehicle</SelectItem>
                  <SelectItem value="IT Equipment">IT Equipment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Asset Register Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle style={{ fontSize: 15, fontWeight: 600, color: "#001526" }}>Asset Register</CardTitle>
          <CardDescription style={{ fontSize: 12, color: "#444746", marginTop: 2 }}>
            Daftar aset tetap beserta jadwal depresiasi
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Asset ID</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Name</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Category</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Purchase Date</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "right" }}>Purchase Value</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "right" }}>Accum. Depr.</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "right" }}>Book Value</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "center" }}>Useful Life</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssets.map((asset) => {
                const Icon = categoryIcons[asset.icon] || Building
                const deprPercentage = ((asset.accumulatedDepreciation / asset.purchaseValue) * 100).toFixed(0)

                return (
                  <TableRow key={asset.id} style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer", transition: "background 100ms" }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#f0f7ff"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <TableCell style={{ fontSize: 13, fontWeight: 500, color: "#001526" }}>{asset.id}</TableCell>
                    <TableCell style={{ fontSize: 13, color: "#001526" }}>
                      <div className="flex items-center gap-2">
                        <Icon size={14} style={{ color: "#444746" }} />
                        <span style={{ fontWeight: 500 }}>{asset.name}</span>
                      </div>
                    </TableCell>
                    <TableCell><span style={{ fontSize: 12, color: "#444746", background: "#f4f6f9", padding: "2px 8px", borderRadius: 4 }}>{asset.category}</span></TableCell>
                    <TableCell style={{ fontSize: 13, color: "#444746" }}>{asset.purchaseDate}</TableCell>
                    <TableCell style={{ fontSize: 13, fontFamily: "monospace", textAlign: "right", color: "#001526" }}>{formatIDR(asset.purchaseValue)}</TableCell>
                    <TableCell style={{ textAlign: "right" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                        <span style={{ fontSize: 13, fontFamily: "monospace", color: "#9a6b00" }}>{formatIDR(asset.accumulatedDepreciation)}</span>
                        <span style={{ fontSize: 11, color: "#444746" }}>{deprPercentage}%</span>
                      </div>
                    </TableCell>
                    <TableCell style={{ fontSize: 13, fontFamily: "monospace", textAlign: "right", fontWeight: 700, color: "#2e844a" }}>{formatIDR(asset.bookValue)}</TableCell>
                    <TableCell style={{ textAlign: "center", fontSize: 12, color: "#444746" }}>{asset.usefulLife} years</TableCell>
                    <TableCell>{statusBadge(asset.status)}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Depreciation Schedule Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle style={{ fontSize: 15, fontWeight: 600, color: "#001526" }}>Depreciation Summary by Category</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Category</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "center" }}>Count</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "right" }}>Purchase Value</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "right" }}>Accum. Depreciation</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "right" }}>Net Book Value</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "center" }}>Avg. Depr. Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {["Building", "Equipment", "Vehicle", "IT Equipment"].map((cat) => {
                const catAssets = assets.filter((a) => a.category === cat)
                const totalPV = catAssets.reduce((s, a) => s + a.purchaseValue, 0)
                const totalAD = catAssets.reduce((s, a) => s + a.accumulatedDepreciation, 0)
                const totalBV = catAssets.reduce((s, a) => s + a.bookValue, 0)
                const avgRate = totalPV > 0 ? ((totalAD / totalPV) * 100).toFixed(1) : "0"

                return (
                  <TableRow key={cat} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <TableCell style={{ fontSize: 13, fontWeight: 500, color: "#001526" }}>{cat}</TableCell>
                    <TableCell style={{ textAlign: "center", fontSize: 13, color: "#001526" }}>{catAssets.length}</TableCell>
                    <TableCell style={{ fontSize: 13, fontFamily: "monospace", textAlign: "right", color: "#001526" }}>{formatIDR(totalPV)}</TableCell>
                    <TableCell style={{ fontSize: 13, fontFamily: "monospace", textAlign: "right", color: "#9a6b00" }}>{formatIDR(totalAD)}</TableCell>
                    <TableCell style={{ fontSize: 13, fontFamily: "monospace", textAlign: "right", fontWeight: 700, color: "#2e844a" }}>{formatIDR(totalBV)}</TableCell>
                    <TableCell style={{ textAlign: "center", fontSize: 12, color: "#444746" }}>{avgRate}%</TableCell>
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
