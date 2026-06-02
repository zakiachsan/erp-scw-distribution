"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Warehouse,
  Package,
  Plus,
  Grid3X3,
  Box,
  ArrowUpDown,
} from "lucide-react"

interface Rack {
  id: string
  name: string
  warehouse: string
  status: "empty" | "occupied" | "full"
  capacity: number
  used: number
  products: { name: string; qty: number }[]
}

const racks: Rack[] = [
  {
    id: "1",
    name: "Rak A-01",
    warehouse: "Gudang Utama",
    status: "full",
    capacity: 200,
    used: 185,
    products: [
      { name: "SCW Snow Foam", qty: 150 },
      { name: "SCW Shampoo Plus", qty: 35 },
    ],
  },
  {
    id: "2",
    name: "Rak A-02",
    warehouse: "Gudang Utama",
    status: "occupied",
    capacity: 200,
    used: 75,
    products: [
      { name: "SCW Ceramic Coating", qty: 40 },
      { name: "SCW Spray Wax", qty: 35 },
    ],
  },
  {
    id: "3",
    name: "Rak A-03",
    warehouse: "Gudang Utama",
    status: "occupied",
    capacity: 200,
    used: 120,
    products: [{ name: "SCW Microfiber Wash", qty: 120 }],
  },
  {
    id: "4",
    name: "Rak B-01",
    warehouse: "Gudang Utama",
    status: "full",
    capacity: 200,
    used: 180,
    products: [{ name: "SCW Interior Detailer", qty: 180 }],
  },
  {
    id: "5",
    name: "Rak B-02",
    warehouse: "Gudang Utama",
    status: "occupied",
    capacity: 200,
    used: 95,
    products: [{ name: "SCW Tire Gel", qty: 95 }],
  },
  {
    id: "6",
    name: "Rak C-01",
    warehouse: "Gudang Utama",
    status: "empty",
    capacity: 200,
    used: 0,
    products: [],
  },
  {
    id: "7",
    name: "Rak C-02",
    warehouse: "Gudang Utama",
    status: "occupied",
    capacity: 200,
    used: 45,
    products: [
      { name: "SCW Polish Compound", qty: 25 },
      { name: "SCW Clay Bar", qty: 20 },
    ],
  },
  {
    id: "8",
    name: "Rak D-01",
    warehouse: "Gudang Cabang",
    status: "occupied",
    capacity: 150,
    used: 100,
    products: [{ name: "SCW Glass Cleaner", qty: 100 }],
  },
  {
    id: "9",
    name: "Rak D-02",
    warehouse: "Gudang Cabang",
    status: "full",
    capacity: 150,
    used: 140,
    products: [
      { name: "SCW Leather Conditioner", qty: 45 },
      { name: "SCW Dashboard Coating", qty: 95 },
    ],
  },
  {
    id: "10",
    name: "Rak E-01",
    warehouse: "Gudang Cabang",
    status: "occupied",
    capacity: 150,
    used: 67,
    products: [{ name: "SCW Trim Restorer", qty: 67 }],
  },
  {
    id: "11",
    name: "Rak F-01",
    warehouse: "Gudang Display",
    status: "occupied",
    capacity: 100,
    used: 55,
    products: [
      { name: "SCW Foam Pad", qty: 30 },
      { name: "SCW Microfiber Towel", qty: 25 },
    ],
  },
  {
    id: "12",
    name: "Rak F-02",
    warehouse: "Gudang Display",
    status: "empty",
    capacity: 100,
    used: 0,
    products: [],
  },
]

const statusConfig = {
  empty: {
    label: "Empty",
    className: "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400",
    icon: Box,
  },
  occupied: {
    label: "Occupied",
    className: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
    icon: Package,
  },
  full: {
    label: "Full",
    className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    icon: Warehouse,
  },
}

function RackCard({ rack }: { rack: Rack }) {
  const cfg = statusConfig[rack.status]
  const Icon = cfg.icon
  const pct = Math.round((rack.used / rack.capacity) * 100)

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900/20">
              <Icon className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="font-medium">{rack.name}</p>
              <p className="text-xs text-muted-foreground">{rack.warehouse}</p>
            </div>
          </div>
          <Badge variant="outline" className={cfg.className}>
            {cfg.label}
          </Badge>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Capacity</span>
            <span className="font-medium">
              {rack.used}/{rack.capacity}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${pct}%`,
                backgroundColor:
                  pct >= 90
                    ? "rgb(245, 158, 11)"
                    : pct >= 50
                      ? "rgb(99, 102, 241)"
                      : "rgb(34, 197, 94)",
              }}
            />
          </div>
          <p className="text-right text-xs text-muted-foreground">{pct}% used</p>
        </div>

        {rack.products.length > 0 && (
          <div className="mt-4 space-y-1.5 border-t pt-3">
            <p className="text-xs font-medium text-muted-foreground">Products:</p>
            {rack.products.map((p, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="truncate">{p.name}</span>
                <span className="ml-2 shrink-0 font-mono text-xs">{p.qty}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function WarehousePage() {
  const warehouses = ["All", "Gudang Utama", "Gudang Cabang", "Gudang Display"]
  const emptyCount = racks.filter((r) => r.status === "empty").length
  const occupiedCount = racks.filter((r) => r.status === "occupied").length
  const fullCount = racks.filter((r) => r.status === "full").length

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Warehouse & Rak</h1>
          <p className="text-muted-foreground">
            Manage rack assignments and warehouse layout
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Rack
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                <Package className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Racks</p>
                <p className="text-2xl font-bold">{racks.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                <Grid3X3 className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Occupied</p>
                <p className="text-2xl font-bold">{occupiedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <Warehouse className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Full</p>
                <p className="text-2xl font-bold">{fullCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="All">
        <TabsList>
          {warehouses.map((wh) => (
            <TabsTrigger key={wh} value={wh}>
              {wh}
            </TabsTrigger>
          ))}
        </TabsList>
        {warehouses.map((wh) => (
          <TabsContent key={wh} value={wh}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {racks
                .filter((r) => wh === "All" || r.warehouse === wh)
                .map((rack) => (
                  <RackCard key={rack.id} rack={rack} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
