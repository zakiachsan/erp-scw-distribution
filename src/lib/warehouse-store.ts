"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Location {
  id: string
  name: string
}

export interface RackProduct {
  name: string
  qty: number
}

export interface CartonContent {
  productName: string
  estimatedQty: number
}

export interface Carton {
  id: string
  barcode: string
  poId: string
  productName: string
  contents: CartonContent[]
  rackId?: string
  status: "received" | "placed"
  createdAt: number
  openedAt?: number
}

export interface Rack {
  id: string
  name: string
  locationId: string
  status: "empty" | "occupied" | "full"
  capacity: number
  used: number
  products: RackProduct[]
  cartons: Carton[]
}

export interface RackLog {
  id: string
  rackId: string
  type: "in" | "out"
  productName: string
  qty: number
  relatedRackId: string
  relatedRackName: string
  timestamp: number
}

export interface ScanLog {
  id: string
  timestamp: number
  qty: number
  type: "item" | "carton" | "box"
  barcode?: string
  note?: string
}

export interface InboundReceiptItem {
  productName: string
  sku: string
  barcode: string
  orderedQty: number
  receivedQty: number
  storageType: "items" | "carton"
  rackId?: string
  scanLogs?: ScanLog[]
}

export interface InboundReceipt {
  id: string
  poId: string
  poNumber: string
  supplier: string
  receivedAt: number
  status: "receiving" | "assigned"
  items: InboundReceiptItem[]
  cartons: Carton[]
}

export interface InboundPOSource {
  id: string
  poNumber: string
  supplier: string
  shipDate: string
  expectedArrival: string
  items: {
    name: string
    sku: string
    barcode: string
    orderedQty: number
  }[]
}

const initialLocations: Location[] = [
  { id: "loc-1", name: "Gudang Utama" },
  { id: "loc-2", name: "Gudang Cabang" },
  { id: "loc-3", name: "Gudang Display" },
]

const initialRacksData: {
  id: string
  name: string
  locationId: string
  capacity: number
  products: RackProduct[]
}[] = [
  {
    id: "1",
    name: "Rak A-01",
    locationId: "loc-1",
    capacity: 200,
    products: [
      { name: "SCW Snow Foam", qty: 150 },
      { name: "SCW Shampoo Plus", qty: 35 },
    ],
  },
  {
    id: "2",
    name: "Rak A-02",
    locationId: "loc-1",
    capacity: 200,
    products: [
      { name: "SCW Ceramic Coating", qty: 40 },
      { name: "SCW Spray Wax", qty: 35 },
    ],
  },
  {
    id: "3",
    name: "Rak A-03",
    locationId: "loc-1",
    capacity: 200,
    products: [{ name: "SCW Microfiber Wash", qty: 120 }],
  },
  {
    id: "4",
    name: "Rak B-01",
    locationId: "loc-1",
    capacity: 200,
    products: [{ name: "SCW Interior Detailer", qty: 180 }],
  },
  {
    id: "5",
    name: "Rak B-02",
    locationId: "loc-1",
    capacity: 200,
    products: [{ name: "SCW Tire Gel", qty: 95 }],
  },
  {
    id: "6",
    name: "Rak C-01",
    locationId: "loc-1",
    capacity: 200,
    products: [],
  },
  {
    id: "7",
    name: "Rak C-02",
    locationId: "loc-1",
    capacity: 200,
    products: [
      { name: "SCW Polish Compound", qty: 25 },
      { name: "SCW Clay Bar", qty: 20 },
    ],
  },
  {
    id: "8",
    name: "Rak D-01",
    locationId: "loc-2",
    capacity: 150,
    products: [{ name: "SCW Glass Cleaner", qty: 100 }],
  },
  {
    id: "9",
    name: "Rak D-02",
    locationId: "loc-2",
    capacity: 150,
    products: [
      { name: "SCW Leather Conditioner", qty: 45 },
      { name: "SCW Dashboard Coating", qty: 95 },
    ],
  },
  {
    id: "10",
    name: "Rak E-01",
    locationId: "loc-2",
    capacity: 150,
    products: [{ name: "SCW Trim Restorer", qty: 67 }],
  },
  {
    id: "11",
    name: "Rak F-01",
    locationId: "loc-3",
    capacity: 100,
    products: [
      { name: "SCW Foam Pad", qty: 30 },
      { name: "SCW Microfiber Towel", qty: 25 },
    ],
  },
  {
    id: "12",
    name: "Rak F-02",
    locationId: "loc-3",
    capacity: 100,
    products: [],
  },
]

export const inboundPOSources: InboundPOSource[] = [
  {
    id: "po-001",
    poNumber: "PO-2026-0051",
    supplier: "PT Autocare Indonesia",
    shipDate: "2026-06-07",
    expectedArrival: "2026-06-12",
    items: [
      { name: "SCW Snow Foam", sku: "SCW-SF-001", barcode: "8991234567890", orderedQty: 50 },
      { name: "SCW Shampoo Plus", sku: "SCW-SP-018", barcode: "8991234567893", orderedQty: 30 },
      { name: "SCW Microfiber Towel", sku: "SCW-MF-015", barcode: "8991234567894", orderedQty: 100 },
    ],
  },
  {
    id: "po-002",
    poNumber: "PO-2026-0052",
    supplier: "ChemPro Asia",
    shipDate: "2026-06-08",
    expectedArrival: "2026-06-13",
    items: [
      { name: "SCW Ceramic Coating", sku: "SCW-CC-002", barcode: "8991234567891", orderedQty: 20 },
      { name: "SCW Spray Wax", sku: "SCW-SW-008", barcode: "8991234567895", orderedQty: 40 },
    ],
  },
  {
    id: "po-003",
    poNumber: "PO-2026-0053",
    supplier: "NanoTech Coatings",
    shipDate: "2026-06-09",
    expectedArrival: "2026-06-14",
    items: [
      { name: "SCW Interior Detailer", sku: "SCW-ID-003", barcode: "8991234567892", orderedQty: 60 },
      { name: "SCW Tire Gel", sku: "SCW-TG-004", barcode: "8991234567896", orderedQty: 45 },
    ],
  },
  {
    id: "po-004",
    poNumber: "PO-2026-0054",
    supplier: "DetailPro Supply",
    shipDate: "2026-06-09",
    expectedArrival: "2026-06-15",
    items: [
      { name: "SCW Glass Cleaner", sku: "SCW-GC-009", barcode: "8991234567897", orderedQty: 80 },
      { name: "SCW Leather Conditioner", sku: "SCW-LC-010", barcode: "8991234567898", orderedQty: 25 },
    ],
  },
  {
    id: "po-005",
    poNumber: "PO-2026-0055",
    supplier: "PT Autocare Indonesia",
    shipDate: "2026-06-06",
    expectedArrival: "2026-06-10",
    items: [
      { name: "SCW Polish Compound", sku: "SCW-PC-007", barcode: "8991234567899", orderedQty: 35 },
      { name: "SCW Clay Bar", sku: "SCW-CB-005", barcode: "8991234567900", orderedQty: 50 },
    ],
  },
  {
    id: "po-006",
    poNumber: "PO-2026-0056",
    supplier: "Mega Auto Supplies",
    shipDate: "2026-06-10",
    expectedArrival: "2026-06-16",
    items: [
      { name: "SCW Wheel Cleaner", sku: "SCW-WC-011", barcode: "8991234567901", orderedQty: 70 },
      { name: "SCW Bug Remover", sku: "SCW-BR-012", barcode: "8991234567902", orderedQty: 30 },
      { name: "SCW Tar Remover", sku: "SCW-TR-013", barcode: "8991234567903", orderedQty: 25 },
    ],
  },
  {
    id: "po-007",
    poNumber: "PO-2026-0057",
    supplier: "ChemPro Asia",
    shipDate: "2026-06-10",
    expectedArrival: "2026-06-17",
    items: [
      { name: "SCW Engine Degreaser", sku: "SCW-ED-014", barcode: "8991234567904", orderedQty: 40 },
      { name: "SCW Carpet Shampoo", sku: "SCW-CS-016", barcode: "8991234567905", orderedQty: 55 },
    ],
  },
  {
    id: "po-008",
    poNumber: "PO-2026-0058",
    supplier: "DetailPro Supply",
    shipDate: "2026-06-11",
    expectedArrival: "2026-06-18",
    items: [
      { name: "SCW Quick Detailer", sku: "SCW-QD-017", barcode: "8991234567906", orderedQty: 90 },
    ],
  },
  {
    id: "po-009",
    poNumber: "PO-2026-0059",
    supplier: "NanoTech Coatings",
    shipDate: "2026-06-09",
    expectedArrival: "2026-06-14",
    items: [
      { name: "SCW Paint Sealant", sku: "SCW-PS-019", barcode: "8991234567907", orderedQty: 20 },
      { name: "SCW Graphene Spray", sku: "SCW-GS-020", barcode: "8991234567908", orderedQty: 35 },
      { name: "SCW Water Spot Remover", sku: "SCW-WR-021", barcode: "8991234567909", orderedQty: 15 },
    ],
  },
  {
    id: "po-010",
    poNumber: "PO-2026-0060",
    supplier: "PT Autocare Indonesia",
    shipDate: "2026-06-12",
    expectedArrival: "2026-06-19",
    items: [
      { name: "SCW Tire Dressing", sku: "SCW-TD-022", barcode: "8991234567910", orderedQty: 60 },
      { name: "SCW Trim Restorer", sku: "SCW-TR-023", barcode: "8991234567911", orderedQty: 40 },
    ],
  },
]

function normalizeRack(
  rack: Omit<Rack, "status" | "used"> & Partial<Pick<Rack, "status" | "used">>
): Rack {
  const products = rack.products ?? []
  const cartons = rack.cartons ?? []
  const used = products.reduce((sum, p) => sum + p.qty, 0) + cartons.length
  let status: Rack["status"] = "empty"
  if (used >= rack.capacity) status = "full"
  else if (used > 0) status = "occupied"
  return { ...rack, products, cartons, used, status }
}

function nextLocationId(locations: Location[]): string {
  const numbers = locations
    .map((l) => Number(l.id.replace("loc-", "")))
    .filter((n) => !Number.isNaN(n))
  const next = numbers.length ? Math.max(...numbers) + 1 : 1
  return `loc-${next}`
}

function nextRackId(racks: Rack[]): string {
  const numbers = racks.map((r) => Number(r.id)).filter((n) => !Number.isNaN(n))
  const next = numbers.length ? Math.max(...numbers) + 1 : 1
  return String(next)
}

function nextReceiptId(receipts: InboundReceipt[]): string {
  const numbers = receipts
    .map((r) => Number(r.id.replace("rec-", "")))
    .filter((n) => !Number.isNaN(n))
  const next = numbers.length ? Math.max(...numbers) + 1 : 1
  return `rec-${next}`
}

function logId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function createReceiptFromPO(po: InboundPOSource): InboundReceipt {
  return {
    id: nextReceiptId([]),
    poId: po.id,
    poNumber: po.poNumber,
    supplier: po.supplier,
    receivedAt: Date.now(),
    status: "receiving",
    items: po.items.map((item) => ({
      productName: item.name,
      sku: item.sku,
      barcode: item.barcode,
      orderedQty: item.orderedQty,
      receivedQty: 0,
      storageType: "items",
      scanLogs: [],
    })),
    cartons: [],
  }
}

interface WarehouseState {
  locations: Location[]
  racks: Rack[]
  logs: RackLog[]
  inboundReceipts: InboundReceipt[]
  addLocation: (name: string) => void
  updateLocation: (id: string, name: string) => void
  deleteLocation: (id: string) => void
  addRack: (rack: { name: string; locationId: string; capacity: number }) => void
  updateRack: (
    id: string,
    changes: Partial<Omit<Rack, "id" | "status" | "used">>
  ) => void
  deleteRack: (id: string) => void
  moveProduct: (payload: {
    fromRackId: string
    toRackId: string
    productName: string
    qty: number
  }) => void
  startReceipt: (po: InboundPOSource) => InboundReceipt
  scanProductBarcode: (poId: string, barcode: string) => { ok: boolean; message: string }
  adjustReceivedQty: (
    poId: string,
    productName: string,
    delta: number
  ) => { ok: boolean; message: string }
  setItemStorageType: (
    poId: string,
    productName: string,
    storageType: "items" | "carton"
  ) => void
  addCarton: (
    poId: string,
    productName: string,
    barcode: string,
    contents: CartonContent[]
  ) => { ok: boolean; message: string }
  unboxCarton: (cartonId: string) => { ok: boolean; message: string }
  assignItemToRack: (poId: string, productName: string, rackId: string) => void
  assignCartonToRack: (cartonId: string, rackId: string) => void
  confirmPlacement: (poId: string) => { ok: boolean; message: string }
}

export const useWarehouseStore = create<WarehouseState>()(
  persist(
    (set, get) => ({
      locations: initialLocations,
      racks: initialRacksData.map((rack) =>
        normalizeRack({ ...rack, cartons: [] })
      ),
      logs: [],
      inboundReceipts: [
        {
          id: "rec-004",
          poId: "po-004",
          poNumber: "PO-2026-0054",
          supplier: "DetailPro Supply",
          receivedAt: Date.now() - 86400000,
          status: "assigned",
          items: [
            {
              productName: "SCW Glass Cleaner",
              sku: "SCW-GC-009",
              barcode: "8991234567897",
              orderedQty: 80,
              receivedQty: 80,
              storageType: "items",
              rackId: "1",
              scanLogs: [
                { id: "sl-d1", timestamp: Date.now() - 86400000, qty: 80, type: "item", barcode: "8991234567897", note: "Scan manual" },
              ],
            },
            {
              productName: "SCW Leather Conditioner",
              sku: "SCW-LC-010",
              barcode: "8991234567898",
              orderedQty: 25,
              receivedQty: 25,
              storageType: "items",
              rackId: "2",
              scanLogs: [
                { id: "sl-d2", timestamp: Date.now() - 85000000, qty: 25, type: "item", barcode: "8991234567898", note: "Scan manual" },
              ],
            },
          ],
          cartons: [],
        },
        {
          id: "rec-005",
          poId: "po-005",
          poNumber: "PO-2026-0055",
          supplier: "PT Autocare Indonesia",
          receivedAt: Date.now() - 43200000,
          status: "receiving",
          items: [
            {
              productName: "SCW Polish Compound",
              sku: "SCW-PC-007",
              barcode: "8991234567899",
              orderedQty: 35,
              receivedQty: 35,
              storageType: "items",
              rackId: "",
              scanLogs: [
                { id: "sl-d3", timestamp: Date.now() - 43200000, qty: 35, type: "item", barcode: "8991234567899", note: "Scan manual" },
              ],
            },
            {
              productName: "SCW Clay Bar",
              sku: "SCW-CB-005",
              barcode: "8991234567900",
              orderedQty: 50,
              receivedQty: 50,
              storageType: "items",
              rackId: "",
              scanLogs: [
                { id: "sl-d4", timestamp: Date.now() - 42000000, qty: 50, type: "item", barcode: "8991234567900", note: "Scan manual" },
              ],
            },
          ],
          cartons: [],
        },
        {
          id: "rec-002",
          poId: "po-002",
          poNumber: "PO-2026-0052",
          supplier: "ChemPro Asia",
          receivedAt: Date.now() - 21600000,
          status: "receiving",
          items: [
            {
              productName: "SCW Ceramic Coating",
              sku: "SCW-CC-002",
              barcode: "8991234567891",
              orderedQty: 20,
              receivedQty: 10,
              storageType: "items",
              rackId: "",
              scanLogs: [
                { id: "sl-d5", timestamp: Date.now() - 21600000, qty: 10, type: "item", barcode: "8991234567891", note: "Scan manual" },
              ],
            },
            {
              productName: "SCW Spray Wax",
              sku: "SCW-SW-008",
              barcode: "8991234567895",
              orderedQty: 40,
              receivedQty: 0,
              storageType: "items",
              rackId: "",
              scanLogs: [],
            },
          ],
          cartons: [],
        },
        {
          id: "rec-003",
          poId: "po-003",
          poNumber: "PO-2026-0053",
          supplier: "NanoTech Coatings",
          receivedAt: Date.now() - 10800000,
          status: "receiving",
          items: [
            {
              productName: "SCW Interior Detailer",
              sku: "SCW-ID-003",
              barcode: "8991234567892",
              orderedQty: 60,
              receivedQty: 30,
              storageType: "items",
              rackId: "3",
              scanLogs: [
                { id: "sl-d6", timestamp: Date.now() - 10800000, qty: 30, type: "item", barcode: "8991234567892", note: "Scan manual" },
              ],
            },
            {
              productName: "SCW Tire Gel",
              sku: "SCW-TG-004",
              barcode: "8991234567896",
              orderedQty: 45,
              receivedQty: 20,
              storageType: "items",
              rackId: "",
              scanLogs: [
                { id: "sl-d7", timestamp: Date.now() - 7200000, qty: 20, type: "item", barcode: "8991234567896", note: "Scan manual" },
              ],
            },
          ],
          cartons: [],
        },
      ],

      addLocation: (name) =>
        set((state) => ({
          locations: [
            ...state.locations,
            { id: nextLocationId(state.locations), name },
          ],
        })),

      updateLocation: (id, name) =>
        set((state) => ({
          locations: state.locations.map((loc) =>
            loc.id === id ? { ...loc, name } : loc
          ),
        })),

      deleteLocation: (id) =>
        set((state) => ({
          locations: state.locations.filter((loc) => loc.id !== id),
        })),

      addRack: (rack) =>
        set((state) => {
          const newRack = normalizeRack({
            id: nextRackId(state.racks),
            ...rack,
            products: [],
            cartons: [],
          })
          return { racks: [...state.racks, newRack] }
        }),

      updateRack: (id, changes) =>
        set((state) => ({
          racks: state.racks.map((rack) =>
            rack.id === id ? normalizeRack({ ...rack, ...changes }) : rack
          ),
        })),

      deleteRack: (id) =>
        set((state) => ({
          racks: state.racks.filter((rack) => rack.id !== id),
        })),

      moveProduct: ({ fromRackId, toRackId, productName, qty }) =>
        set((state) => {
          if (qty <= 0 || fromRackId === toRackId) return state

          const sourceRack = state.racks.find((r) => r.id === fromRackId)
          const targetRack = state.racks.find((r) => r.id === toRackId)
          if (!sourceRack || !targetRack) return state

          const racks = state.racks.map((rack) => {
            if (rack.id === fromRackId) {
              const products = rack.products
                .map((p) =>
                  p.name === productName ? { ...p, qty: p.qty - qty } : p
                )
                .filter((p) => p.qty > 0)
              return normalizeRack({ ...rack, products })
            }

            if (rack.id === toRackId) {
              const existing = rack.products.find((p) => p.name === productName)
              const products = existing
                ? rack.products.map((p) =>
                    p.name === productName ? { ...p, qty: p.qty + qty } : p
                  )
                : [...rack.products, { name: productName, qty }]
              return normalizeRack({ ...rack, products })
            }

            return rack
          })

          const logs: RackLog[] = [
            ...state.logs,
            {
              id: logId(),
              rackId: fromRackId,
              type: "out",
              productName,
              qty,
              relatedRackId: toRackId,
              relatedRackName: targetRack.name,
              timestamp: Date.now(),
            },
            {
              id: logId(),
              rackId: toRackId,
              type: "in",
              productName,
              qty,
              relatedRackId: fromRackId,
              relatedRackName: sourceRack.name,
              timestamp: Date.now(),
            },
          ]

          return { racks, logs }
        }),

      startReceipt: (po) => {
        const existing = get().inboundReceipts.find((r) => r.poId === po.id)
        if (existing) return existing

        const receipt: InboundReceipt = {
          ...createReceiptFromPO(po),
          id: nextReceiptId(get().inboundReceipts),
        }
        set((state) => ({
          inboundReceipts: [...state.inboundReceipts, receipt],
        }))
        return receipt
      },

      scanProductBarcode: (poId, barcode) => {
        const receipt = get().inboundReceipts.find((r) => r.poId === poId)
        if (!receipt) return { ok: false, message: "Receipt tidak ditemukan" }

        const item = receipt.items.find(
          (i) => i.barcode === barcode && i.storageType === "items"
        )
        if (!item)
          return {
            ok: false,
            message: `Barcode ${barcode} tidak cocok dengan produk PO ini`,
          }

        if (item.receivedQty >= item.orderedQty) {
          return {
            ok: false,
            message: `${item.productName} sudah mencapai ordered qty`,
          }
        }

        set((state) => ({
          inboundReceipts: state.inboundReceipts.map((r) => {
            if (r.poId !== poId) return r
            return {
              ...r,
              items: r.items.map((i) =>
                i.productName === item.productName
                  ? {
                      ...i,
                      receivedQty: i.receivedQty + 1,
                      scanLogs: [
                        ...(i.scanLogs ?? []),
                        {
                          id: logId(),
                          timestamp: Date.now(),
                          qty: 1,
                          type: "item",
                        },
                      ],
                    }
                  : i
              ),
            }
          }),
        }))
        return { ok: true, message: `${item.productName} +1` }
      },

      adjustReceivedQty: (poId, productName, delta) => {
        const receipt = get().inboundReceipts.find((r) => r.poId === poId)
        if (!receipt) return { ok: false, message: "Receipt tidak ditemukan" }

        const item = receipt.items.find((i) => i.productName === productName)
        if (!item) return { ok: false, message: "Produk tidak ditemukan" }

        const newQty = item.receivedQty + delta
        if (newQty < 0)
          return { ok: false, message: "Received qty tidak boleh negatif" }
        if (newQty > item.orderedQty)
          return { ok: false, message: "Received qty melebihi ordered qty" }

        set((state) => ({
          inboundReceipts: state.inboundReceipts.map((r) => {
            if (r.poId !== poId) return r
            return {
              ...r,
              items: r.items.map((i) =>
                i.productName === productName
                  ? {
                      ...i,
                      receivedQty: newQty,
                      scanLogs: [
                        ...(i.scanLogs ?? []),
                        {
                          id: logId(),
                          timestamp: Date.now(),
                          qty: delta,
                          type: "item",
                          note: delta > 0 ? "Manual +1" : "Koreksi -1",
                        },
                      ],
                    }
                  : i
              ),
            }
          }),
        }))
        return { ok: true, message: `${item.productName} ${delta > 0 ? "+" : ""}${delta}` }
      },

      setItemStorageType: (poId, productName, storageType) =>
        set((state) => ({
          inboundReceipts: state.inboundReceipts.map((r) => {
            if (r.poId !== poId) return r
            return {
              ...r,
              items: r.items.map((i) =>
                i.productName === productName ? { ...i, storageType } : i
              ),
            }
          }),
        })),

      addCarton: (poId, productName, barcode, contents) => {
        const receipt = get().inboundReceipts.find((r) => r.poId === poId)
        if (!receipt) return { ok: false, message: "Receipt tidak ditemukan" }

        const barcodeExists =
          receipt.cartons.some((c) => c.barcode === barcode) ||
          receipt.items.some((i) => i.barcode === barcode)
        if (barcodeExists)
          return { ok: false, message: "Barcode sudah digunakan" }

        if (!contents.length)
          return { ok: false, message: "Isi box tidak boleh kosong" }

        const carton: Carton = {
          id: `box-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          barcode,
          poId,
          productName,
          contents,
          status: "received",
          createdAt: Date.now(),
        }

        set((state) => ({
          inboundReceipts: state.inboundReceipts.map((r) => {
            if (r.poId !== poId) return r
            return {
              ...r,
              cartons: [...r.cartons, carton],
              items: r.items.map((i) =>
                i.productName === productName
                  ? {
                      ...i,
                      scanLogs: [
                        ...(i.scanLogs ?? []),
                        {
                          id: logId(),
                          timestamp: Date.now(),
                          qty: contents.reduce(
                            (sum, c) => sum + c.estimatedQty,
                            0
                          ),
                          type: "box",
                          barcode,
                          note: "Dibuatkan box",
                        },
                      ],
                    }
                  : i
              ),
            }
          }),
        }))
        return { ok: true, message: "Box berhasil dibuat" }
      },

      unboxCarton: (cartonId) => {
        set((state) => ({
          inboundReceipts: state.inboundReceipts.map((r) => ({
            ...r,
            cartons: r.cartons.filter((c) => c.id !== cartonId),
            items: r.items.map((i) => {
              const carton = r.cartons.find(
                (c) => c.id === cartonId && c.productName === i.productName
              )
              if (!carton) return i
              return {
                ...i,
                scanLogs: [
                  ...(i.scanLogs ?? []),
                  {
                    id: logId(),
                    timestamp: Date.now(),
                    qty: 0,
                    type: "box",
                    barcode: carton.barcode,
                    note: "Box dibuka, lanjutkan scan item",
                  },
                ],
              }
            }),
          })),
        }))
        return { ok: true, message: "Box dibuka, silakan scan item" }
      },

      assignItemToRack: (poId, productName, rackId) =>
        set((state) => ({
          inboundReceipts: state.inboundReceipts.map((r) => {
            if (r.poId !== poId) return r
            return {
              ...r,
              items: r.items.map((i) =>
                i.productName === productName ? { ...i, rackId } : i
              ),
            }
          }),
        })),

      assignCartonToRack: (cartonId, rackId) =>
        set((state) => ({
          inboundReceipts: state.inboundReceipts.map((r) => ({
            ...r,
            cartons: r.cartons.map((c) =>
              c.id === cartonId ? { ...c, rackId } : c
            ),
          })),
        })),

      confirmPlacement: (poId) => {
        const state = get()
        const receipt = state.inboundReceipts.find((r) => r.poId === poId)
        if (!receipt) return { ok: false, message: "Receipt tidak ditemukan" }
        if (receipt.status === "assigned")
          return { ok: false, message: "Receipt sudah di-assign" }

        const itemsReady = receipt.items.every((i) => {
          if (i.storageType === "items") return i.receivedQty > 0 && i.rackId
          return true
        })
        const cartonsReady = receipt.cartons.every((c) => c.rackId)
        if (!itemsReady || !cartonsReady)
          return { ok: false, message: "Semua item/kardus belum ditugaskan ke rak" }

        const racks = state.racks.map((rack) => {
          let products = rack.products
          let cartons = rack.cartons

          receipt.items.forEach((item) => {
            if (item.storageType !== "items" || item.rackId !== rack.id) return
            const existing = products.find((p) => p.name === item.productName)
            products = existing
              ? products.map((p) =>
                  p.name === item.productName
                    ? { ...p, qty: p.qty + item.receivedQty }
                    : p
                )
              : [...products, { name: item.productName, qty: item.receivedQty }]
          })

          receipt.cartons.forEach((carton) => {
            if (carton.rackId !== rack.id) return
            cartons = [
              ...cartons,
              { ...carton, status: "placed" as const },
            ]
          })

          if (
            products !== rack.products ||
            cartons !== rack.cartons
          ) {
            return normalizeRack({ ...rack, products, cartons })
          }
          return rack
        })

        const logs: RackLog[] = [...state.logs]
        receipt.items.forEach((item) => {
          if (item.storageType !== "items" || !item.rackId) return
          const rack = racks.find((r) => r.id === item.rackId)
          if (!rack) return
          logs.push({
            id: logId(),
            rackId: item.rackId,
            type: "in",
            productName: item.productName,
            qty: item.receivedQty,
            relatedRackId: "inbound",
            relatedRackName: `Inbound ${receipt.poNumber}`,
            timestamp: Date.now(),
          })
        })

        receipt.cartons.forEach((carton) => {
          if (!carton.rackId) return
          const rack = racks.find((r) => r.id === carton.rackId)
          if (!rack) return
          logs.push({
            id: logId(),
            rackId: carton.rackId,
            type: "in",
            productName: `Kardus ${carton.barcode}`,
            qty: 1,
            relatedRackId: "inbound",
            relatedRackName: `Inbound ${receipt.poNumber}`,
            timestamp: Date.now(),
          })
        })

        const inboundReceipts = state.inboundReceipts.map((r) =>
          r.poId === poId ? { ...r, status: "assigned" as const } : r
        )

        set({ racks, logs, inboundReceipts })
        return { ok: true, message: "Penempatan berhasil dikonfirmasi" }
      },
    }),
    {
      name: "scw-warehouse",
      version: 1,
      migrate: (persistedState: unknown) => {
        const state = persistedState as Partial<WarehouseState> | undefined
        if (state?.racks) {
          state.racks = state.racks.map((rack) =>
            normalizeRack({
              ...rack,
              products: rack.products ?? [],
              cartons: rack.cartons ?? [],
            })
          )
        }
        return state as WarehouseState
      },
    }
  )
)
