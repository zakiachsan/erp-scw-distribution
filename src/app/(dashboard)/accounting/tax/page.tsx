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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Download, Calculator, Users, Building2 } from "lucide-react"

interface Employee {
  id: string
  name: string
  position: string
  monthlySalary: number
  taxRate: number
  taxAmount: number
  status: "Paid" | "Pending"
}

interface Vendor {
  id: string
  name: string
  service: string
  fee: number
  taxRate: number
  taxAmount: number
  invoiceNo: string
  status: "Paid" | "Pending"
}

const employees: Employee[] = [
  { id: "EMP-001", name: "Budi Santoso", position: "Manager Produksi", monthlySalary: 15000000, taxRate: 15, taxAmount: 2250000, status: "Paid" },
  { id: "EMP-002", name: "Siti Rahayu", position: "Staff QC", monthlySalary: 8500000, taxRate: 5, taxAmount: 425000, status: "Paid" },
  { id: "EMP-003", name: "Ahmad Fauzi", position: "Operator Mesin", monthlySalary: 6500000, taxRate: 5, taxAmount: 325000, status: "Paid" },
  { id: "EMP-004", name: "Dewi Lestari", position: "Admin Gudang", monthlySalary: 7000000, taxRate: 5, taxAmount: 350000, status: "Pending" },
  { id: "EMP-005", name: "Rudi Hartono", position: "Sales Executive", monthlySalary: 12000000, taxRate: 15, taxAmount: 1800000, status: "Paid" },
  { id: "EMP-006", name: "Maya Putri", position: "Staff Administrasi", monthlySalary: 6000000, taxRate: 5, taxAmount: 300000, status: "Pending" },
]

const vendors: Vendor[] = [
  { id: "VEN-001", name: "PT NanoChem Indonesia", service: "Bahan Baku Nano Coating", fee: 125000000, taxRate: 2, taxAmount: 2500000, invoiceNo: "INV-NC-2026-0089", status: "Paid" },
  { id: "VEN-002", name: "CV Surya Pack", service: "Kemasan Botol & Label", fee: 45000000, taxRate: 2, taxAmount: 900000, invoiceNo: "INV-SP-2026-0134", status: "Paid" },
  { id: "VEN-003", name: "PT Freight Express", service: "Jasa Pengiriman", fee: 28500000, taxRate: 2, taxAmount: 570000, invoiceNo: "INV-FE-2026-0067", status: "Pending" },
  { id: "VEN-004", name: "PT Audit Konsultama", service: "Jasa Audit Akuntansi", fee: 15000000, taxRate: 2, taxAmount: 300000, invoiceNo: "INV-AK-2026-0012", status: "Paid" },
  { id: "VEN-005", name: "Bengkel Jaya Motor", service: "Servis Kendaraan Operasional", fee: 5500000, taxRate: 2, taxAmount: 110000, invoiceNo: "INV-BJ-2026-0023", status: "Pending" },
]

function formatIDR(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`
}

const statusBadge = (status: string) => {
  switch (status) {
    case "Paid":
      return <Badge style={{ background: "#e8f5ed", color: "#2e844a", border: "1px solid #b8dcc5", fontSize: 11, fontWeight: 600, borderRadius: 4 }}>{status}</Badge>
    case "Pending":
      return <Badge style={{ background: "#fef7e0", color: "#9a6b00", border: "1px solid #f9e0a0", fontSize: 11, fontWeight: 600, borderRadius: 4 }}>{status}</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function TaxPage() {
  const [taxMonth, setTaxMonth] = useState("2026-06")
  const [activeTab, setActiveTab] = useState("pph21")

  const totalPPh21 = employees.reduce((sum, e) => sum + e.taxAmount, 0)
  const totalPPh21Paid = employees.filter((e) => e.status === "Paid").reduce((sum, e) => sum + e.taxAmount, 0)
  const totalPPh21Pending = totalPPh21 - totalPPh21Paid

  const totalPPh23 = vendors.reduce((sum, v) => sum + v.taxAmount, 0)
  const totalPPh23Paid = vendors.filter((v) => v.status === "Paid").reduce((sum, v) => sum + v.taxAmount, 0)
  const totalPPh23Pending = totalPPh23 - totalPPh23Paid

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>
            Tax Management - PPh 21 & PPh 23
          </h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>
            Pengelolaan pajak penghasilan karyawan dan vendor
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={taxMonth} onValueChange={(v) => setTaxMonth(v ?? '')}>
            <SelectTrigger className="w-[180px]" style={{ height: 32, fontSize: 12, borderRadius: 6 }}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2026-06">Juni 2026</SelectItem>
              <SelectItem value="2026-05">Mei 2026</SelectItem>
              <SelectItem value="2026-04">April 2026</SelectItem>
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
          <CardContent className="p-4" style={{ padding: 16, borderLeft: "4px solid #0176d3" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Total PPh 21</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#0176d3", marginTop: 4 }}>{formatIDR(totalPPh21)}</p>
            <p style={{ fontSize: 11, color: "#444746", marginTop: 2 }}>{employees.length} karyawan</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4" style={{ padding: 16, borderLeft: "4px solid #2e844a" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Total PPh 23</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#2e844a", marginTop: 4 }}>{formatIDR(totalPPh23)}</p>
            <p style={{ fontSize: 11, color: "#444746", marginTop: 2 }}>{vendors.length} vendor</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4" style={{ padding: 16, borderLeft: "4px solid #2e844a" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Total Paid</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#2e844a", marginTop: 4 }}>{formatIDR(totalPPh21Paid + totalPPh23Paid)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4" style={{ padding: 16, borderLeft: "4px solid #fe9339" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Total Pending</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#9a6b00", marginTop: 4 }}>{formatIDR(totalPPh21Pending + totalPPh23Pending)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tax Calculation Form */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle style={{ fontSize: 15, fontWeight: 600, color: "#001526" }}>Tax Calculation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <Label style={{ fontSize: 12, fontWeight: 600, color: "#444746", marginBottom: 4, display: "block" }}>Tax Type</Label>
              <Select defaultValue="pph21">
                <SelectTrigger style={{ height: 32, fontSize: 12, borderRadius: 6 }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pph21">PPh 21 (Karyawan)</SelectItem>
                  <SelectItem value="pph23">PPh 23 (Vendor)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label style={{ fontSize: 12, fontWeight: 600, color: "#444746", marginBottom: 4, display: "block" }}>Monthly Salary / Fee (IDR)</Label>
              <Input type="number" placeholder="e.g. 15000000" style={{ height: 32, fontSize: 13, borderRadius: 6, border: "1px solid #d8d8d8" }} />
            </div>
            <div>
              <Label style={{ fontSize: 12, fontWeight: 600, color: "#444746", marginBottom: 4, display: "block" }}>Tax Rate (%)</Label>
              <Input type="number" placeholder="e.g. 15" defaultValue="15" style={{ height: 32, fontSize: 13, borderRadius: 6, border: "1px solid #d8d8d8" }} />
            </div>
            <div>
              <Label style={{ fontSize: 12, fontWeight: 600, color: "#444746", marginBottom: 4, display: "block" }}>Tax Amount</Label>
              <div style={{ display: "flex", alignItems: "center", height: 32, padding: "0 12px", borderRadius: 6, border: "1px solid #d8d8d8", background: "#f4f6f9", fontFamily: "monospace", fontWeight: 700, color: "#0176d3", fontSize: 13 }}>
                Rp 0
              </div>
            </div>
          </div>
          <button
            style={{
              display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12,
              padding: "7px 14px", fontSize: 13, fontWeight: 600,
              background: "#0176d3", color: "#fff",
              border: "1px solid #0176d3", borderRadius: 6,
              cursor: "pointer", transition: "all 100ms",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#014486"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#0176d3"}
          >
            <Calculator size={14} />
            Calculate Tax
          </button>
        </CardContent>
      </Card>

      {/* PPh 21 / PPh 23 Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v ?? '')}>
        <TabsList className="grid w-full grid-cols-2" style={{ background: "#f4f6f9", borderRadius: 6 }}>
          <TabsTrigger value="pph21" style={{ fontSize: 12, fontWeight: 500, borderRadius: 4 }}>
            <Users size={14} style={{ marginRight: 6 }} />
            PPh 21 - Employees ({employees.length})
          </TabsTrigger>
          <TabsTrigger value="pph23" style={{ fontSize: 12, fontWeight: 500, borderRadius: 4 }}>
            <Building2 size={14} style={{ marginRight: 6 }} />
            PPh 23 - Vendors ({vendors.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pph21">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle style={{ fontSize: 15, fontWeight: 600, color: "#001526" }}>PPh 21 Employee Tax Report</CardTitle>
              <CardDescription style={{ fontSize: 12, color: "#444746", marginTop: 2 }}>
                Pajak penghasilan pasal 21 untuk karyawan tetap
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Employee ID</TableHead>
                    <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Name</TableHead>
                    <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Position</TableHead>
                    <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "right" }}>Monthly Salary</TableHead>
                    <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "center" }}>Tax Rate</TableHead>
                    <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "right" }}>Tax Amount</TableHead>
                    <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((emp) => (
                    <TableRow key={emp.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <TableCell style={{ fontSize: 13, fontWeight: 500, color: "#001526" }}>{emp.id}</TableCell>
                      <TableCell style={{ fontSize: 13, color: "#001526" }}>{emp.name}</TableCell>
                      <TableCell style={{ fontSize: 13, color: "#444746" }}>{emp.position}</TableCell>
                      <TableCell style={{ fontSize: 13, fontFamily: "monospace", textAlign: "right", color: "#001526" }}>{formatIDR(emp.monthlySalary)}</TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <span style={{ fontSize: 12, color: "#444746", background: "#f4f6f9", padding: "2px 8px", borderRadius: 4 }}>{emp.taxRate}%</span>
                      </TableCell>
                      <TableCell style={{ fontSize: 13, fontFamily: "monospace", textAlign: "right", fontWeight: 700, color: "#0176d3" }}>{formatIDR(emp.taxAmount)}</TableCell>
                      <TableCell>{statusBadge(emp.status)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow style={{ borderTop: "2px solid #ecebea", background: "#eef4ff" }}>
                    <TableCell colSpan={5} style={{ fontSize: 13, fontWeight: 700, color: "#001526", padding: "8px 12px" }}>Total PPh 21</TableCell>
                    <TableCell style={{ fontSize: 13, fontFamily: "monospace", textAlign: "right", fontWeight: 700, color: "#0176d3", padding: "8px 12px" }}>{formatIDR(totalPPh21)}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pph23">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle style={{ fontSize: 15, fontWeight: 600, color: "#001526" }}>PPh 23 Vendor Tax Report</CardTitle>
              <CardDescription style={{ fontSize: 12, color: "#444746", marginTop: 2 }}>
                Pajak penghasilan pasal 23 untuk pembayaran jasa vendor
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Vendor ID</TableHead>
                    <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Vendor Name</TableHead>
                    <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Service</TableHead>
                    <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Invoice No</TableHead>
                    <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "right" }}>Fee Amount</TableHead>
                    <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "center" }}>Tax Rate</TableHead>
                    <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "right" }}>Tax Amount</TableHead>
                    <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendors.map((ven) => (
                    <TableRow key={ven.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <TableCell style={{ fontSize: 13, fontWeight: 500, color: "#001526" }}>{ven.id}</TableCell>
                      <TableCell style={{ fontSize: 13, color: "#001526" }}>{ven.name}</TableCell>
                      <TableCell style={{ fontSize: 13, color: "#444746", maxWidth: 180 }} className="truncate">{ven.service}</TableCell>
                      <TableCell style={{ fontSize: 13, color: "#444746" }}>{ven.invoiceNo}</TableCell>
                      <TableCell style={{ fontSize: 13, fontFamily: "monospace", textAlign: "right", color: "#001526" }}>{formatIDR(ven.fee)}</TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <span style={{ fontSize: 12, color: "#444746", background: "#f4f6f9", padding: "2px 8px", borderRadius: 4 }}>{ven.taxRate}%</span>
                      </TableCell>
                      <TableCell style={{ fontSize: 13, fontFamily: "monospace", textAlign: "right", fontWeight: 700, color: "#2e844a" }}>{formatIDR(ven.taxAmount)}</TableCell>
                      <TableCell>{statusBadge(ven.status)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow style={{ borderTop: "2px solid #ecebea", background: "#e8f5ed" }}>
                    <TableCell colSpan={6} style={{ fontSize: 13, fontWeight: 700, color: "#001526", padding: "8px 12px" }}>Total PPh 23</TableCell>
                    <TableCell style={{ fontSize: 13, fontFamily: "monospace", textAlign: "right", fontWeight: 700, color: "#2e844a", padding: "8px 12px" }}>{formatIDR(totalPPh23)}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
