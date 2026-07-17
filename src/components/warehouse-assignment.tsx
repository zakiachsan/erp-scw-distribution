"use client"

import { useState } from "react"
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
  CheckCircle2,
  Plus,
  Trash2,
  ArrowRight,
  Warehouse,
  ClipboardCheck,
  AlertTriangle,
} from "lucide-react"
import { useWarehouseStore, inboundPOSources } from "@/lib/warehouse-store"

interface Props {
  poId: string
  poNumber: string
  /** PO items passed from parent (for PO detail page) */
  poItems?: { product: string; sku: string; qty: number }[]
}

interface StockOpnameItem {
  actualQty: string
  verified: boolean
  notes: string
}

export default function WarehouseAssignmentSection({ poId, poNumber, poItems }: Props) {
  const { locations, racks, inboundReceipts, startReceipt, assignItemToRack, confirmPlacement } = useWarehouseStore()
  const inboundPo = inboundPOSources.find((p) => p.id === poId) ||
    inboundPOSources.find((p) => p.id === `po-00${poId}`)
  const receipt = inboundReceipts.find((r) => r.poId === poId)

  const [allocations, setAllocations] = useState<Record<string, { locationId: string; rackId: string; qty: string; status: string }[]>>({})
  const [saved, setSaved] = useState(false)
  const [putawayComplete, setPutawayComplete] = useState(false)
  const [stockOpnameData, setStockOpnameData] = useState<Record<string, StockOpnameItem>>({})
  const [stockOpnameComplete, setStockOpnameComplete] = useState(false)

  // Build items list from PO items, inbound source, or existing receipt
  const items = poItems?.map((i) => ({
    name: i.product,
    sku: i.sku,
    orderedQty: i.qty,
  })) || inboundPo?.items || receipt?.items.map((i) => ({
    name: i.productName,
    sku: i.sku,
    orderedQty: i.orderedQty,
  })) || []

  const getAllocations = (itemName: string) => allocations[itemName] || []
  const totalAllocated = (itemName: string) =>
    getAllocations(itemName).reduce((sum, a) => sum + (parseInt(a.qty) || 0), 0)

  const addAllocation = (itemName: string) => {
    setAllocations((prev) => ({
      ...prev,
      [itemName]: [
        ...(prev[itemName] || []),
        { locationId: locations[0]?.id || "loc-1", rackId: "", qty: "", status: "Baru Diterima" },
      ],
    }))
  }

  const updateAllocation = (itemName: string, idx: number, field: string, value: string) => {
    setAllocations((prev) => {
      const current = prev[itemName] || []
      const updated = current.map((a, i) => (i === idx ? { ...a, [field]: value } : a))
      return { ...prev, [itemName]: updated }
    })
  }

  const removeAllocation = (itemName: string, idx: number) => {
    setAllocations((prev) => {
      const current = prev[itemName] || []
      return { ...prev, [itemName]: current.filter((_, i) => i !== idx) }
    })
  }

  const racksForLocation = (locationId: string) =>
    racks.filter((r) => r.locationId === locationId)

  const updateStockOpname = (itemName: string, field: keyof StockOpnameItem, value: string | boolean) => {
    setStockOpnameData((prev) => ({
      ...prev,
      [itemName]: {
        actualQty: prev[itemName]?.actualQty || "",
        verified: prev[itemName]?.verified || false,
        notes: prev[itemName]?.notes || "",
        ...{ [field]: value },
      },
    }))
  }

  const handleConfirmAll = () => {
    // Use inboundPo if available, otherwise create a minimal source
    const poSource = inboundPo || {
      id: poId,
      poNumber,
      supplier: "",
      shipDate: "",
      expectedArrival: "",
      items: items.map((i) => ({
        name: i.name,
        sku: i.sku,
        barcode: "",
        orderedQty: i.orderedQty,
      })),
    }

    let currentReceipt = receipt
    if (!currentReceipt) {
      currentReceipt = startReceipt(poSource)
    }

    for (const item of items) {
      const allocs = getAllocations(item.name)
      for (const alloc of allocs) {
        const qty = parseInt(alloc.qty) || 0
        if (alloc.rackId && qty > 0) {
          assignItemToRack(currentReceipt.poId, item.name, alloc.rackId)
        }
      }
    }
    confirmPlacement(currentReceipt.poId)
    setSaved(true)
    setPutawayComplete(true)

    // Persist allocation data to localStorage for damaged items page
    const allocData: Record<string, { locationId: string; rackId: string; qty: string; status: string }[]> = {}
    for (const item of items) {
      allocData[item.name] = getAllocations(item.name)
    }
    const stored = localStorage.getItem("scw-warehouse-allocations") || "{}"
    const allAllocs = JSON.parse(stored)
    allAllocs[poId] = { poNumber, supplier: inboundPo?.supplier || "", items: allocData, updatedAt: Date.now() }
    localStorage.setItem("scw-warehouse-allocations", JSON.stringify(allAllocs))

    // Initialize stock opname data for all items
    const initialOpnameData: Record<string, StockOpnameItem> = {}
    for (const item of items) {
      initialOpnameData[item.name] = {
        actualQty: "",
        verified: false,
        notes: "",
      }
    }
    setStockOpnameData(initialOpnameData)
  }

  if (items.length === 0) {
    return null
  }

  // Compute assignment status
  const totalItems = items.length
  const fullyAssigned = items.filter((item) => {
    const existingAssigned = receipt?.items.find((ri) => ri.productName === item.name && ri.rackId)
    const newAssigned = totalAllocated(item.name) >= item.orderedQty
    return existingAssigned || newAssigned
  }).length
  const assignmentStatus = fullyAssigned === totalItems
    ? { label: "Putaway Complete", className: "bg-emerald-50 text-emerald-700 border-emerald-200" }
    : fullyAssigned > 0
    ? { label: "Partial Putaway", className: "bg-amber-50 text-amber-700 border-amber-200" }
    : { label: "Pending Putaway", className: "bg-red-50 text-red-700 border-red-200" }

  // Compute stock opname status
  const allItemsVerified = items.every((item) => {
    const opnameData = stockOpnameData[item.name]
    return opnameData?.verified === true
  })
  const anyItemVerified = items.some((item) => {
    const opnameData = stockOpnameData[item.name]
    return opnameData?.verified === true
  })
  const stockOpnameStatus = stockOpnameComplete
    ? { label: "Diverifikasi", className: "bg-emerald-50 text-emerald-700 border-emerald-200" }
    : allItemsVerified
    ? { label: "Diverifikasi", className: "bg-emerald-50 text-emerald-700 border-emerald-200" }
    : anyItemVerified
    ? { label: "In Progress", className: "bg-amber-50 text-amber-700 border-amber-200" }
    : { label: "Belum Diverifikasi", className: "bg-gray-100 text-gray-600 border-gray-200" }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm flex-wrap">
          <Warehouse className="h-4 w-4 text-indigo-600" />
          Assign to Warehouse
          <Badge variant="outline" className={`ml-auto text-xs ${assignmentStatus.className}`}>
            {assignmentStatus.label}
          </Badge>
          {putawayComplete && (
            <Badge variant="outline" className={`text-xs ${stockOpnameStatus.className}`}>
              <ClipboardCheck className="h-3 w-3 mr-1" />
              {stockOpnameStatus.label}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {saved && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm text-emerald-700 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Putaway confirmed successfully!
          </div>
        )}

        {/* Phase 1: Putaway - only show if not complete */}
        {!putawayComplete && (
          <>
            {items.map((item) => {
              const itemAllocs = getAllocations(item.name)
              const allocated = totalAllocated(item.name)
              const remaining = item.orderedQty - allocated
              const isComplete = allocated === item.orderedQty && item.orderedQty > 0

              return (
                <div key={item.name} className="border rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs">
                        <span className="font-medium">{allocated}</span>
                        <span className="text-muted-foreground"> / {item.orderedQty}</span> allocated
                      </p>
                      {remaining > 0 && (
                        <p className="text-xs text-amber-600">Remaining: {remaining}</p>
                      )}
                      {isComplete && (
                        <p className="text-xs text-emerald-600 flex items-center gap-1 justify-end">
                          <CheckCircle2 className="h-3 w-3" /> Complete
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Allocation rows */}
                  {itemAllocs.map((alloc, idx) => (
                    <div key={idx} className="flex items-center gap-2 ml-2">
                      <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                      <select
                        value={alloc.locationId}
                        onChange={(e) => updateAllocation(item.name, idx, "locationId", e.target.value)}
                        className="h-8 rounded-md border border-input bg-background px-2 text-xs flex-1"
                      >
                        {locations.map((loc) => (
                          <option key={loc.id} value={loc.id}>{loc.name}</option>
                        ))}
                      </select>
                      <select
                        value={alloc.rackId}
                        onChange={(e) => updateAllocation(item.name, idx, "rackId", e.target.value)}
                        className="h-8 rounded-md border border-input bg-background px-2 text-xs flex-1"
                      >
                        <option value="">Pilih Rak...</option>
                        {racksForLocation(alloc.locationId).map((rack) => (
                          <option key={rack.id} value={rack.id}>
                            {rack.name} ({rack.used}/{rack.capacity})
                          </option>
                        ))}
                      </select>
                      <Input
                        type="number"
                        value={alloc.qty}
                        onChange={(e) => updateAllocation(item.name, idx, "qty", e.target.value)}
                        placeholder="Qty"
                        className="h-8 w-20 text-xs"
                      />
                      <select
                        value={alloc.status}
                        onChange={(e) => updateAllocation(item.name, idx, "status", e.target.value)}
                        className="h-8 rounded-md border border-input bg-background px-2 text-xs w-32"
                      >
                        <option value="Baru Diterima">Baru Diterima</option>
                        <option value="Sudah Diopname">Sudah Diopname</option>
                        <option value="Rusak/Cacat">Rusak/Cacat</option>
                      </select>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="h-7 w-7 text-red-500 hover:text-red-600"
                        onClick={() => removeAllocation(item.name, idx)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}

                  {/* Add allocation button */}
                  {remaining > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-primary"
                      onClick={() => addAllocation(item.name)}
                    >
                      <Plus className="mr-1 h-3 w-3" /> Add Allocation
                    </Button>
                  )}
                </div>
              )
            })}

            {/* Confirm button */}
            {items.length > 0 && (
              <Button
                size="sm"
                className="w-full"
                onClick={handleConfirmAll}
                disabled={items.some((item) => totalAllocated(item.name) !== item.orderedQty)}
              >
                <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                Confirm Placement
              </Button>
            )}
          </>
        )}

        {/* Phase 2: Stock Opname - show after putaway complete */}
        {putawayComplete && !stockOpnameComplete && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <ClipboardCheck className="h-4 w-4" />
              Verifikasi Stok Opname
            </div>

            {items.map((item) => {
              const opnameData = stockOpnameData[item.name] || { actualQty: "", verified: false, notes: "" }
              const actualQtyNum = parseInt(opnameData.actualQty) || 0
              const isMatch = actualQtyNum === item.orderedQty && opnameData.actualQty !== ""
              const isMismatch = opnameData.actualQty !== "" && actualQtyNum !== item.orderedQty
              const difference = actualQtyNum - item.orderedQty

              return (
                <div key={item.name} className="border rounded-lg p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs">
                        <span className="text-muted-foreground">Dipesan: </span>
                        <span className="font-medium">{item.orderedQty}</span>
                      </p>
                    </div>
                  </div>

                  {/* Actual qty input */}
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-muted-foreground whitespace-nowrap">Qty Aktual:</label>
                    <Input
                      type="number"
                      value={opnameData.actualQty}
                      onChange={(e) => updateStockOpname(item.name, "actualQty", e.target.value)}
                      placeholder="Masukkan qty aktual"
                      className="h-8 w-32 text-xs"
                    />
                    {/* Match/mismatch indicator */}
                    {isMatch && (
                      <span className="text-xs text-emerald-600 flex items-center gap-1 font-medium">
                        <CheckCircle2 className="h-4 w-4" />
                        Sesuai
                      </span>
                    )}
                    {isMismatch && (
                      <span className="text-xs text-red-600 flex items-center gap-1 font-medium">
                        <AlertTriangle className="h-4 w-4" />
                        Tidak Sesuai (selisih: {difference > 0 ? `+${difference}` : difference})
                      </span>
                    )}
                  </div>

                  {/* Notes field */}
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-muted-foreground whitespace-nowrap">Catatan:</label>
                    <Input
                      type="text"
                      value={opnameData.notes}
                      onChange={(e) => updateStockOpname(item.name, "notes", e.target.value)}
                      placeholder="Opsional: catatan selisih"
                      className="h-8 flex-1 text-xs"
                    />
                  </div>

                  {/* Verified checkbox */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`verify-${item.name}`}
                      checked={opnameData.verified}
                      onChange={(e) => updateStockOpname(item.name, "verified", e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <label htmlFor={`verify-${item.name}`} className="text-xs text-muted-foreground">
                      Tandai sebagai diverifikasi
                    </label>
                  </div>
                </div>
              )
            })}

            {/* Complete Stock Opname button */}
            <Button
              size="sm"
              className="w-full"
              onClick={() => setStockOpnameComplete(true)}
              disabled={!allItemsVerified}
            >
              <ClipboardCheck className="mr-1.5 h-3.5 w-3.5" />
              Complete Stock Opname
            </Button>
          </div>
        )}

        {/* Stock Opname Complete */}
        {stockOpnameComplete && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-sm text-emerald-700 space-y-2">
            <div className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="h-5 w-5" />
              Stock Opname Selesai
            </div>
            <p className="text-xs text-emerald-600">
              Semua item telah diverifikasi dan sesuai dengan pesanan.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
