"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Plus,
  Truck,
  Building2,
  MapPin,
  Phone,
  Star,
} from "lucide-react"
import { couriers, type Courier } from "@/lib/shipping-data"

const typeConfig: Record<string, { className: string }> = {
  Internal: { className: "bg-indigo-100 text-indigo-800" },
  "Expedisi Partner": { className: "bg-blue-100 text-blue-800" },
}

const statusConfig: Record<string, { className: string }> = {
  Active: { className: "bg-emerald-100 text-emerald-800" },
  Inactive: { className: "bg-gray-100 text-gray-800" },
}

export default function CouriersPage() {
  const [addOpen, setAddOpen] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [rates, setRates] = useState("")

  const addCourier = () => {
    if (!name.trim()) return
    alert(`Courier "${name}" added successfully!`)
    setName("")
    setPhone("")
    setRates("")
    setAddOpen(false)
  }

  const internalCouriers = couriers.filter((c) => c.type === "Internal")
  const expedisiPartners = couriers.filter((c) => c.type === "Expedisi Partner")

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Courier Management</h1>
          <p className="text-muted-foreground">
            Manage internal couriers and expedisi partners
          </p>
        </div>
        <Button onClick={() => setAddOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Courier
        </Button>
      </div>
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Courier</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Courier Name</Label>
              <Input placeholder="Enter courier name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Rates</Label>
              <Input placeholder="Enter rate info" value={rates} onChange={(e) => setRates(e.target.value)} />
            </div>
            <Button onClick={addCourier} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Courier
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                <Truck className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Internal Couriers</p>
                <p className="text-2xl font-bold">{internalCouriers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expedisi Partners</p>
                <p className="text-2xl font-bold">{expedisiPartners.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <Star className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold">
                  {(couriers.reduce((sum, c) => sum + c.rating, 0) / couriers.length).toFixed(1)} ⭐
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Internal Couriers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-indigo-600" />
            Internal Couriers
          </CardTitle>
          <CardDescription>Company-owned delivery vehicles and personnel</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Coverage
                </TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right">Rating</TableHead>
                <TableHead className="text-right">Total Shipments</TableHead>
                <TableHead className="text-right">Avg Delivery</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {internalCouriers.map((courier) => (
                <TableRow key={courier.id}>
                  <TableCell className="font-medium">{courier.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusConfig[courier.status].className}>
                      {courier.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground">
                    {courier.coverage}
                  </TableCell>
                  <TableCell className="text-sm">{courier.contact}</TableCell>
                  <TableCell className="text-right">
                    <span className="text-amber-500">⭐</span> {courier.rating}
                  </TableCell>
                  <TableCell className="text-right">{courier.totalShipments.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{courier.avgDeliveryDays} day{courier.avgDeliveryDays > 1 ? "s" : ""}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Expedisi Partners */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            Expedisi Partners
          </CardTitle>
          <CardDescription>Third-party logistics partners</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Coverage</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right">Rating</TableHead>
                <TableHead className="text-right">Total Shipments</TableHead>
                <TableHead className="text-right">Avg Delivery</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expedisiPartners.map((courier) => (
                <TableRow key={courier.id}>
                  <TableCell className="font-medium">{courier.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusConfig[courier.status].className}>
                      {courier.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground">
                    {courier.coverage}
                  </TableCell>
                  <TableCell className="text-sm">{courier.contact}</TableCell>
                  <TableCell className="text-right">
                    <span className="text-amber-500">⭐</span> {courier.rating}
                  </TableCell>
                  <TableCell className="text-right">{courier.totalShipments.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{courier.avgDeliveryDays} day{courier.avgDeliveryDays > 1 ? "s" : ""}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
