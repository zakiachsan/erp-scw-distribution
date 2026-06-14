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
import { Download, Calculator, FileText, Users, Building2 } from "lucide-react"

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

export default function TaxPage() {
  const [taxMonth, setTaxMonth] = useState("2026-06")
  const [activeTab, setActiveTab] = useState("pph21")

  // PPh 21 Summary
  const totalPPh21 = employees.reduce((sum, e) => sum + e.taxAmount, 0)
  const totalPPh21Paid = employees
    .filter((e) => e.status === "Paid")
    .reduce((sum, e) => sum + e.taxAmount, 0)
  const totalPPh21Pending = totalPPh21 - totalPPh21Paid

  // PPh 23 Summary
  const totalPPh23 = vendors.reduce((sum, v) => sum + v.taxAmount, 0)
  const totalPPh23Paid = vendors
    .filter((v) => v.status === "Paid")
    .reduce((sum, v) => sum + v.taxAmount, 0)
  const totalPPh23Pending = totalPPh23 - totalPPh23Paid

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Tax Management - PPh 21 & PPh 23
          </h1>
          <p className="text-slate-500">
            Pengelolaan pajak penghasilan karyawan dan vendor
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={taxMonth} onValueChange={(v) => setTaxMonth(v ?? '')}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2026-06">Juni 2026</SelectItem>
              <SelectItem value="2026-05">Mei 2026</SelectItem>
              <SelectItem value="2026-04">April 2026</SelectItem>
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
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <p className="text-sm text-slate-500">Total PPh 21</p>
            </div>
            <p className="text-xl font-bold text-blue-600">{formatIDR(totalPPh21)}</p>
            <p className="text-xs text-slate-400">{employees.length} karyawan</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-green-600" />
              <p className="text-sm text-slate-500">Total PPh 23</p>
            </div>
            <p className="text-xl font-bold text-green-600">{formatIDR(totalPPh23)}</p>
            <p className="text-xs text-slate-400">{vendors.length} vendor</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Total Paid</p>
            <p className="text-xl font-bold text-emerald-600">
              {formatIDR(totalPPh21Paid + totalPPh23Paid)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Total Pending</p>
            <p className="text-xl font-bold text-amber-600">
              {formatIDR(totalPPh21Pending + totalPPh23Pending)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tax Calculation Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calculator className="h-5 w-5 text-indigo-600" />
            Tax Calculation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Tax Type</Label>
              <Select defaultValue="pph21">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pph21">PPh 21 (Karyawan)</SelectItem>
                  <SelectItem value="pph23">PPh 23 (Vendor)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Monthly Salary / Fee (IDR)</Label>
              <Input type="number" placeholder="e.g. 15000000" />
            </div>
            <div className="space-y-2">
              <Label>Tax Rate (%)</Label>
              <Input type="number" placeholder="e.g. 15" defaultValue="15" />
            </div>
            <div className="space-y-2">
              <Label>Tax Amount</Label>
              <div className="flex items-center h-10 px-3 rounded-md border bg-slate-50 font-sans font-bold text-indigo-700">
                Rp 0
              </div>
            </div>
          </div>
          <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700">
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Tax
          </Button>
        </CardContent>
      </Card>

      {/* PPh 21 / PPh 23 Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v ?? '')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pph21" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            PPh 21 - Employees ({employees.length})
          </TabsTrigger>
          <TabsTrigger value="pph23" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            PPh 23 - Vendors ({vendors.length})
          </TabsTrigger>
        </TabsList>

        {/* PPh 21 Tab */}
        <TabsContent value="pph21">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">PPh 21 Employee Tax Report</CardTitle>
              <CardDescription>
                Pajak penghasilan pasal 21 untuk karyawan tetap
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead className="text-right">Monthly Salary</TableHead>
                    <TableHead className="text-center">Tax Rate</TableHead>
                    <TableHead className="text-right">Tax Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((emp) => (
                    <TableRow key={emp.id}>
                      <TableCell className="font-sans text-sm">{emp.id}</TableCell>
                      <TableCell className="font-medium">{emp.name}</TableCell>
                      <TableCell className="text-slate-600">{emp.position}</TableCell>
                      <TableCell className="text-right font-sans">
                        {formatIDR(emp.monthlySalary)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-slate-100 text-slate-700">
                          {emp.taxRate}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-sans font-bold text-blue-700">
                        {formatIDR(emp.taxAmount)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            emp.status === "Paid"
                              ? "bg-green-100 text-green-700 hover:bg-green-100"
                              : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                          }
                        >
                          {emp.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="border-t-2 border-slate-300 bg-blue-50">
                    <TableCell colSpan={5} className="font-bold text-slate-700">
                      Total PPh 21
                    </TableCell>
                    <TableCell className="text-right font-sans font-bold text-blue-700">
                      {formatIDR(totalPPh21)}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PPh 23 Tab */}
        <TabsContent value="pph23">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">PPh 23 Vendor Tax Report</CardTitle>
              <CardDescription>
                Pajak penghasilan pasal 23 untuk pembayaran jasa vendor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor ID</TableHead>
                    <TableHead>Vendor Name</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Invoice No</TableHead>
                    <TableHead className="text-right">Fee Amount</TableHead>
                    <TableHead className="text-center">Tax Rate</TableHead>
                    <TableHead className="text-right">Tax Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendors.map((ven) => (
                    <TableRow key={ven.id}>
                      <TableCell className="font-sans text-sm">{ven.id}</TableCell>
                      <TableCell className="font-medium">{ven.name}</TableCell>
                      <TableCell className="text-slate-600 max-w-[180px] truncate">
                        {ven.service}
                      </TableCell>
                      <TableCell className="font-sans text-sm">{ven.invoiceNo}</TableCell>
                      <TableCell className="text-right font-sans">
                        {formatIDR(ven.fee)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-slate-100 text-slate-700">
                          {ven.taxRate}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-sans font-bold text-green-700">
                        {formatIDR(ven.taxAmount)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            ven.status === "Paid"
                              ? "bg-green-100 text-green-700 hover:bg-green-100"
                              : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                          }
                        >
                          {ven.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="border-t-2 border-slate-300 bg-green-50">
                    <TableCell colSpan={6} className="font-bold text-slate-700">
                      Total PPh 23
                    </TableCell>
                    <TableCell className="text-right font-sans font-bold text-green-700">
                      {formatIDR(totalPPh23)}
                    </TableCell>
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
