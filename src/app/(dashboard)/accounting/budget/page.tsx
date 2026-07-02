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
import { Progress } from "@/components/ui/progress"
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
import { Download, AlertTriangle } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface BudgetItem {
  division: string
  category: string
  allocated: number
  spent: number
  remaining: number
  utilization: number
}

const divisions = [
  "All Divisions",
  "Produksi",
  "Sales & Marketing",
  "Warehouse & Logistik",
  "Administrasi",
  "IT & Systems",
  "R&D",
]

const budgetData: BudgetItem[] = [
  { division: "Produksi", category: "Bahan Baku", allocated: 250000000, spent: 195000000, remaining: 55000000, utilization: 78 },
  { division: "Produksi", category: "Gaji Karyawan", allocated: 125000000, spent: 125000000, remaining: 0, utilization: 100 },
  { division: "Produksi", category: "Listrik & Air", allocated: 15000000, spent: 12500000, remaining: 2500000, utilization: 83 },
  { division: "Produksi", category: "Maintenance Mesin", allocated: 25000000, spent: 18000000, remaining: 7000000, utilization: 72 },
  { division: "Sales & Marketing", category: "Iklan Digital", allocated: 50000000, spent: 38000000, remaining: 12000000, utilization: 76 },
  { division: "Sales & Marketing", category: "Event & Sponsorship", allocated: 35000000, spent: 28500000, remaining: 6500000, utilization: 81 },
  { division: "Sales & Marketing", category: "Sales Commission", allocated: 75000000, spent: 62000000, remaining: 13000000, utilization: 83 },
  { division: "Sales & Marketing", category: "Travel & Entertainment", allocated: 20000000, spent: 14500000, remaining: 5500000, utilization: 73 },
  { division: "Warehouse & Logistik", category: "Sewa Gudang", allocated: 45000000, spent: 45000000, remaining: 0, utilization: 100 },
  { division: "Warehouse & Logistik", category: "Pengiriman & Freight", allocated: 60000000, spent: 52000000, remaining: 8000000, utilization: 87 },
  { division: "Warehouse & Logistik", category: "Perlengkapan Gudang", allocated: 15000000, spent: 9500000, remaining: 5500000, utilization: 63 },
  { division: "Administrasi", category: "Gaji Karyawan", allocated: 85000000, spent: 85000000, remaining: 0, utilization: 100 },
  { division: "Administrasi", category: "Perlengkapan Kantor", allocated: 10000000, spent: 7500000, remaining: 2500000, utilization: 75 },
  { division: "Administrasi", category: "Software & Lisensi", allocated: 25000000, spent: 18000000, remaining: 7000000, utilization: 72 },
  { division: "IT & Systems", category: "Hardware & Server", allocated: 40000000, spent: 32000000, remaining: 8000000, utilization: 80 },
  { division: "IT & Systems", category: "Cloud & Hosting", allocated: 18000000, spent: 14500000, remaining: 3500000, utilization: 81 },
  { division: "R&D", category: "Produk Development", allocated: 60000000, spent: 42000000, remaining: 18000000, utilization: 70 },
  { division: "R&D", category: "Lab & Testing", allocated: 30000000, spent: 21000000, remaining: 9000000, utilization: 70 },
]

function formatIDR(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`
}

const utilizationBadge = (utilization: number) => {
  if (utilization > 95)
    return <Badge style={{ background: "#fef1f0", color: "#ea001e", border: "1px solid #fcc8c8", fontSize: 11, fontWeight: 600, borderRadius: 4 }}>{utilization}%</Badge>
  if (utilization > 80)
    return <Badge style={{ background: "#fef7e0", color: "#9a6b00", border: "1px solid #f9e0a0", fontSize: 11, fontWeight: 600, borderRadius: 4 }}>{utilization}%</Badge>
  return <Badge style={{ background: "#e8f5ed", color: "#2e844a", border: "1px solid #b8dcc5", fontSize: 11, fontWeight: 600, borderRadius: 4 }}>{utilization}%</Badge>
}

const progressColor = (utilization: number) => {
  if (utilization > 95) return { bg: "#fcc8c8", fg: "#ea001e" }
  if (utilization > 80) return { bg: "#f9e0a0", fg: "#fe9339" }
  return { bg: "#e8f5ed", fg: "#2e844a" }
}

export default function BudgetPage() {
  const [selectedDivision, setSelectedDivision] = useState("All Divisions")

  const filteredBudget =
    selectedDivision === "All Divisions"
      ? budgetData
      : budgetData.filter((b) => b.division === selectedDivision)

  const totalAllocated = filteredBudget.reduce((s, b) => s + b.allocated, 0)
  const totalSpent = filteredBudget.reduce((s, b) => s + b.spent, 0)
  const totalRemaining = totalAllocated - totalSpent
  const totalUtilization =
    totalAllocated > 0 ? ((totalSpent / totalAllocated) * 100).toFixed(1) : "0"

  const chartData = divisions
    .filter((d) => d !== "All Divisions")
    .map((div) => {
      const divItems = budgetData.filter((b) => b.division === div)
      return {
        name: div.length > 12 ? div.substring(0, 12) + "..." : div,
        allocated: divItems.reduce((s, b) => s + b.allocated, 0) / 1000000,
        spent: divItems.reduce((s, b) => s + b.spent, 0) / 1000000,
      }
    })

  const overBudgetItems = filteredBudget.filter((b) => b.utilization > 95)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>
            Budget Management
          </h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>
            Pengelolaan anggaran per divisi SCW Distribution
          </p>
        </div>
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
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4" style={{ padding: 16, borderLeft: "4px solid #0176d3" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Total Budget</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#0176d3", marginTop: 4 }}>{formatIDR(totalAllocated)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4" style={{ padding: 16, borderLeft: "4px solid #7b4c9e" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Total Spent</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#7b4c9e", marginTop: 4 }}>{formatIDR(totalSpent)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4" style={{ padding: 16, borderLeft: "4px solid #2e844a" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Remaining</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#2e844a", marginTop: 4 }}>{formatIDR(totalRemaining)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4" style={{ padding: 16, borderLeft: "4px solid #fe9339" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Utilization</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#9a6b00", marginTop: 4 }}>{totalUtilization}%</p>
            <Progress value={parseFloat(totalUtilization)} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Over Budget Warning */}
      {overBudgetItems.length > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#fef1f0", border: "1px solid #fcc8c8", borderRadius: 8, padding: 16 }}>
          <AlertTriangle size={20} style={{ color: "#ea001e", flexShrink: 0 }} />
          <div>
            <p style={{ fontWeight: 500, color: "#ea001e" }}>
              {overBudgetItems.length} item mendekati/penggunaan melebihi budget
            </p>
            <p style={{ fontSize: 12, color: "#ea001e" }}>
              {overBudgetItems.map((b) => b.category).join(", ")}
            </p>
          </div>
        </div>
      )}

      {/* Filter + Chart */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle style={{ fontSize: 15, fontWeight: 600, color: "#001526" }}>Budget vs Actual by Division</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ecebea" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#444746" }} angle={-20} textAnchor="end" height={60} />
                  <YAxis tick={{ fontSize: 11, fill: "#444746" }} tickFormatter={(v) => `${v}M`} />
                  <Tooltip formatter={(value) => `Rp ${Number(value ?? 0).toLocaleString()} Juta`} />
                  <Legend />
                  <Bar dataKey="allocated" name="Budget" fill="#0176d3" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="spent" name="Actual" fill="#7b4c9e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle style={{ fontSize: 15, fontWeight: 600, color: "#001526" }}>Division Selector</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedDivision} onValueChange={(v) => setSelectedDivision(v ?? '')}>
              <SelectTrigger style={{ height: 32, fontSize: 12, borderRadius: 6 }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {divisions.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="space-y-3">
              {divisions.filter((d) => d !== "All Divisions").map((div) => {
                const divItems = budgetData.filter((b) => b.division === div)
                const divAllocated = divItems.reduce((s, b) => s + b.allocated, 0)
                const divSpent = divItems.reduce((s, b) => s + b.spent, 0)
                const pct = divAllocated > 0 ? (divSpent / divAllocated) * 100 : 0
                const colors = progressColor(pct)

                return (
                  <div key={div}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: "#444746" }}>{div}</span>
                      <span style={{ fontFamily: "monospace", color: "#444746" }}>{pct.toFixed(0)}%</span>
                    </div>
                    <div style={{ width: "100%", height: 8, background: colors.bg, borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: colors.fg, borderRadius: 4, transition: "width 300ms" }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Allocation Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle style={{ fontSize: 15, fontWeight: 600, color: "#001526" }}>
            Budget Allocation - {selectedDivision}
          </CardTitle>
          <CardDescription style={{ fontSize: 12, color: "#444746", marginTop: 2 }}>
            Detail anggaran per kategori divisi
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Division</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Category</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "right" }}>Allocated</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "right" }}>Spent</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "right" }}>Remaining</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "center" }}>Utilization</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBudget.map((item, idx) => {
                const colors = progressColor(item.utilization)
                return (
                  <TableRow key={idx} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <TableCell style={{ fontSize: 13, fontWeight: 500, color: "#001526" }}>{item.division}</TableCell>
                    <TableCell style={{ fontSize: 13, color: "#444746" }}>{item.category}</TableCell>
                    <TableCell style={{ fontSize: 13, fontFamily: "monospace", textAlign: "right", color: "#001526" }}>{formatIDR(item.allocated)}</TableCell>
                    <TableCell style={{ fontSize: 13, fontFamily: "monospace", textAlign: "right", color: "#001526" }}>{formatIDR(item.spent)}</TableCell>
                    <TableCell style={{ fontSize: 13, fontFamily: "monospace", textAlign: "right", color: item.remaining === 0 ? "#444746" : "#2e844a" }}>
                      {item.remaining === 0 ? "-" : formatIDR(item.remaining)}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>{utilizationBadge(item.utilization)}</TableCell>
                    <TableCell>
                      <div style={{ width: "100%", height: 8, background: colors.bg, borderRadius: 4, overflow: "hidden" }}>
                        <div style={{ width: `${item.utilization}%`, height: "100%", background: colors.fg, borderRadius: 4 }} />
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
              {/* Totals Row */}
              <TableRow style={{ borderTop: "2px solid #ecebea", background: "#f4f6f9" }}>
                <TableCell colSpan={2} style={{ fontSize: 13, fontWeight: 700, color: "#001526", padding: "8px 12px" }}>Total</TableCell>
                <TableCell style={{ fontSize: 13, fontFamily: "monospace", textAlign: "right", fontWeight: 700, color: "#001526", padding: "8px 12px" }}>{formatIDR(totalAllocated)}</TableCell>
                <TableCell style={{ fontSize: 13, fontFamily: "monospace", textAlign: "right", fontWeight: 700, color: "#001526", padding: "8px 12px" }}>{formatIDR(totalSpent)}</TableCell>
                <TableCell style={{ fontSize: 13, fontFamily: "monospace", textAlign: "right", fontWeight: 700, color: "#2e844a", padding: "8px 12px" }}>{formatIDR(totalRemaining)}</TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: 700, fontSize: 13, padding: "8px 12px" }}>{totalUtilization}%</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
