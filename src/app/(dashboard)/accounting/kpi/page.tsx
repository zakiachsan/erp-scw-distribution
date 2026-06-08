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
import { Download, Users, TrendingUp, Award, Target } from "lucide-react"

interface KPIMetric {
  name: string
  weight: number
  score: number
}

interface EmployeeKPI {
  id: string
  name: string
  department: string
  position: string
  metrics: KPIMetric[]
  averageScore: number
}

const employees: EmployeeKPI[] = [
  {
    id: "EMP-001",
    name: "Budi Santoso",
    department: "Produksi",
    position: "Manager Produksi",
    metrics: [
      { name: "Production Target Achievement", weight: 40, score: 88 },
      { name: "Quality Control Pass Rate", weight: 30, score: 92 },
      { name: "Team Leadership & Development", weight: 30, score: 85 },
    ],
    averageScore: 88,
  },
  {
    id: "EMP-002",
    name: "Siti Rahayu",
    department: "Produksi",
    position: "Staff QC",
    metrics: [
      { name: "Defect Detection Rate", weight: 40, score: 95 },
      { name: "Report Accuracy & Timeliness", weight: 30, score: 90 },
      { name: "Process Improvement Initiative", weight: 30, score: 82 },
    ],
    averageScore: 89.3,
  },
  {
    id: "EMP-003",
    name: "Ahmad Fauzi",
    department: "Produksi",
    position: "Operator Mesin",
    metrics: [
      { name: "Daily Output Target", weight: 40, score: 75 },
      { name: "Machine Maintenance Compliance", weight: 30, score: 80 },
      { name: "Safety Protocol Adherence", weight: 30, score: 88 },
    ],
    averageScore: 80.3,
  },
  {
    id: "EMP-004",
    name: "Rudi Hartono",
    department: "Sales & Marketing",
    position: "Sales Executive",
    metrics: [
      { name: "Monthly Revenue Achievement", weight: 40, score: 92 },
      { name: "New Customer Acquisition", weight: 30, score: 78 },
      { name: "Customer Retention Rate", weight: 30, score: 85 },
    ],
    averageScore: 85.8,
  },
  {
    id: "EMP-005",
    name: "Dewi Lestari",
    department: "Sales & Marketing",
    position: "Marketing Specialist",
    metrics: [
      { name: "Campaign ROI", weight: 35, score: 72 },
      { name: "Social Media Engagement Growth", weight: 35, score: 68 },
      { name: "Lead Generation Target", weight: 30, score: 74 },
    ],
    averageScore: 71.2,
  },
  {
    id: "EMP-006",
    name: "Fajar Nugroho",
    department: "Warehouse & Logistik",
    position: "Warehouse Supervisor",
    metrics: [
      { name: "Inventory Accuracy", weight: 40, score: 93 },
      { name: "Order Fulfillment Speed", weight: 30, score: 85 },
      { name: "Damage/Loss Prevention", weight: 30, score: 90 },
    ],
    averageScore: 89.7,
  },
  {
    id: "EMP-007",
    name: "Maya Putri",
    department: "Administrasi",
    position: "Staff Administrasi",
    metrics: [
      { name: "Document Processing Accuracy", weight: 40, score: 88 },
      { name: "Response Time to Inquiries", weight: 30, score: 82 },
      { name: "Process Compliance", weight: 30, score: 78 },
    ],
    averageScore: 83.2,
  },
  {
    id: "EMP-008",
    name: "Hendra Wijaya",
    department: "IT & Systems",
    position: "IT Support Engineer",
    metrics: [
      { name: "System Uptime Maintained", weight: 40, score: 96 },
      { name: "Issue Resolution Time", weight: 30, score: 88 },
      { name: "User Satisfaction Score", weight: 30, score: 91 },
    ],
    averageScore: 92.0,
  },
  {
    id: "EMP-009",
    name: "Rina Susanti",
    department: "R&D",
    position: "Product Development",
    metrics: [
      { name: "New Product Pipeline", weight: 40, score: 65 },
      { name: "Lab Test Success Rate", weight: 30, score: 72 },
      { name: "Cost Efficiency in Testing", weight: 30, score: 58 },
    ],
    averageScore: 64.8,
  },
]

function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-600"
  if (score >= 60) return "text-amber-600"
  return "text-red-600"
}

function getScoreBg(score: number): string {
  if (score >= 80) return "bg-green-100 text-green-700"
  if (score >= 60) return "bg-amber-100 text-amber-700"
  return "bg-red-100 text-red-700"
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent"
  if (score >= 60) return "Good"
  return "Needs Improvement"
}

const departments = [
  "All Departments",
  "Produksi",
  "Sales & Marketing",
  "Warehouse & Logistik",
  "Administrasi",
  "IT & Systems",
  "R&D",
]

export default function KPIPage() {
  const [selectedDept, setSelectedDept] = useState("All Departments")

  const filteredEmployees =
    selectedDept === "All Departments"
      ? employees
      : employees.filter((e) => e.department === selectedDept)

  const avgScore =
    filteredEmployees.length > 0
      ? (
          filteredEmployees.reduce((s, e) => s + e.averageScore, 0) /
          filteredEmployees.length
        ).toFixed(1)
      : "0"

  const excellentCount = filteredEmployees.filter(
    (e) => e.averageScore >= 80
  ).length
  const goodCount = filteredEmployees.filter(
    (e) => e.averageScore >= 60 && e.averageScore < 80
  ).length
  const needsImprovementCount = filteredEmployees.filter(
    (e) => e.averageScore < 60
  ).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            KPI Dashboard
          </h1>
          <p className="text-slate-500">
            Key Performance Indicators per individu - 3 level KPI scoring
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedDept} onValueChange={(v) => setSelectedDept(v ?? '')}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {departments.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-indigo-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-600" />
              <p className="text-sm text-slate-500">Total Employees</p>
            </div>
            <p className="text-xl font-bold text-indigo-600">
              {filteredEmployees.length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              <p className="text-sm text-slate-500">Average Score</p>
            </div>
            <p className={`text-xl font-bold ${getScoreColor(parseFloat(avgScore))}`}>
              {avgScore}
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-green-600" />
              <p className="text-sm text-slate-500">Excellent (≥80)</p>
            </div>
            <p className="text-xl font-bold text-green-600">{excellentCount}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-amber-600" />
              <p className="text-sm text-slate-500">Needs Improvement (&lt;60)</p>
            </div>
            <p className="text-xl font-bold text-red-600">
              {needsImprovementCount}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <span className="text-slate-600">Excellent (Score ≥ 80)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-amber-500" />
          <span className="text-slate-600">Good (Score 60-79)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <span className="text-slate-600">Needs Improvement (Score &lt; 60)</span>
        </div>
      </div>

      {/* KPI Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-indigo-600" />
            Employee KPI Performance
          </CardTitle>
          <CardDescription>
            3 KPI metrics per employee dengan scoring 1-100
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>KPI Metric 1</TableHead>
                <TableHead className="text-center">Score 1</TableHead>
                <TableHead>KPI Metric 2</TableHead>
                <TableHead className="text-center">Score 2</TableHead>
                <TableHead>KPI Metric 3</TableHead>
                <TableHead className="text-center">Score 3</TableHead>
                <TableHead className="text-center">Average</TableHead>
                <TableHead>Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{emp.name}</p>
                      <p className="text-xs text-slate-400">{emp.position}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
                      {emp.department}
                    </Badge>
                  </TableCell>
                  {emp.metrics.map((metric, idx) => (
                    <TableCell key={idx} className="text-center">
                      <Badge className={getScoreBg(metric.score)}>
                        {metric.score}
                      </Badge>
                    </TableCell>
                  ))}
                  <TableCell className="text-center">
                    <span
                      className={`text-lg font-bold ${getScoreColor(
                        emp.averageScore
                      )}`}
                    >
                      {emp.averageScore.toFixed(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge className={getScoreBg(emp.averageScore)}>
                      {getScoreLabel(emp.averageScore)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detailed KPI Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Detailed KPI Breakdown</CardTitle>
          <CardDescription>
            Detail metric weights dan scores per employee
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredEmployees.map((emp) => (
              <Card key={emp.id} className="border border-slate-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-bold text-slate-900">{emp.name}</p>
                      <p className="text-xs text-slate-500">
                        {emp.department} - {emp.position}
                      </p>
                    </div>
                    <div
                      className={`text-2xl font-bold ${getScoreColor(
                        emp.averageScore
                      )}`}
                    >
                      {emp.averageScore.toFixed(1)}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {emp.metrics.map((metric, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-600 truncate max-w-[180px]">
                            {metric.name}
                          </span>
                          <span className="text-slate-500">
                            {metric.weight}% weight | Score: {metric.score}
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              metric.score >= 80
                                ? "bg-green-500"
                                : metric.score >= 60
                                ? "bg-amber-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${metric.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
