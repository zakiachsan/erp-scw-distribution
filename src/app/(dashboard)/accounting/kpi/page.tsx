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
  if (score >= 80) return "#2e844a"
  if (score >= 60) return "#9a6b00"
  return "#ea001e"
}

function getScoreBg(score: number): string {
  if (score >= 80) return "#e8f5ed"
  if (score >= 60) return "#fef7e0"
  return "#fef1f0"
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
      ? (filteredEmployees.reduce((s, e) => s + e.averageScore, 0) / filteredEmployees.length).toFixed(1)
      : "0"

  const excellentCount = filteredEmployees.filter((e) => e.averageScore >= 80).length
  const goodCount = filteredEmployees.filter((e) => e.averageScore >= 60 && e.averageScore < 80).length
  const needsImprovementCount = filteredEmployees.filter((e) => e.averageScore < 60).length

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>
            KPI Dashboard
          </h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>
            Key Performance Indicators per individu - 3 level KPI scoring
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedDept} onValueChange={(v) => setSelectedDept(v ?? '')}>
            <SelectTrigger className="w-[200px]" style={{ height: 32, fontSize: 12, borderRadius: 6 }}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {departments.map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4" style={{ padding: 16, borderLeft: "4px solid #7b4c9e" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Total Employees</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#7b4c9e", marginTop: 4 }}>{filteredEmployees.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4" style={{ padding: 16, borderLeft: "4px solid #0176d3" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Average Score</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: getScoreColor(parseFloat(avgScore)), marginTop: 4 }}>{avgScore}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4" style={{ padding: 16, borderLeft: "4px solid #2e844a" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Excellent (≥80)</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#2e844a", marginTop: 4 }}>{excellentCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4" style={{ padding: 16, borderLeft: "4px solid #fe9339" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Needs Improvement (&lt;60)</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#ea001e", marginTop: 4 }}>{needsImprovementCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Legend */}
      <div className="flex gap-4" style={{ fontSize: 12 }}>
        <div className="flex items-center gap-2">
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#2e844a" }} />
          <span style={{ color: "#444746" }}>Excellent (Score ≥ 80)</span>
        </div>
        <div className="flex items-center gap-2">
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#fe9339" }} />
          <span style={{ color: "#444746" }}>Good (Score 60-79)</span>
        </div>
        <div className="flex items-center gap-2">
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ea001e" }} />
          <span style={{ color: "#444746" }}>Needs Improvement (Score &lt; 60)</span>
        </div>
      </div>

      {/* KPI Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle style={{ fontSize: 15, fontWeight: 600, color: "#001526" }}>Employee KPI Performance</CardTitle>
          <CardDescription style={{ fontSize: 12, color: "#444746", marginTop: 2 }}>
            3 KPI metrics per employee dengan scoring 1-100
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Employee</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Department</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>KPI Metric 1</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "center" }}>Score 1</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>KPI Metric 2</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "center" }}>Score 2</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>KPI Metric 3</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "center" }}>Score 3</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "center" }}>Average</TableHead>
                <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((emp) => (
                <TableRow key={emp.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <TableCell style={{ fontSize: 13, color: "#001526" }}>
                    <div>
                      <p style={{ fontWeight: 500 }}>{emp.name}</p>
                      <p style={{ fontSize: 11, color: "#444746", marginTop: 1 }}>{emp.position}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#0176d3", background: "#eef4ff", padding: "2px 8px", borderRadius: 4 }}>{emp.department}</span>
                  </TableCell>
                  {emp.metrics.map((metric, idx) => (
                    <TableCell key={idx} style={{ textAlign: "center" }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: getScoreColor(metric.score), background: getScoreBg(metric.score), padding: "2px 8px", borderRadius: 4 }}>
                        {metric.score}
                      </span>
                    </TableCell>
                  ))}
                  <TableCell style={{ textAlign: "center" }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: getScoreColor(emp.averageScore) }}>
                      {emp.averageScore.toFixed(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span style={{ fontSize: 11, fontWeight: 600, background: getScoreBg(emp.averageScore), color: getScoreColor(emp.averageScore), padding: "2px 8px", borderRadius: 4 }}>
                      {getScoreLabel(emp.averageScore)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detailed KPI Breakdown */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle style={{ fontSize: 15, fontWeight: 600, color: "#001526" }}>Detailed KPI Breakdown</CardTitle>
          <CardDescription style={{ fontSize: 12, color: "#444746", marginTop: 2 }}>
            Detail metric weights dan scores per employee
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredEmployees.map((emp) => (
              <Card key={emp.id} style={{ border: "1px solid #ecebea" }}>
                <CardContent className="p-4" style={{ padding: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                    <div>
                      <p style={{ fontWeight: 700, color: "#001526" }}>{emp.name}</p>
                      <p style={{ fontSize: 11, color: "#444746", marginTop: 1 }}>{emp.department} - {emp.position}</p>
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: getScoreColor(emp.averageScore) }}>
                      {emp.averageScore.toFixed(1)}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {emp.metrics.map((metric, idx) => (
                      <div key={idx}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 2 }}>
                          <span style={{ color: "#444746", maxWidth: 180 }} className="truncate">{metric.name}</span>
                          <span style={{ color: "#444746" }}>{metric.weight}% weight | Score: {metric.score}</span>
                        </div>
                        <div style={{ width: "100%", height: 8, background: "#f0f0f0", borderRadius: 4, overflow: "hidden" }}>
                          <div style={{
                            width: `${metric.score}%`, height: "100%",
                            background: metric.score >= 80 ? "#2e844a" : metric.score >= 60 ? "#fe9339" : "#ea001e",
                            borderRadius: 4, transition: "width 300ms",
                          }} />
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
