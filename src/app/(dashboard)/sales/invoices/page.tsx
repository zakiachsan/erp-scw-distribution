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
import {
  Eye,
  Filter,
  FileText,
  DollarSign,
  Plus,
  AlertTriangle,
} from "lucide-react"
import { customers } from "@/lib/sales-data"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Invoice {
  id: string
  soRef: string
  customer: string
  status: "Draft" | "Sent" | "Paid" | "Overdue"
  amount: number
  dueDate: string
  issueDate: string
}

const invoices: Invoice[] = [
  { id: "INV-2026-038", soRef: "SO-2026-045", customer: "PT Autogloss Indonesia", status: "Draft", amount: 8500000, dueDate: "2026-06-15", issueDate: "2026-06-01" },
  { id: "INV-2026-037", soRef: "SO-2026-044", customer: "CV Ceramic Pro JKT", status: "Sent", amount: 6200000, dueDate: "2026-06-13", issueDate: "2026-05-30" },
  { id: "INV-2026-036", soRef: "SO-2026-043", customer: "UD Shinemax", status: "Paid", amount: 4500000, dueDate: "2026-06-11", issueDate: "2026-05-28" },
  { id: "INV-2026-035", soRef: "SO-2026-042", customer: "PT DetailWorks BDG", status: "Paid", amount: 7200000, dueDate: "2026-06-08", issueDate: "2026-05-25" },
  { id: "INV-2026-034", soRef: "SO-2026-041", customer: "PT Autogloss Indonesia", status: "Paid", amount: 8500000, dueDate: "2026-06-03", issueDate: "2026-05-20" },
  { id: "INV-2026-033", soRef: "SO-2026-040", customer: "CV ProShine SBY", status: "Overdue", amount: 5800000, dueDate: "2026-05-28", issueDate: "2026-05-18" },
  { id: "INV-2026-032", soRef: "SO-2026-038", customer: "GlossUp Bali", status: "Paid", amount: 6200000, dueDate: "2026-05-25", issueDate: "2026-05-12" },
  { id: "INV-2026-031", soRef: "SO-2026-037", customer: "DetailPro Semarang", status: "Paid", amount: 2800000, dueDate: "2026-05-23", issueDate: "2026-05-10" },
]

const statusConfig = {
  Draft: { label: "Draft", className: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400" },
  Sent: { label: "Sent", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  Paid: { label: "Paid", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" },
  Overdue: { label: "Overdue", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
}

const formatIDR = (val: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(val)

function getCustomerCreditInfo(customerName: string) {
  return customers.find(
    (c) =>
      c.name === customerName ||
      c.company === customerName ||
      customerName.includes(c.name) ||
      customerName.includes(c.company)
  )
}

function CreditInfoBadge({ customerName }: { customerName: string }) {
  const customer = getCustomerCreditInfo(customerName)
  if (!customer) return <span className="text-xs text-muted-foreground">—</span>

  const lowCredit = customer.remainingCredit < customer.creditLimit * 0.2
  const warningCredit = customer.remainingCredit < customer.creditLimit * 0.5 && !lowCredit

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <span className="inline-flex cursor-default items-center gap-1 text-xs">
            {lowCredit && <AlertTriangle className="h-3 w-3 text-red-500" />}
            {warningCredit && <AlertTriangle className="h-3 w-3 text-amber-500" />}
            <span
              className={
                lowCredit
                  ? "text-red-600 font-medium"
                  : warningCredit
                  ? "text-amber-600 font-medium"
                  : "text-muted-foreground"
              }
            >
              {formatIDR(customer.remainingCredit)}
            </span>
          </span>
        </TooltipTrigger>
        <TooltipContent side="left" className="text-xs">
          <div className="space-y-1">
            <p>
              <strong>Customer:</strong> {customer.name}
            </p>
            <p>
              <strong>Credit Limit:</strong> {formatIDR(customer.creditLimit)}
            </p>
            <p>
              <strong>Remaining:</strong> {formatIDR(customer.remainingCredit)}
            </p>
            <p>
              <strong>Tier:</strong> {customer.tier}
            </p>
            {lowCredit && (
              <p className="text-red-500 font-medium">⚠ Sisa kredit menipis!</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default function InvoiceListPage() {
  const [statusFilter, setStatusFilter] = useState("All")

  const filtered = useMemo(() => {
    return invoices.filter((i) => statusFilter === "All" || i.status === statusFilter)
  }, [statusFilter])

  const totalAmount = filtered.reduce((sum, i) => sum + i.amount, 0)
  const paidAmount = invoices.filter((i) => i.status === "Paid").reduce((sum, i) => sum + i.amount, 0)
  const overdueAmount = invoices.filter((i) => i.status === "Overdue").reduce((sum, i) => sum + i.amount, 0)

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground">
            Manage invoices and track payment status
          </p>
        </div>
        <Link href="/sales/invoices/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Invoice
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                <FileText className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Invoices</p>
                <p className="text-2xl font-bold">Rp {(totalAmount / 1000000).toFixed(1)}M</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <DollarSign className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Paid</p>
                <p className="text-2xl font-bold text-emerald-600">Rp {(paidAmount / 1000000).toFixed(1)}M</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                <DollarSign className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold text-red-600">Rp {(overdueAmount / 1000000).toFixed(1)}M</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Invoice List</CardTitle>
              <CardDescription>
                {filtered.length} invoice{filtered.length !== 1 ? "s" : ""} found
              </CardDescription>
            </div>
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "All")}>
              <SelectTrigger className="w-44">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Sent">Sent</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>SO Ref</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Credit Remaining</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-sans text-xs font-medium">{invoice.id}</TableCell>
                  <TableCell className="font-sans text-xs">{invoice.soRef}</TableCell>
                  <TableCell>{invoice.customer}</TableCell>
                  <TableCell>{invoice.issueDate}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusConfig[invoice.status].className}>
                      {statusConfig[invoice.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    Rp {(invoice.amount / 1000000).toFixed(1)}M
                  </TableCell>
                  <TableCell className="text-right">
                    <CreditInfoBadge customerName={invoice.customer} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/sales/invoices/${invoice.id}`}>
                      <Button variant="ghost" size="icon-sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
