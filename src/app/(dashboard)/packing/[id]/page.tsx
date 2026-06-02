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
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ArrowLeft,
  Save,
  Upload,
  Package,
  Ruler,
  Video,
  CheckSquare,
} from "lucide-react"
import Link from "next/link"

const orderItems = [
  { id: "1", name: "SCW Snow Foam", sku: "SCW-SF-001", qty: 20, packed: false },
  { id: "2", name: "SCW Ceramic Coating", sku: "SCW-CC-002", qty: 10, packed: false },
]

const packingMaterials = [
  { id: "M01", name: "Cardboard Box (Large)", stock: 150 },
  { id: "M02", name: "Cardboard Box (Medium)", stock: 200 },
  { id: "M03", name: "Bubble Wrap Roll", stock: 50 },
  { id: "M04", name: "Packing Tape", stock: 100 },
  { id: "M05", name: "Foam Sheet", stock: 80 },
  { id: "M06", name: "Void Fill (Kertas)", stock: 30 },
]

export default function PackingDetailPage() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [dimensions, setDimensions] = useState({ length: "", width: "", height: "" })
  const [notes, setNotes] = useState("")

  const toggleItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const toggleMaterial = (id: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Link href="/packing">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">Packing Form — PK-001</h1>
          <p className="text-muted-foreground">SO Ref: SO-2026-045 | Customer: PT Autogloss Indonesia</p>
        </div>
        <Badge variant="outline" className="bg-amber-100 text-amber-800">In Progress</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Item Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-indigo-600" />
              Item Selection
            </CardTitle>
            <CardDescription>Select items to pack</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50"
              >
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={() => toggleItem(item.id)}
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.sku}</p>
                </div>
                <Badge variant="outline">{item.qty} pcs</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Packing Materials */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-indigo-600" />
              Packing Materials
            </CardTitle>
            <CardDescription>Select materials used for this packing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {packingMaterials.map((material) => (
              <div
                key={material.id}
                className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50"
              >
                <Checkbox
                  checked={selectedMaterials.includes(material.id)}
                  onCheckedChange={() => toggleMaterial(material.id)}
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">{material.name}</p>
                </div>
                <span className="text-xs text-muted-foreground">Stock: {material.stock}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Dimensions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ruler className="h-5 w-5 text-indigo-600" />
            Package Dimensions
          </CardTitle>
          <CardDescription>Enter the final packed dimensions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Length (cm)</Label>
              <Input
                type="number"
                placeholder="0"
                value={dimensions.length}
                onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Width (cm)</Label>
              <Input
                type="number"
                placeholder="0"
                value={dimensions.width}
                onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Height (cm)</Label>
              <Input
                type="number"
                placeholder="0"
                value={dimensions.height}
                onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Total Weight (kg)</Label>
              <Input type="number" placeholder="0" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-indigo-600" />
            Packing Video
          </CardTitle>
          <CardDescription>Upload a video of the packing process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border-2 border-dashed p-8 text-center hover:bg-muted/50 cursor-pointer transition-colors">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="font-medium">Drop video file here or click to upload</p>
            <p className="text-sm text-muted-foreground mt-1">
              MP4, MOV, or AVI. Max 500MB.
            </p>
            <Button variant="outline" className="mt-4">
              <Upload className="mr-2 h-4 w-4" />
              Choose File
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notes & Submit */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Packing Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Add any notes about this packing..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Items Selected</span>
              <span className="font-medium">{selectedItems.length} / {orderItems.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Materials Used</span>
              <span className="font-medium">{selectedMaterials.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Dimensions</span>
              <span className="font-medium">
                {dimensions.length && dimensions.width && dimensions.height
                  ? `${dimensions.length}×${dimensions.width}×${dimensions.height} cm`
                  : "Not set"}
              </span>
            </div>
            <Button className="w-full mt-4" disabled={selectedItems.length === 0}>
              <Save className="mr-2 h-4 w-4" />
              Complete Packing
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
