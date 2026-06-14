"use client"

import React, { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { customers, type Customer } from "@/lib/sales-data"
import { AlertTriangle, DollarSign, CreditCard, ArrowLeft } from "lucide-react"
import Link from "next/link"

const formatIDR = (val: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(val)

export default function CreatePage() {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("")
  const [invoiceTotal, setInvoiceTotal] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const selectedCustomer = useMemo<Customer | undefined>(() => {
    if (!selectedCustomerId) return undefined
    return customers.find((c) => c.id === selectedCustomerId)
  }, [selectedCustomerId])

  const totalNumeric = useMemo(() => {
    const num = Number.parseFloat(invoiceTotal.replace(/[^0-9]/g, ""))
    return isNaN(num) ? 0 : num
  }, [invoiceTotal])

  const exceedsCredit = useMemo(() => {
    if (!selectedCustomer || totalNumeric <= 0) return false
    return totalNumeric > selectedCustomer.remainingCredit
  }, [selectedCustomer, totalNumeric])

  const creditUsagePercent = useMemo(() => {
    if (!selectedCustomer || selectedCustomer.creditLimit <= 0) return 0
    return Math.round((totalNumeric / selectedCustomer.creditLimit) * 100)
  }, [selectedCustomer, totalNumeric])

  const canSubmit = selectedCustomer && totalNumeric > 0 && !exceedsCredit

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setIsSubmitting(true)
    // Simulate submission
    setTimeout(() => {
      setSubmitted(true)
      setIsSubmitting(false)
    }, 1000)
  }

  const handleTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits
    const raw = e.target.value.replace(/[^0-9]/g, "")
    setInvoiceTotal(raw)
  }

  if (submitted) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl  text-gray-900">Create Invoice</h1>
          <p className="text-sm text-gray-500">Buat invoice baru</p>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
              <DollarSign className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="mb-2 text-xl">Invoice Created!</h2>
            <p className="mb-6 text-center text-muted-foreground">
              Invoice for <strong>{selectedCustomer?.name}</strong> sebesar{" "}
              <strong>{formatIDR(totalNumeric)}</strong> telah berhasil dibuat.
            </p>
            <div className="flex gap-3">
              <Link href="/sales/invoices">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Invoices
                </Button>
              </Link>
              <Button onClick={() => setSubmitted(false)}>Create Another</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl  text-gray-900">Create Invoice</h1>
        <p className="text-sm text-gray-500">Buat invoice baru</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Invoice Details</CardTitle>
                <CardDescription>Select customer and enter invoice amount</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Customer Select */}
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer</Label>
                  <Select
                    value={selectedCustomerId}
                    onValueChange={(v) => {
                      setSelectedCustomerId(v ?? "")
                      setInvoiceTotal("")
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih customer..." />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          <span className="flex items-center gap-2">
                                <span>{c.name}</span>
                            <span className="text-muted-foreground">({c.company})</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Invoice Total */}
                <div className="space-y-2">
                  <Label htmlFor="total">Invoice Amount (Rp)</Label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-sm text-muted-foreground">Rp</span>
                    </div>
                    <Input
                      id="total"
                      type="text"
                      inputMode="numeric"
                      placeholder="0"
                      value={invoiceTotal ? Number(invoiceTotal).toLocaleString("id-ID") : ""}
                      onChange={handleTotalChange}
                      disabled={!selectedCustomer}
                      className="pl-10"
                    />
                  </div>
                  {invoiceTotal && (
                    <p className="text-xs text-muted-foreground">
                      {formatIDR(totalNumeric)}
                    </p>
                  )}
                </div>

                {/* Credit Limit Warning */}
                {exceedsCredit && selectedCustomer && (
                  <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/20">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                      <div>
                        <p>Melebihi batas kredit!</p>
                        <p className="mt-1 text-sm text-red-700 dark:text-red-400/80">
                          Total invoice ({formatIDR(totalNumeric)}) melebihi sisa kredit{" "}
                          {selectedCustomer.name} ({formatIDR(selectedCustomer.remainingCredit)}).
                          Kurangi jumlah invoice atau hubungi atasan untuk persetujuan khusus.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Near limit warning */}
                {!exceedsCredit && selectedCustomer && totalNumeric > 0 && creditUsagePercent > 80 && (
                  <div className="rounded-lg border-2 border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                      <div>
                        <p>Mendekati batas kredit ({creditUsagePercent}%)</p>
                        <p className="mt-1 text-sm text-amber-700 dark:text-amber-400/80">
                          Invoice ini akan menggunakan {creditUsagePercent}% dari total plafon kredit{" "}
                          {selectedCustomer.name}.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
              <Link href="/sales/invoices">
                <Button type="button" variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" disabled={!canSubmit || isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Invoice"}
              </Button>
            </div>
          </div>

          {/* Sidebar: Credit Info */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <CreditCard className="h-4 w-4" />
                  Credit Info
                </CardTitle>
                <CardDescription>
                  {selectedCustomer
                    ? `Informasi kredit ${selectedCustomer.name}`
                    : "Pilih customer untuk melihat info kredit"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedCustomer ? (
                  <>
                    {/* Customer Identity */}
                    <div>
                      <p className="text-sm">{selectedCustomer.name}</p>
                      <p className="text-xs text-muted-foreground">{selectedCustomer.company}</p>
                    </div>

                    {/* Tier Badge */}
                    <Badge
                      variant="outline"
                      className={
                        selectedCustomer.tier === "Platinum"
                          ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400"
                          : selectedCustomer.tier === "Gold"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                          : selectedCustomer.tier === "Silver"
                          ? "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400"
                          : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                      }
                    >
                      {selectedCustomer.tier}
                    </Badge>

                    <div className="space-y-2 pt-2">
                      {/* Credit Limit */}
                      <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
                        <span className="text-sm text-muted-foreground">Credit Limit</span>
                        <span className="text-sm">{formatIDR(selectedCustomer.creditLimit)}</span>
                      </div>

                      {/* Remaining Credit */}
                      <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
                        <span className="text-sm text-muted-foreground">Remaining Credit</span>
                        <span
                          className={`text-sm ${
                            selectedCustomer.remainingCredit < selectedCustomer.creditLimit * 0.2
                              ? "text-red-600"
                              : selectedCustomer.remainingCredit < selectedCustomer.creditLimit * 0.5
                              ? "text-amber-600"
                              : "text-emerald-600"
                          }`}
                        >
                          {formatIDR(selectedCustomer.remainingCredit)}
                        </span>
                      </div>

                      {/* Credit bar */}
                      <div className="pt-1">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Credit Usage</span>
                          <span>
                            {((selectedCustomer.creditLimit - selectedCustomer.remainingCredit) / selectedCustomer.creditLimit * 100).toFixed(0)}%
                          </span>
                        </div>
                        <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              selectedCustomer.remainingCredit < selectedCustomer.creditLimit * 0.2
                                ? "bg-red-500"
                                : selectedCustomer.remainingCredit < selectedCustomer.creditLimit * 0.5
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                            }`}
                            style={{
                              width: `${((selectedCustomer.creditLimit - selectedCustomer.remainingCredit) / selectedCustomer.creditLimit * 100)}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* This invoice impact */}
                      {totalNumeric > 0 && (
                        <>
                          <div className="pt-2">
                            <p className="mb-1 text-xs font-medium text-muted-foreground">
                              After This Invoice
                            </p>
                            <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
                              <span className="text-sm text-muted-foreground">New Remaining</span>
                              <span
                                className={`text-sm font-semibold ${
                                  exceedsCredit ? "text-red-600" : "text-emerald-600"
                                }`}
                              >
                                {exceedsCredit
                                  ? formatIDR(selectedCustomer.remainingCredit - totalNumeric)
                                  : formatIDR(selectedCustomer.remainingCredit - totalNumeric)}
                              </span>
                            </div>
                            {exceedsCredit && (
                              <p className="mt-1 text-xs text-red-600">
                                Sisa kredit akan menjadi negatif!
                              </p>
                            )}
                          </div>

                          {/* Progress bar showing new usage */}
                          <div className="pt-1">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>New Credit Usage</span>
                              <span>{Math.min(creditUsagePercent, 100)}%</span>
                            </div>
                            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
                              <div
                                className={`h-full rounded-full transition-all duration-300 ${
                                  exceedsCredit ? "bg-red-500" : "bg-blue-500"
                                }`}
                                style={{
                                  width: `${Math.min(creditUsagePercent, 100)}%`,
                                }}
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex h-32 items-center justify-center">
                    <p className="text-sm text-muted-foreground">
                      Pilih customer dari dropdown untuk melihat informasi kredit
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
