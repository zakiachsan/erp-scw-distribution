"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowLeft,
  Plus,
  Trash2,
  FileText,
  CheckCircle2,
  Search,
  CreditCard,
} from "lucide-react"

const formatIDR = (val: number) =>
  `Rp ${val.toLocaleString("id-ID")}`

const customers = [
  { id: "C001", name: "PT Autogloss Indonesia", tier: "Platinum" },
  { id: "C002", name: "CV Ceramic Pro JKT", tier: "Gold" },
  { id: "C003", name: "UD Shinemax", tier: "Gold" },
  { id: "C004", name: "PT DetailWorks BDG", tier: "Silver" },
  { id: "C005", name: "CV ProShine SBY", tier: "Silver" },
  { id: "C006", name: "AutoCare Makassar", tier: "Bronze" },
  { id: "C007", name: "GlossUp Bali", tier: "Silver" },
  { id: "C008", name: "DetailPro Semarang", tier: "Bronze" },
]

const products = [
  { id: "P01", sku: "SCW-SF-001", name: "SCW Snow Foam", price: 150000, unit: "pcs" },
  { id: "P02", sku: "SCW-CC-002", name: "SCW Ceramic Coating", price: 250000, unit: "pcs" },
  { id: "P03", sku: "SCW-ID-003", name: "SCW Interior Detailer", price: 120000, unit: "pcs" },
  { id: "P04", sku: "SCW-TG-004", name: "SCW Tire Gel", price: 95000, unit: "pcs" },
  { id: "P05", sku: "SCW-SW-008", name: "SCW Spray Wax", price: 110000, unit: "pcs" },
  { id: "P06", sku: "SCW-GC-009", name: "SCW Glass Cleaner", price: 85000, unit: "pcs" },
  { id: "P07", sku: "SCW-PC-007", name: "SCW Polish Compound", price: 180000, unit: "pcs" },
  { id: "P08", sku: "SCW-SP-018", name: "SCW Shampoo Plus", price: 90000, unit: "pcs" },
  { id: "P09", sku: "SCW-IL-017", name: "SCW Iron Decontamination", price: 135000, unit: "pcs" },
  { id: "P10", sku: "SCW-AW-011", name: "SCW All Purpose Cleaner", price: 105000, unit: "pcs" },
]

// Mock quotations that can be converted to invoices
const quotations = [
  { id: "SQ.2026.06.00001", customer: "C001", date: "2026-06-18", items: [{ productId: "P01", qty: 20, price: 150000, discountPct: 5 }, { productId: "P03", qty: 15, price: 120000, discountPct: 3 }] },
  { id: "SQ.2026.06.00002", customer: "C002", date: "2026-06-17", items: [{ productId: "P02", qty: 25, price: 250000, discountPct: 10 }] },
  { id: "SQ.2026.06.00004", customer: "C004", date: "2026-06-15", items: [{ productId: "P02", qty: 30, price: 250000, discountPct: 8 }, { productId: "P07", qty: 20, price: 180000, discountPct: 5 }] },
  { id: "SQ.2026.06.00007", customer: "C007", date: "2026-06-10", items: [{ productId: "P02", qty: 15, price: 250000, discountPct: 8 }, { productId: "P04", qty: 25, price: 95000, discountPct: 5 }] },
  { id: "SQ.2026.06.00009", customer: "C001", date: "2026-06-05", items: [{ productId: "P01", qty: 50, price: 150000, discountPct: 12 }, { productId: "P05", qty: 30, price: 110000, discountPct: 8 }, { productId: "P08", qty: 40, price: 90000, discountPct: 5 }] },
]

function generateInvoiceNumber(): string {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, "0")
  const seq = String(Math.floor(Math.random() * 99999) + 1).padStart(5, "0")
  return `INV.${y}.${m}.${seq}`
}

interface InvoiceItem {
  productId: string
  qty: number
  price: number
  discountPct: number
}

export default function CreateInvoicePage() {
  const [invoiceNumber, setInvoiceNumber] = useState(generateInvoiceNumber)
  const [selectedCustomer, setSelectedCustomer] = useState("")
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split("T")[0])
  const [dueDate, setDueDate] = useState("")
  const [paymentTerms, setPaymentTerms] = useState("Net 30")
  const [notes, setNotes] = useState("")
  const [items, setItems] = useState<InvoiceItem[]>([])
  const [customerSearch, setCustomerSearch] = useState("")
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false)
  const [selectedQuotation, setSelectedQuotation] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const filteredCustomers = useMemo(() => {
    if (!customerSearch) return customers
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
        c.id.toLowerCase().includes(customerSearch.toLowerCase())
    )
  }, [customerSearch])

  const selectedCustomerData = customers.find((c) => c.id === selectedCustomer)

  // Filter quotations by selected customer
  const customerQuotations = useMemo(() => {
    if (!selectedCustomer) return []
    return quotations.filter((q) => q.customer === selectedCustomer)
  }, [selectedCustomer])

  const addItem = () => {
    setItems([...items, { productId: "", qty: 1, price: 0, discountPct: 0 }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...items]
    if (field === "productId") {
      const product = products.find((p) => p.id === value)
      if (product) {
        newItems[index] = {
          ...newItems[index],
          productId: value as string,
          price: product.price,
        }
      }
    } else {
      newItems[index] = { ...newItems[index], [field]: value }
    }
    setItems(newItems)
  }

  // Load from quotation
  const loadFromQuotation = (quotationId: string) => {
    const quote = quotations.find((q) => q.id === quotationId)
    if (quote) {
      setSelectedQuotation(quotationId)
      setItems(quote.items.map((qi) => ({ ...qi })))
      setSelectedCustomer(quote.customer)
      setCustomerSearch("")
    }
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const totalDiscount = items.reduce(
    (sum, item) => sum + Math.round(item.price * item.qty * (item.discountPct / 100)),
    0
  )
  const total = subtotal - totalDiscount

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCustomer || items.length === 0) return
    setIsSubmitting(true)
    setTimeout(() => {
      setSubmitted(true)
      setIsSubmitting(false)
    }, 1000)
  }

  if (submitted) {
    return (
      <div className="space-y-4 p-6">
        <div>
          <h1 className="text-lg font-bold text-[#181818]">Faktur Penjualan</h1>
          <p className="text-xs text-[#706e6b]">Buat faktur penjualan baru</p>
        </div>
        <Card className="border border-[#e0e0e0] shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-7 w-7 text-emerald-600" />
            </div>
            <h2 className="mb-1 text-lg font-semibold text-[#181818]">Faktur Dibuat!</h2>
            <p className="mb-1 text-sm text-[#706e6b]">
              Faktur untuk <strong>{selectedCustomerData?.name}</strong> dengan nomor <strong>{invoiceNumber}</strong>
            </p>
            <p className="mb-5 text-lg font-bold text-[#181818]">{formatIDR(total)}</p>
            <div className="flex gap-2">
              <Link href="/accounting/sales/invoices">
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                  Kembali
                </Button>
              </Link>
              <Button
                size="sm"
                className="h-8 text-xs bg-[#0176d3] hover:bg-[#014486] text-white"
                onClick={() => {
                  setSubmitted(false)
                  setSelectedCustomer("")
                  setItems([])
                  setInvoiceNumber(generateInvoiceNumber())
                  setCustomerSearch("")
                  setNotes("")
                  setSelectedQuotation("")
                }}
              >
                Buat Faktur Lain
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4 p-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link
            href="/accounting/sales/invoices"
            className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-[#181818]">Buat Faktur Penjualan</h1>
            <p className="text-xs text-[#706e6b]">Isi data faktur untuk pelanggan</p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          {/* Main Content */}
          <div className="space-y-4">
            {/* Header Info */}
            <Card className="border border-[#e0e0e0] shadow-sm">
              <CardHeader className="px-4 py-3 border-b border-[#e0e0e0]">
                <CardTitle className="text-sm font-bold text-[#181818] flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Data Faktur
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-[11px] uppercase tracking-wider font-bold text-[#3e3e3c]">Nomor Faktur</Label>
                    <Input
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                      className="h-8 text-[13px] font-mono border-[#e0e0e0]"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[11px] uppercase tracking-wider font-bold text-[#3e3e3c]">Tanggal Faktur *</Label>
                    <Input
                      type="date"
                      value={invoiceDate}
                      onChange={(e) => setInvoiceDate(e.target.value)}
                      className="h-8 text-[13px] border-[#e0e0e0]"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[11px] uppercase tracking-wider font-bold text-[#3e3e3c]">Jatuh Tempo</Label>
                    <Input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="h-8 text-[13px] border-[#e0e0e0]"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[11px] uppercase tracking-wider font-bold text-[#3e3e3c]">Payment Terms</Label>
                    <Select value={paymentTerms} onValueChange={(v) => setPaymentTerms(v ?? "Net 30")}>
                      <SelectTrigger className="h-8 text-[13px] border-[#e0e0e0]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="COD">COD (Cash on Delivery)</SelectItem>
                        <SelectItem value="Net 7">Net 7 Hari</SelectItem>
                        <SelectItem value="Net 14">Net 14 Hari</SelectItem>
                        <SelectItem value="Net 30">Net 30 Hari</SelectItem>
                        <SelectItem value="Net 60">Net 60 Hari</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer */}
            <Card className="border border-[#e0e0e0] shadow-sm">
              <CardHeader className="px-4 py-3 border-b border-[#e0e0e0]">
                <CardTitle className="text-sm font-bold text-[#181818]">Pelanggan</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <div className="space-y-1">
                  <Label className="text-[11px] uppercase tracking-wider font-bold text-[#3e3e3c]">Cari / Pilih Pelanggan *</Label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#706e6b] z-10" />
                    <Input
                      placeholder="Ketik nama atau kode pelanggan..."
                      value={selectedCustomer ? selectedCustomerData?.name || "" : customerSearch}
                      onChange={(e) => {
                        setCustomerSearch(e.target.value)
                        setSelectedCustomer("")
                        setShowCustomerDropdown(true)
                        setSelectedQuotation("")
                        setItems([])
                      }}
                      onFocus={() => setShowCustomerDropdown(true)}
                      onBlur={() => setTimeout(() => setShowCustomerDropdown(false), 200)}
                      className="h-8 pl-8 text-[13px] border-[#e0e0e0]"
                    />
                    {showCustomerDropdown && !selectedCustomer && customerSearch && (
                      <div className="absolute z-20 mt-1 w-full rounded-md border border-[#e0e0e0] bg-white shadow-lg">
                        {filteredCustomers.length === 0 ? (
                          <div className="px-3 py-2 text-[13px] text-[#706e6b]">
                            Tidak ada pelanggan ditemukan
                          </div>
                        ) : (
                          filteredCustomers.map((c) => (
                            <button
                              key={c.id}
                              type="button"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => {
                                setSelectedCustomer(c.id)
                                setCustomerSearch("")
                                setShowCustomerDropdown(false)
                                setSelectedQuotation("")
                                setItems([])
                              }}
                              className="flex w-full items-center justify-between px-3 py-2 text-[13px] hover:bg-[#f0f7ff] transition-colors"
                            >
                              <span>{c.name}</span>
                              <span className="text-xs text-[#706e6b]">{c.tier}</span>
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                  {selectedCustomerData && (
                    <div className="flex items-center gap-2 rounded-lg border border-[#e0e0e0] bg-[#f8f8f8] p-2.5">
                      <span className="text-[13px] font-medium text-[#181818]">{selectedCustomerData.name}</span>
                      <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-medium text-indigo-700">
                        {selectedCustomerData.tier}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCustomer("")
                          setCustomerSearch("")
                          setSelectedQuotation("")
                          setItems([])
                        }}
                        className="ml-auto text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Quotation Selector */}
                {selectedCustomer && customerQuotations.length > 0 && (
                  <div className="space-y-1">
                    <Label className="text-[11px] uppercase tracking-wider font-bold text-[#3e3e3c]">Muat dari Penawaran (opsional)</Label>
                    <Select value={selectedQuotation} onValueChange={(v) => { if (v) loadFromQuotation(v) }}>
                      <SelectTrigger className="h-8 text-[13px] border-[#e0e0e0]">
                        <SelectValue placeholder="Pilih penawaran untuk dijadikan faktur" />
                      </SelectTrigger>
                      <SelectContent>
                        {customerQuotations.map((q) => (
                          <SelectItem key={q.id} value={q.id}>
                            {q.id} ({q.date})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Item Table */}
            <Card className="border border-[#e0e0e0] shadow-sm">
              <CardHeader className="px-4 py-3 border-b border-[#e0e0e0]">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm font-bold text-[#181818]">Item Faktur</CardTitle>
                    <CardDescription className="text-[11px] text-[#706e6b]">Daftar produk yang difakturkan</CardDescription>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={addItem} className="h-8 text-xs border-[#e0e0e0]">
                    <Plus className="mr-1.5 h-3.5 w-3.5" />
                    Tambah Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {items.length === 0 ? (
                  <div className="text-center py-8 text-[#706e6b]">
                    <FileText className="mx-auto h-8 w-8 mb-2 opacity-50" />
                    <p className="text-[13px]">Belum ada item. Klik &quot;Tambah Item&quot; atau muat dari penawaran.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#f0f0f0] bg-white">
                          <th className="px-3 py-2 text-[11px] uppercase tracking-wider font-bold text-[#706e6b] text-left">Nama Item</th>
                          <th className="px-3 py-2 text-[11px] uppercase tracking-wider font-bold text-[#706e6b] text-left w-28">Kode #</th>
                          <th className="px-3 py-2 text-[11px] uppercase tracking-wider font-bold text-[#706e6b] text-center w-20">Qty</th>
                          <th className="px-3 py-2 text-[11px] uppercase tracking-wider font-bold text-[#706e6b] text-left w-16">Satuan</th>
                          <th className="px-3 py-2 text-[11px] uppercase tracking-wider font-bold text-[#706e6b] text-right w-28">@Harga</th>
                          <th className="px-3 py-2 text-[11px] uppercase tracking-wider font-bold text-[#706e6b] text-right w-20">Disc %</th>
                          <th className="px-3 py-2 text-[11px] uppercase tracking-wider font-bold text-[#706e6b] text-right w-32">Total Harga</th>
                          <th className="px-3 py-2 w-10"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, index) => {
                          const product = products.find((p) => p.id === item.productId)
                          const lineTotal = Math.round(
                            item.price * item.qty * (1 - item.discountPct / 100)
                          )
                          return (
                            <tr key={index} className="border-b border-[#f0f0f0] last:border-0 hover:bg-[#f0f7ff]">
                              <td className="px-3 py-1.5">
                                <Select
                                  value={item.productId}
                                  onValueChange={(v) => updateItem(index, "productId", v ?? "")}
                                >
                                  <SelectTrigger className="w-full h-8 text-[13px] border-[#e0e0e0]">
                                    <SelectValue placeholder="Pilih produk">
                                      {product ? product.name : "Pilih produk"}
                                    </SelectValue>
                                  </SelectTrigger>
                                  <SelectContent>
                                    {products.map((p) => (
                                      <SelectItem key={p.id} value={p.id}>
                                        {p.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </td>
                              <td className="px-3 py-1.5 text-[13px] text-[#706e6b] font-mono">
                                {product?.sku || "-"}
                              </td>
                              <td className="px-3 py-1.5">
                                <Input
                                  type="number"
                                  min={1}
                                  value={item.qty}
                                  onChange={(e) =>
                                    updateItem(index, "qty", parseInt(e.target.value) || 1)
                                  }
                                  className="h-8 text-[13px] w-16 text-center border-[#e0e0e0]"
                                />
                              </td>
                              <td className="px-3 py-1.5 text-[13px] text-[#706e6b]">
                                {product?.unit || "pcs"}
                              </td>
                              <td className="px-3 py-1.5 text-[13px] text-right">
                                {formatIDR(item.price)}
                              </td>
                              <td className="px-3 py-1.5">
                                <Input
                                  type="number"
                                  min={0}
                                  max={100}
                                  value={item.discountPct}
                                  onChange={(e) =>
                                    updateItem(
                                      index,
                                      "discountPct",
                                      Math.min(100, Math.max(0, parseInt(e.target.value) || 0))
                                    )
                                  }
                                  className="h-8 text-[13px] w-14 text-right border-[#e0e0e0]"
                                />
                              </td>
                              <td className="px-3 py-1.5 text-[13px] text-right font-medium text-[#181818]">
                                {formatIDR(lineTotal)}
                              </td>
                              <td className="px-3 py-1.5">
                                <button
                                  type="button"
                                  onClick={() => removeItem(index)}
                                  className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Notes */}
            <Card className="border border-[#e0e0e0] shadow-sm">
              <CardHeader className="px-4 py-3 border-b border-[#e0e0e0]">
                <CardTitle className="text-sm font-bold text-[#181818]">Catatan</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Textarea
                  placeholder="Catatan untuk faktur ini..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="text-[13px] border-[#e0e0e0]"
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Summary */}
          <div>
            <Card className="sticky top-4 border border-[#e0e0e0] shadow-sm">
              <CardHeader className="px-4 py-3 border-b border-[#e0e0e0]">
                <CardTitle className="text-sm font-bold text-[#181818] flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Ringkasan Faktur
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <div className="space-y-2 text-[13px]">
                  <div className="flex justify-between">
                    <span className="text-[#706e6b]">Nomor</span>
                    <span className="font-mono text-xs text-[#181818]">{invoiceNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#706e6b]">Tanggal</span>
                    <span className="text-[#181818]">{invoiceDate}</span>
                  </div>
                  {dueDate && (
                    <div className="flex justify-between">
                      <span className="text-[#706e6b]">Jatuh Tempo</span>
                      <span className="text-[#181818]">{dueDate}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-[#706e6b]">Terms</span>
                    <span className="text-[#181818]">{paymentTerms}</span>
                  </div>
                  {selectedCustomerData && (
                    <div className="flex justify-between">
                      <span className="text-[#706e6b]">Pelanggan</span>
                      <span className="text-right max-w-[150px] truncate text-[#181818]">{selectedCustomerData.name}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-[#706e6b]">Jumlah Item</span>
                    <span className="text-[#181818]">{items.length} produk</span>
                  </div>
                </div>

                <div className="border-t border-[#e0e0e0] pt-3 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#706e6b]">Sub Total</span>
                    <span className="text-[#181818]">{formatIDR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#706e6b]">Diskon</span>
                    <span className="text-emerald-600">
                      {totalDiscount > 0 ? `-${formatIDR(totalDiscount)}` : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between text-[13px] font-bold border-t border-[#e0e0e0] pt-2">
                    <span className="text-[#181818]">Total Faktur</span>
                    <span className="text-[#181818]">{formatIDR(total)}</span>
                  </div>
                </div>

                <div className="pt-3 space-y-2">
                  <Button
                    type="submit"
                    className="w-full h-8 text-xs bg-[#0176d3] hover:bg-[#014486] text-white"
                    size="sm"
                    disabled={!selectedCustomer || items.length === 0 || isSubmitting}
                  >
                    {isSubmitting ? "Menyimpan..." : "Simpan Faktur"}
                  </Button>
                  <Link href="/accounting/sales/invoices" className="block">
                    <Button type="button" variant="outline" className="w-full h-8 text-xs border-[#e0e0e0]" size="sm">
                      Batal
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </form>
  )
}
