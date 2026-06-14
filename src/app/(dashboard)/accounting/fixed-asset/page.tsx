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
import { Label } from "@/components/ui/label"
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

export default function FixedAssetPage() {
  const [categoryFilter, setCategoryFilter] = useState("All")

  const filteredAssets =
    categoryFilter === "All"
      ? assets
      : assets.filter((a) => a.category === categoryFilter)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Fixed Asset Management
          </h1>
          <p className="text-slate-500">
            Pengelolaan aset tetap SCW Distribution
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Asset
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Total Assets</p>
            <p className="text-xl font-bold text-blue-600">{assets.length}</p>
            <p className="text-xs text-slate-400">items registered</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-indigo-500">
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Total Purchase Value</p>
            <p className="text-xl font-bold text-indigo-600">
              {formatIDR(totalPurchaseValue)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Accumulated Depreciation</p>
            <p className="text-xl font-bold text-amber-600">
              {formatIDR(totalAccumDep)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Net Book Value</p>
            <p className="text-xl font-bold text-green-600">
              {formatIDR(totalBookValue)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="space-y-1">
              <Label>Category</Label>
              <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v ?? '')}>
                <SelectTrigger className="w-[200px]">
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
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Building className="h-5 w-5 text-indigo-600" />
            Asset Register
          </CardTitle>
          <CardDescription>
            Daftar aset tetap beserta jadwal depresiasi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Purchase Date</TableHead>
                <TableHead className="text-right">Purchase Value</TableHead>
                <TableHead className="text-right">Accum. Depr.</TableHead>
                <TableHead className="text-right">Book Value</TableHead>
                <TableHead className="text-center">Useful Life</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssets.map((asset) => {
                const Icon = categoryIcons[asset.icon] || Building
                const deprPercentage = (
                  (asset.accumulatedDepreciation / asset.purchaseValue) *
                  100
                ).toFixed(0)

                return (
                  <TableRow key={asset.id}>
                    <TableCell className="font-sans text-sm font-medium">
                      {asset.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-slate-400" />
                        <span className="font-medium">{asset.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100">
                        {asset.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {asset.purchaseDate}
                    </TableCell>
                    <TableCell className="text-right font-sans">
                      {formatIDR(asset.purchaseValue)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col items-end">
                        <span className="font-sans text-sm text-amber-600">
                          {formatIDR(asset.accumulatedDepreciation)}
                        </span>
                        <span className="text-xs text-slate-400">
                          {deprPercentage}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-sans font-bold text-green-700">
                      {formatIDR(asset.bookValue)}
                    </TableCell>
                    <TableCell className="text-center text-sm text-slate-600">
                      {asset.usefulLife} years
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          asset.status === "Active"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : asset.status === "Fully Depreciated"
                            ? "bg-slate-100 text-slate-700 hover:bg-slate-100"
                            : "bg-red-100 text-red-700 hover:bg-red-100"
                        }
                      >
                        {asset.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Depreciation Schedule Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-amber-600" />
            Depreciation Summary by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead className="text-center">Count</TableHead>
                <TableHead className="text-right">Purchase Value</TableHead>
                <TableHead className="text-right">Accum. Depreciation</TableHead>
                <TableHead className="text-right">Net Book Value</TableHead>
                <TableHead className="text-center">Avg. Depr. Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {["Building", "Equipment", "Vehicle", "IT Equipment"].map(
                (cat) => {
                  const catAssets = assets.filter((a) => a.category === cat)
                  const totalPV = catAssets.reduce((s, a) => s + a.purchaseValue, 0)
                  const totalAD = catAssets.reduce((s, a) => s + a.accumulatedDepreciation, 0)
                  const totalBV = catAssets.reduce((s, a) => s + a.bookValue, 0)
                  const avgRate = totalPV > 0 ? ((totalAD / totalPV) * 100).toFixed(1) : "0"

                  return (
                    <TableRow key={cat}>
                      <TableCell className="font-medium">{cat}</TableCell>
                      <TableCell className="text-center">{catAssets.length}</TableCell>
                      <TableCell className="text-right font-sans">
                        {formatIDR(totalPV)}
                      </TableCell>
                      <TableCell className="text-right font-sans text-amber-600">
                        {formatIDR(totalAD)}
                      </TableCell>
                      <TableCell className="text-right font-sans font-bold text-green-700">
                        {formatIDR(totalBV)}
                      </TableCell>
                      <TableCell className="text-center text-sm text-slate-600">
                        {avgRate}%
                      </TableCell>
                    </TableRow>
                  )
                }
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
