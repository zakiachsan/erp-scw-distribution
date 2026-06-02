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
import {
  Download,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
} from "lucide-react"
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
    totalAllocated > 0
      ? ((totalSpent / totalAllocated) * 100).toFixed(1)
      : "0"

  // Chart data: aggregate by division
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Budget Management
          </h1>
          <p className="text-slate-500">
            Pengelolaan anggaran per divisi SCW Distribution
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Total Budget</p>
            <p className="text-xl font-bold text-blue-600">
              {formatIDR(totalAllocated)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-indigo-500">
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Total Spent</p>
            <p className="text-xl font-bold text-indigo-600">
              {formatIDR(totalSpent)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Remaining</p>
            <p className="text-xl font-bold text-green-600">
              {formatIDR(totalRemaining)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Utilization</p>
            <p className="text-xl font-bold text-amber-600">
              {totalUtilization}%
            </p>
            <Progress value={parseFloat(totalUtilization)} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Over Budget Warning */}
      {overBudgetItems.length > 0 && (
        <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
          <div>
            <p className="font-medium text-red-800">
              {overBudgetItems.length} item mendekati/penggunaan melebihi budget
            </p>
            <p className="text-sm text-red-700">
              {overBudgetItems.map((b) => b.category).join(", ")}
            </p>
          </div>
        </div>
      )}

      {/* Filter + Chart */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Budget vs Actual by Division</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11 }}
                    angle={-20}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v) => `${v}M`}
                  />
                  <Tooltip
                    formatter={(value) => `Rp ${Number(value ?? 0).toLocaleString()} Juta`}
                  />
                  <Legend />
                  <Bar
                    dataKey="allocated"
                    name="Budget"
                    fill="#6366f1"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="spent"
                    name="Actual"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Division Selector</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedDivision} onValueChange={(v) => setSelectedDivision(v ?? '')}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {divisions.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Division utilization bars */}
            <div className="space-y-3">
              {divisions
                .filter((d) => d !== "All Divisions")
                .map((div) => {
                  const divItems = budgetData.filter((b) => b.division === div)
                  const divAllocated = divItems.reduce((s, b) => s + b.allocated, 0)
                  const divSpent = divItems.reduce((s, b) => s + b.spent, 0)
                  const pct = divAllocated > 0 ? (divSpent / divAllocated) * 100 : 0

                  return (
                    <div key={div}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">{div}</span>
                        <span className="font-mono text-slate-500">
                          {pct.toFixed(0)}%
                        </span>
                      </div>
                      <Progress
                        value={pct}
                        className={`h-2 ${
                          pct > 95
                            ? "bg-red-200"
                            : pct > 80
                            ? "bg-amber-200"
                            : ""
                        }`}
                      />
                    </div>
                  )
                })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Allocation Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Budget Allocation - {selectedDivision}
          </CardTitle>
          <CardDescription>
            Detail anggaran per kategori divisi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Division</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Allocated</TableHead>
                <TableHead className="text-right">Spent</TableHead>
                <TableHead className="text-right">Remaining</TableHead>
                <TableHead className="text-center">Utilization</TableHead>
                <TableHead className="w-[200px]">Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBudget.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{item.division}</TableCell>
                  <TableCell className="text-slate-600">{item.category}</TableCell>
                  <TableCell className="text-right font-mono">
                    {formatIDR(item.allocated)}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {formatIDR(item.spent)}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    <span
                      className={
                        item.remaining === 0
                          ? "text-slate-400"
                          : "text-green-600"
                      }
                    >
                      {formatIDR(item.remaining)}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        item.utilization > 95
                          ? "bg-red-100 text-red-700 hover:bg-red-100"
                          : item.utilization > 80
                          ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                          : "bg-green-100 text-green-700 hover:bg-green-100"
                      }
                    >
                      {item.utilization}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Progress
                      value={item.utilization}
                      className={`h-2 ${
                        item.utilization > 95
                          ? "bg-red-200 [&>div]:bg-red-500"
                          : item.utilization > 80
                          ? "bg-amber-200 [&>div]:bg-amber-500"
                          : ""
                      }`}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {/* Totals Row */}
              <TableRow className="border-t-2 border-slate-300 bg-slate-50">
                <TableCell colSpan={2} className="font-bold text-slate-700">
                  Total
                </TableCell>
                <TableCell className="text-right font-mono font-bold text-slate-700">
                  {formatIDR(totalAllocated)}
                </TableCell>
                <TableCell className="text-right font-mono font-bold text-slate-700">
                  {formatIDR(totalSpent)}
                </TableCell>
                <TableCell className="text-right font-mono font-bold text-green-600">
                  {formatIDR(totalRemaining)}
                </TableCell>
                <TableCell className="text-center font-bold">
                  {totalUtilization}%
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
