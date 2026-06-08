"use client"

import React, { useState } from "react"
import {
  Activity,
  Search,
  Filter,
  Download,
  User,
  ShoppingCart,
  Package,
  Truck,
  FileText,
  Settings,
  LogIn,
  AlertTriangle,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const activityLogs = [
  {
    id: "1",
    timestamp: "2024-12-16 09:30:15",
    user: "Budi Santoso",
    module: "Sales",
    action: "Created sales order",
    details: "Sales Order #SO-2024-0892 created for customer AutoDetail Bandung",
    type: "create",
  },
  {
    id: "2",
    timestamp: "2024-12-16 09:15:42",
    user: "Rina Wijaya",
    module: "Inventory",
    action: "Stock adjustment",
    details: "Adjusted stock for SCW Snow Foam: +50 units (Warehouse A)",
    type: "update",
  },
  {
    id: "3",
    timestamp: "2024-12-16 08:45:00",
    user: "System",
    module: "Inventory",
    action: "Stock alert triggered",
    details: "SCW Ceramic Coating (5L) below minimum stock level (5 remaining)",
    type: "alert",
  },
  {
    id: "4",
    timestamp: "2024-12-16 08:30:20",
    user: "Dedi Kurniawan",
    module: "Shipping",
    action: "Shipment dispatched",
    details: "Shipment #SHP-2024-0234 dispatched via JNE to Surabaya",
    type: "update",
  },
  {
    id: "5",
    timestamp: "2024-12-16 08:00:00",
    user: "Ani Susanti",
    module: "Accounting",
    action: "Invoice processed",
    details: "Payment received for Invoice #INV-2024-0456: Rp 3,500,000",
    type: "create",
  },
  {
    id: "6",
    timestamp: "2024-12-15 17:30:10",
    user: "Eko Prasetyo",
    module: "Purchasing",
    action: "Purchase order created",
    details: "PO #PO-2024-0156 created for supplier PT Chemical Indonesia",
    type: "create",
  },
  {
    id: "7",
    timestamp: "2024-12-15 16:45:30",
    user: "Sari Dewi",
    module: "Sales",
    action: "Customer updated",
    details: "Customer profile updated: AutoDetail Bandung - new shipping address",
    type: "update",
  },
  {
    id: "8",
    timestamp: "2024-12-15 15:20:00",
    user: "Admin",
    module: "Settings",
    action: "Role modified",
    details: "Role 'Warehouse Staff' permissions updated - added packing access",
    type: "update",
  },
  {
    id: "9",
    timestamp: "2024-12-15 14:00:00",
    user: "System",
    module: "Inventory",
    action: "Stock alert triggered",
    details: "SCW Tire Gel below minimum stock level (3 remaining)",
    type: "alert",
  },
  {
    id: "10",
    timestamp: "2024-12-15 11:30:15",
    user: "Andi Wicaksono",
    module: "Sales",
    action: "Order completed",
    details: "Sales Order #SO-2024-0876 marked as completed and delivered",
    type: "update",
  },
  {
    id: "11",
    timestamp: "2024-12-15 10:00:00",
    user: "Budi Santoso",
    module: "Purchasing",
    action: "PO approved",
    details: "Purchase Order #PO-2024-0154 approved for Rp 8,750,000",
    type: "create",
  },
  {
    id: "12",
    timestamp: "2024-12-14 16:20:00",
    user: "Rina Wijaya",
    module: "Sales",
    action: "New customer registered",
    details: "Customer 'DetailPro Jakarta' registered via web commerce",
    type: "create",
  },
]

const moduleOptions = [
  { label: "All Modules", value: "all" },
  { label: "Sales", value: "Sales" },
  { label: "Inventory", value: "Inventory" },
  { label: "Purchasing", value: "Purchasing" },
  { label: "Shipping", value: "Shipping" },
  { label: "Accounting", value: "Accounting" },
  { label: "Settings", value: "Settings" },
]

const userOptions = [
  { label: "All Users", value: "all" },
  { label: "Budi Santoso", value: "Budi Santoso" },
  { label: "Rina Wijaya", value: "Rina Wijaya" },
  { label: "Dedi Kurniawan", value: "Dedi Kurniawan" },
  { label: "Ani Susanti", value: "Ani Susanti" },
  { label: "System", value: "System" },
]

const actionIcons: Record<string, React.ElementType> = {
  create: TrendingUp,
  update: Activity,
  alert: AlertTriangle,
}

const actionColors: Record<string, string> = {
  create: "bg-green-50 text-green-700",
  update: "bg-blue-50 text-blue-700",
  alert: "bg-amber-50 text-amber-700",
}

export default function ActivityLogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [moduleFilter, setModuleFilter] = useState("all")
  const [userFilter, setUserFilter] = useState("all")

  const filteredLogs = activityLogs.filter((log) => {
    const matchesSearch =
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesModule = moduleFilter === "all" || log.module === moduleFilter
    const matchesUser = userFilter === "all" || log.user === userFilter
    return matchesSearch && matchesModule && matchesUser
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Activity Log</h1>
          <p className="text-muted-foreground">
            Audit trail of all system activities and changes
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-1" />
          Export Log
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1 space-y-1">
              <Label className="text-xs">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search activity details..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full sm:w-44 space-y-1">
              <Label className="text-xs">Module</Label>
              <Select value={moduleFilter} onValueChange={(v) => setModuleFilter(v ?? '')}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {moduleOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-44 space-y-1">
              <Label className="text-xs">User</Label>
              <Select value={userFilter} onValueChange={(v) => setUserFilter(v ?? '')}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {userOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-44 space-y-1">
              <Label className="text-xs">Date Range</Label>
              <Input type="date" className="w-full" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Activity History</CardTitle>
              <CardDescription>
                {filteredLogs.length} entries found
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-44">Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => {
                const Icon = actionIcons[log.type] || Activity
                return (
                  <TableRow key={log.id}>
                    <TableCell className="text-xs text-muted-foreground font-mono">
                      {log.timestamp}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-semibold text-indigo-700">
                          {log.user === "System" ? (
                            <Settings className="h-3 w-3" />
                          ) : (
                            log.user.split(" ").map((n) => n[0]).join("")
                          )}
                        </div>
                        <span className="text-sm font-medium">{log.user}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{log.module}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={actionColors[log.type]}>
                        <Icon className="mr-1 h-3 w-3" />
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-md text-sm text-muted-foreground">
                      {log.details}
                    </TableCell>
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
