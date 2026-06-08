"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
  Package,
  Warehouse,
  Store,
  CheckCircle,
  ArrowRight,
  MapPin,
} from "lucide-react"

interface RackAssignmentItem {
  id: string
  name: string
  qty: number
  storageType: "rak-items" | "rak-kardus"
}

interface RackOption {
  id: string
  name: string
  usagePercent: number
}

const items: RackAssignmentItem[] = [
  { id: "1", name: "SCW Snow Foam", qty: 100, storageType: "rak-items" },
  { id: "2", name: "SCW Ceramic Coating", qty: 50, storageType: "rak-kardus" },
  { id: "3", name: "SCW Interior Detailer", qty: 30, storageType: "rak-items" },
]

const rakItemsOptions: RackOption[] = [
  { id: "rak-a-01", name: "Rak A-01", usagePercent: 50 },
  { id: "rak-a-02", name: "Rak A-02", usagePercent: 75 },
  { id: "rak-b-01", name: "Rak B-01", usagePercent: 30 },
  { id: "rak-b-02", name: "Rak B-02", usagePercent: 60 },
]

const rakKardusOptions: RackOption[] = [
  { id: "gudang-kardus-a", name: "Gudang Kardus A", usagePercent: 40 },
  { id: "gudang-kardus-b", name: "Gudang Kardus B", usagePercent: 20 },
]

export default function RackAssignmentPage() {
  const router = useRouter()
  const params = useParams()
  const poId = params["po-id"] as string

  const [assignments, setAssignments] = useState<Record<string, string>>({})
  const [confirmed, setConfirmed] = useState(false)

  const rakItemsList = items.filter((item) => item.storageType === "rak-items")
  const rakKardusList = items.filter((item) => item.storageType === "rak-kardus")

  const allAssigned =
    items.every((item) => assignments[item.id]) &&
    items.length > 0

  const handleConfirm = () => {
    if (!allAssigned) {
      alert("Please assign all items to a rack before confirming.")
      return
    }
    setConfirmed(true)
    setTimeout(() => {
      router.push("/inventory/inbound")
    }, 1500)
  }

  const getUsageColor = (percent: number) => {
    if (percent >= 80) return "text-red-600"
    if (percent >= 50) return "text-amber-600"
    return "text-green-600"
  }

  if (confirmed) {
    return (
      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-10 pb-10 space-y-4">
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-xl font-bold">Assignment Confirmed!</h2>
            <p className="text-muted-foreground">
              All items have been successfully assigned to their respective racks. Redirecting to inbound list...
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Rack Assignment</h1>
          <p className="text-muted-foreground">
            PO {poId} - Assign received items to storage racks
          </p>
        </div>
        <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
          Pending Assignment
        </Badge>
      </div>

      {/* Info Banner */}
      <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-blue-900 dark:text-blue-300">
                Rack Assignment Process
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Items have been received and categorized by storage type. Assign each item to a specific rack or location. 
                "Rak Items" go to display shelves for easy access, while "Rak Kardus" go to warehouse boxes for bulk storage.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rak Items Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5 text-indigo-600" />
            Rak Items
            <Badge variant="outline" className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
              {rakItemsList.length} items
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Items assigned to display shelves for quick access and showroom display.
          </p>
          {rakItemsList.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 rounded-lg border p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900/20">
                  <Package className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.qty} pcs
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 min-w-[220px]">
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                <Select
                  value={assignments[item.id] || ""}
                  onValueChange={(v) =>
                    setAssignments((prev) => ({ ...prev, [item.id]: v ?? "" }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select rack" />
                  </SelectTrigger>
                  <SelectContent>
                    {rakItemsOptions.map((rack) => (
                      <SelectItem key={rack.id} value={rack.id}>
                        {rack.name} ({rack.usagePercent}% full)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Rak Kardus Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Warehouse className="h-5 w-5 text-amber-600" />
            Rak Kardus
            <Badge variant="outline" className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
              {rakKardusList.length} items
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Items stored in warehouse boxes for bulk storage and inventory management.
          </p>
          {rakKardusList.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 rounded-lg border p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-900/20">
                  <Package className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.qty} pcs
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 min-w-[220px]">
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                <Select
                  value={assignments[item.id] || ""}
                  onValueChange={(v) =>
                    setAssignments((prev) => ({ ...prev, [item.id]: v ?? "" }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select warehouse" />
                  </SelectTrigger>
                  <SelectContent>
                    {rakKardusOptions.map((rack) => (
                      <SelectItem key={rack.id} value={rack.id}>
                        {rack.name} ({rack.usagePercent}% full)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Confirm Button */}
      <div className="flex justify-end">
        <Button
          size="lg"
          onClick={handleConfirm}
          disabled={!allAssigned}
          className={allAssigned ? "bg-green-600 hover:bg-green-700" : ""}
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Confirm Assignment
        </Button>
      </div>
    </div>
  )
}
