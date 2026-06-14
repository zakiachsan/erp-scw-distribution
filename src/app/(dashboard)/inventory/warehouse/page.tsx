"use client"

import { useRouter } from "next/navigation"
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
  Warehouse,
  Plus,
  Pencil,
  Trash2,
  MapPin,
  AlertCircle,
} from "lucide-react"
import { useWarehouseStore } from "@/lib/warehouse-store"

export default function WarehousePage() {
  const router = useRouter()
  const {
    locations,
    racks,
    addLocation,
    updateLocation,
    deleteLocation,
    addRack,
  } = useWarehouseStore()

  // Add rack dialog state
  const [addRackOpen, setAddRackOpen] = useState(false)
  const [rackName, setRackName] = useState("")
  const [capacity, setCapacity] = useState("")
  const [selectedLocationId, setSelectedLocationId] = useState("")

  // Location management dialog state
  const [manageLocationsOpen, setManageLocationsOpen] = useState(false)
  const [locationName, setLocationName] = useState("")
  const [editingLocation, setEditingLocation] = useState<{ id: string; name: string } | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>("All")

  const handleAddRack = () => {
    if (!rackName.trim() || !selectedLocationId) return
    addRack({
      name: rackName.trim(),
      locationId: selectedLocationId,
      capacity: Number(capacity) || 100,
    })
    setRackName("")
    setCapacity("")
    setSelectedLocationId("")
    setAddRackOpen(false)
  }

  const openAddRack = () => {
    setSelectedLocationId(locations[0]?.id ?? "")
    setAddRackOpen(true)
  }

  const saveLocation = () => {
    if (!locationName.trim()) return
    if (editingLocation) {
      updateLocation(editingLocation.id, locationName.trim())
    } else {
      addLocation(locationName.trim())
    }
    setLocationName("")
    setEditingLocation(null)
  }

  const startEditLocation = (loc: { id: string; name: string }) => {
    setEditingLocation(loc)
    setLocationName(loc.name)
  }

  const cancelEditLocation = () => {
    setEditingLocation(null)
    setLocationName("")
  }

  const handleDeleteLocation = (id: string) => {
    const hasRacks = racks.some((r) => r.locationId === id)
    if (hasRacks) {
      alert("Cannot delete location that still has racks assigned to it.")
      return
    }
    deleteLocation(id)
  }

  const getLocationName = (id: string) =>
    locations.find((loc) => loc.id === id)?.name ?? "Unknown"

  const filteredRacks =
    activeFilter === "All"
      ? racks
      : racks.filter((r) => r.locationId === activeFilter)

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Warehouse & Rak</h1>
          <p className="text-muted-foreground">
            Manage warehouse locations first, then assign racks
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={manageLocationsOpen} onOpenChange={setManageLocationsOpen}>
            <DialogTrigger render={<Button variant="outline" />}>
              <MapPin className="mr-2 h-4 w-4" />
              Manage Locations
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Warehouse Locations</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="location-name">
                    {editingLocation ? "Edit Location" : "New Location"}
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="location-name"
                      placeholder="e.g. Gudang Utama"
                      value={locationName}
                      onChange={(e) => setLocationName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveLocation()
                      }}
                    />
                    {editingLocation ? (
                      <>
                        <Button onClick={saveLocation}>Save</Button>
                        <Button variant="outline" onClick={cancelEditLocation}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button onClick={saveLocation}>
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">Add</span>
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Saved Locations</Label>
                  {locations.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No locations yet. Create one above to get started.
                    </p>
                  ) : (
                    <div className="divide-y rounded-lg border">
                      {locations.map((loc) => {
                        const rackCount = racks.filter(
                          (r) => r.locationId === loc.id
                        ).length
                        return (
                          <div
                            key={loc.id}
                            className="flex items-center justify-between p-3"
                          >
                            <div>
                              <p className="font-medium">{loc.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {rackCount} rack{rackCount !== 1 ? "s" : ""}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => startEditLocation(loc)}
                              >
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteLocation(loc.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={addRackOpen} onOpenChange={setAddRackOpen}>
            <DialogTrigger
              render={
                <Button disabled={locations.length === 0} onClick={openAddRack} />
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Rack
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Rack</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="rack-location">Location</Label>
                  <Select
                    value={selectedLocationId}
                    onValueChange={(v) => setSelectedLocationId(v ?? "")}
                  >
                    <SelectTrigger id="rack-location" className="w-full">
                      <SelectValue placeholder="Select location">
                        {getLocationName(selectedLocationId)}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc.id} value={loc.id}>
                          {loc.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Input
                  placeholder="Rack Name"
                  value={rackName}
                  onChange={(e) => setRackName(e.target.value)}
                />
                <Input
                  placeholder="Capacity"
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                />
                <Button onClick={handleAddRack} className="w-full">
                  Add Rack
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {locations.length === 0 && (
        <div className="flex items-center gap-3 rounded-lg border bg-amber-50 p-4 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <div>
            <p className="font-medium">No warehouse locations found</p>
            <p className="text-sm">
              Create at least one location category before you can add racks.
            </p>
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <MapPin className="h-4 w-4" />
            Warehouse Locations
          </CardTitle>
          <CardDescription>
            Click a location to filter racks. Manage categories using the button
            above.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {locations.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No locations defined yet. Click “Manage Locations” to create one.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={activeFilter === "All" ? "default" : "secondary"}
                className="cursor-pointer gap-1 px-2.5 py-1 text-sm"
                onClick={() => setActiveFilter("All")}
              >
                All
                <span className="opacity-75">({racks.length})</span>
              </Badge>
              {locations.map((loc) => {
                const rackCount = racks.filter(
                  (r) => r.locationId === loc.id
                ).length
                return (
                  <Badge
                    key={loc.id}
                    variant={activeFilter === loc.id ? "default" : "secondary"}
                    className="cursor-pointer gap-1 px-2.5 py-1 text-sm"
                    onClick={() => setActiveFilter(loc.id)}
                  >
                    <Warehouse className="h-3.5 w-3.5" />
                    {loc.name}
                    <span className="opacity-75">({rackCount})</span>
                  </Badge>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Warehouse className="h-4 w-4" />
            Daftar Rak
          </CardTitle>
          <CardDescription>
            Klik baris rak untuk masuk ke halaman detail.
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {filteredRacks.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Tidak ada rak untuk lokasi ini.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Rak</TableHead>
                  <TableHead>Lokasi</TableHead>
                  <TableHead>Kapasitas</TableHead>
                  <TableHead>Isi Rak</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRacks.map((rack) => {
                  const pct = Math.round((rack.used / rack.capacity) * 100)

                  const productPart =
                    rack.products.length === 0
                      ? ""
                      : rack.products.length === 1
                        ? `${rack.products[0].name} (${rack.products[0].qty})`
                        : `${rack.products[0].name} & ${rack.products.length - 1} produk lainnya`

                  const cartonPart =
                    (rack.cartons?.length ?? 0) === 0
                      ? ""
                      : `${rack.cartons.length} kardus`

                  const productSummary =
                    productPart && cartonPart
                      ? `${productPart}; ${cartonPart}`
                      : productPart || cartonPart || "-"

                  return (
                    <TableRow
                      key={rack.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => router.push(`/inventory/warehouse/${rack.id}`)}
                    >
                      <TableCell className="font-medium">{rack.name}</TableCell>
                      <TableCell>{getLocationName(rack.locationId)}</TableCell>
                      <TableCell>
                        {rack.used}/{rack.capacity} ({pct}%)
                      </TableCell>
                      <TableCell className="max-w-xs truncate text-muted-foreground">
                        {productSummary}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
