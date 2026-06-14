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
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
  Search,
  Plus,
  Users,
  Eye,
  Filter,
  CreditCard,
} from "lucide-react"
import { customers, type Customer } from "@/lib/sales-data"

const formatIDR = (val: number) => `Rp ${val.toLocaleString("id-ID")}`

const tierConfig = {
  Bronze: { label: "Bronze", className: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400" },
  Silver: { label: "Silver", className: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400" },
  Gold: { label: "Gold", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" },
  Platinum: { label: "Platinum", className: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400" },
}

export default function CustomerListPage() {
  const [search, setSearch] = useState("")
  const [tierFilter, setTierFilter] = useState("All")
  const [addOpen, setAddOpen] = useState(false)
  const [custName, setCustName] = useState("")
  const [custCompany, setCustCompany] = useState("")
  const [customerList, setCustomerList] = useState(customers)

  const addCustomer = () => {
    if (!custName.trim()) return
    const newCust = {
      id: `C${String(customerList.length + 1).padStart(3, "0")}`,
      name: custName,
      company: custCompany || "Unknown",
      creditLimit: 0,
      remainingCredit: 0,
      lastPurchase: new Date().toISOString().split("T")[0],
      tier: "Bronze" as const,
      totalPurchase: 0,
    }
    setCustomerList([...customerList, newCust])
    setCustName("")
    setCustCompany("")
    setAddOpen(false)
  }

  const filtered = useMemo(() => {
    return customerList.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.company.toLowerCase().includes(search.toLowerCase()) ||
        c.id.toLowerCase().includes(search.toLowerCase())
      const matchesTier = tierFilter === "All" || c.tier === tierFilter
      return matchesSearch && matchesTier
    })
  }, [search, tierFilter, customerList])

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl tracking-tight">Customers</h1>
          <p className="text-muted-foreground">
            Manage your customer database and credit accounts
          </p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger render={<Button />}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Customer
                    </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Input placeholder="Customer Name" value={custName} onChange={(e) => setCustName(e.target.value)} />
              <Input placeholder="Company" value={custCompany} onChange={(e) => setCustCompany(e.target.value)} />
              <Button onClick={addCustomer} className="w-full">Add Customer</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                <Users className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Customers</p>
                <p className="text-2xl">{customerList.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <CreditCard className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Credit Limit</p>
                <p className="text-2xl">
                  {formatIDR(customerList.reduce((sum, c) => sum + c.creditLimit, 0))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <CreditCard className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Remaining Credit</p>
                <p className="text-2xl">
                  {formatIDR(customerList.reduce((sum, c) => sum + c.remainingCredit, 0))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Customer List</CardTitle>
              <CardDescription>
                {filtered.length} customer{filtered.length !== 1 ? "s" : ""} found
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search name or company..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-64 pl-9"
                />
              </div>
              <Select value={tierFilter} onValueChange={(v) => setTierFilter(v ?? "All")}>
                <SelectTrigger className="w-40">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Tiers</SelectItem>
                  <SelectItem value="Bronze">Bronze</SelectItem>
                  <SelectItem value="Silver">Silver</SelectItem>
                  <SelectItem value="Gold">Gold</SelectItem>
                  <SelectItem value="Platinum">Platinum</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-right">Credit Limit</TableHead>
                <TableHead className="text-right">Remaining</TableHead>
                <TableHead>Last Purchase</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-sans text-xs">{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell className="text-muted-foreground">{customer.company}</TableCell>
                  <TableCell className="text-right">
                    {formatIDR(customer.creditLimit)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatIDR(customer.remainingCredit)}
                  </TableCell>
                  <TableCell>{customer.lastPurchase}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={tierConfig[customer.tier].className}>
                      {tierConfig[customer.tier].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/sales/customers/${customer.id}`}>
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
