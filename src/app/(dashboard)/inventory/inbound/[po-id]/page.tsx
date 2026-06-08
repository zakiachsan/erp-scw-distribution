"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  Package,
  Truck,
  CheckCircle,
  ArrowRight,
  Warehouse,
  Store,
} from "lucide-react"

interface POItem {
  id: string
  name: string
  sku: string
  orderedQty: number
  receivedQty: string
  storageType: string
}

interface POData {
  poNumber: string
  supplier: string
  shipDate: string
  expectedArrival: string
  items: POItem[]
}

const initialPOData: POData = {
  poNumber: "PO-001",
  supplier: "PT Autocare Indonesia",
  shipDate: "2026-06-01",
  expectedArrival: "2026-06-10",
  items: [
    {
      id: "1",
      name: "SCW Snow Foam",
      sku: "SCW-SF-001",
      orderedQty: 100,
      receivedQty: "",
      storageType: "",
    },
    {
      id: "2",
      name: "SCW Ceramic Coating",
      sku: "SCW-CC-002",
      orderedQty: 50,
      receivedQty: "",
      storageType: "",
    },
    {
      id: "3",
      name: "SCW Interior Detailer",
      sku: "SCW-ID-003",
      orderedQty: 30,
      receivedQty: "",
      storageType: "",
    },
  ],
}

export default function ReceivePOPage() {
  const router = useRouter()
  const [poData, setPoData] = useState<POData>(initialPOData)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleQtyChange = (itemId: string, qty: string) => {
    setPoData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === itemId ? { ...item, receivedQty: qty } : item
      ),
    }))
  }

  const handleStorageChange = (itemId: string, storageType: string) => {
    setPoData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === itemId ? { ...item, storageType } : item
      ),
    }))
  }

  const handleConfirmReceipt = () => {
    const incomplete = poData.items.find(
      (item) => !item.receivedQty || !item.storageType
    )
    if (incomplete) {
      alert(
        `Please fill in received quantity and storage type for all items.\nMissing for: ${incomplete.name}`
      )
      return
    }

    setShowSuccess(true)

    setTimeout(() => {
      router.push(`/inventory/inbound/${poData.poNumber}/assign`)
    }, 1500)
  }

  const allFilled = poData.items.every(
    (item) => item.receivedQty && item.storageType
  )

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Truck className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              Receive {poData.poNumber}
            </h1>
            <p className="text-muted-foreground">
              {poData.supplier}
            </p>
          </div>
        </div>
        <Badge variant="outline" className="text-sm">
          <Package className="mr-1 h-4 w-4" />
          Pending Receipt
        </Badge>
      </div>

      {/* PO Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">PO Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Supplier</p>
              <p className="font-medium">{poData.supplier}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Ship Date</p>
              <p className="font-medium">{poData.shipDate}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                Expected Arrival
              </p>
              <p className="font-medium">{poData.expectedArrival}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">PO Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-center">Ordered Qty</TableHead>
                <TableHead className="text-center">Received Qty</TableHead>
                <TableHead className="text-center">Storage Type</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {poData.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.sku}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {item.orderedQty}
                  </TableCell>
                  <TableCell className="text-center">
                    <Input
                      type="number"
                      min={0}
                      max={item.orderedQty}
                      value={item.receivedQty}
                      onChange={(e) =>
                        handleQtyChange(item.id, e.target.value)
                      }
                      className="w-24 text-center"
                      placeholder="0"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Select
                      value={item.storageType}
                      onValueChange={(val) =>
                        handleStorageChange(item.id, val)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select storage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rak-items">
                          <div className="flex items-center gap-2">
                            <Store className="h-4 w-4" />
                            <span>Rak Items</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="rak-kardus">
                          <div className="flex items-center gap-2">
                            <Warehouse className="h-4 w-4" />
                            <span>Rak Kardus</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={
                        item.receivedQty && item.storageType
                          ? "default"
                          : "outline"
                      }
                    >
                      {item.receivedQty && item.storageType ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" /> Ready
                        </span>
                      ) : (
                        "Pending"
                      )}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Success Alert */}
      {showSuccess && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="flex items-center gap-3 py-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <p className="font-medium text-green-800">
                Receipt Confirmed Successfully!
              </p>
              <p className="text-sm text-green-600">
                Redirecting to rack assignment page...
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Confirm Button */}
      <div className="flex justify-end">
        <Button
          size="lg"
          onClick={handleConfirmReceipt}
          disabled={!allFilled}
          className="gap-2"
        >
          {allFilled ? (
            <>
              <CheckCircle className="h-5 w-5" />
              Confirm Receipt
            </>
          ) : (
            <>
              <Package className="h-5 w-5" />
              Fill All Items First
            </>
          )}
          {allFilled && <ArrowRight className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  )
}