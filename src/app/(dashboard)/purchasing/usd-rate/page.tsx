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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  Save,
  RefreshCw,
  ArrowUp,
  ArrowDown,
} from "lucide-react"

const CURRENCIES = ["IDR", "USD", "SGD", "MYR", "JPY", "CNY", "KRW", "EUR"] as const
type Currency = (typeof CURRENCIES)[number]

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  IDR: "Rp", USD: "$", SGD: "S$", MYR: "RM", JPY: "¥", CNY: "¥", KRW: "₩", EUR: "€",
}

const CURRENCY_FLAGS: Record<Currency, string> = {
  IDR: "🇮🇩", USD: "🇺🇸", SGD: "🇸🇬", MYR: "🇲🇾", JPY: "🇯🇵", CNY: "🇨🇳", KRW: "🇰🇷", EUR: "🇪🇺",
}

interface CurrencyRate {
  currency: Currency
  rateToIDR: number
  change: number
  lastUpdated: string
  setBy: string
}

const initialRates: CurrencyRate[] = [
  { currency: "USD", rateToIDR: 15720, change: 0.12, lastUpdated: "2025-12-15", setBy: "Admin" },
  { currency: "SGD", rateToIDR: 11650, change: 0.08, lastUpdated: "2025-12-15", setBy: "Admin" },
  { currency: "MYR", rateToIDR: 3520, change: -0.05, lastUpdated: "2025-12-15", setBy: "Admin" },
  { currency: "JPY", rateToIDR: 105, change: 0.15, lastUpdated: "2025-12-15", setBy: "Admin" },
  { currency: "CNY", rateToIDR: 2160, change: -0.10, lastUpdated: "2025-12-15", setBy: "Admin" },
  { currency: "KRW", rateToIDR: 11.2, change: 0.03, lastUpdated: "2025-12-15", setBy: "Admin" },
  { currency: "EUR", rateToIDR: 17100, change: 0.20, lastUpdated: "2025-12-15", setBy: "Admin" },
]

const rateHistory: Record<Currency, { date: string; rate: number; change: number }[]> = {
  USD: [
    { date: "2025-12-15", rate: 15720, change: 0.12 },
    { date: "2025-12-14", rate: 15702, change: -0.08 },
    { date: "2025-12-13", rate: 15715, change: 0.25 },
    { date: "2025-12-12", rate: 15676, change: -0.15 },
    { date: "2025-12-11", rate: 15700, change: 0.18 },
  ],
  SGD: [
    { date: "2025-12-15", rate: 11650, change: 0.08 },
    { date: "2025-12-14", rate: 11640, change: -0.05 },
    { date: "2025-12-13", rate: 11655, change: 0.12 },
  ],
  MYR: [
    { date: "2025-12-15", rate: 3520, change: -0.05 },
    { date: "2025-12-14", rate: 3522, change: 0.03 },
    { date: "2025-12-13", rate: 3518, change: -0.08 },
  ],
  JPY: [
    { date: "2025-12-15", rate: 105, change: 0.15 },
    { date: "2025-12-14", rate: 104.8, change: -0.10 },
    { date: "2025-12-13", rate: 105.1, change: 0.20 },
  ],
  CNY: [
    { date: "2025-12-15", rate: 2160, change: -0.10 },
    { date: "2025-12-14", rate: 2162, change: 0.05 },
    { date: "2025-12-13", rate: 2158, change: -0.12 },
  ],
  KRW: [
    { date: "2025-12-15", rate: 11.2, change: 0.03 },
    { date: "2025-12-14", rate: 11.18, change: -0.02 },
    { date: "2025-12-13", rate: 11.22, change: 0.05 },
  ],
  EUR: [
    { date: "2025-12-15", rate: 17100, change: 0.20 },
    { date: "2025-12-14", rate: 17066, change: -0.12 },
    { date: "2025-12-13", rate: 17086, change: 0.15 },
  ],
}

export default function CurrencyRatePage() {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("USD")
  const [rates, setRates] = useState<CurrencyRate[]>(initialRates)
  const [newRate, setNewRate] = useState("")
  const [effectiveDate, setEffectiveDate] = useState("")

  const current = rates.find((r) => r.currency === selectedCurrency)!
  const history = rateHistory[selectedCurrency] || []

  const handleUpdateRate = () => {
    const parsed = parseFloat(newRate)
    if (!parsed) return
    setRates((prev) =>
      prev.map((r) =>
        r.currency === selectedCurrency
          ? { ...r, rateToIDR: parsed, lastUpdated: new Date().toISOString().split("T")[0], change: ((parsed - r.rateToIDR) / r.rateToIDR) * 100 }
          : r
      )
    )
    setNewRate("")
    setEffectiveDate("")
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Currency Rate</h1>
        <p className="text-muted-foreground">
          Kelola kurs mata uang untuk konversi transaksi
        </p>
      </div>

      {/* Currency Selector */}
      <div className="flex flex-wrap gap-2">
        {CURRENCIES.filter((c) => c !== "IDR").map((c) => (
          <button
            key={c}
            onClick={() => { setSelectedCurrency(c); setNewRate(""); setEffectiveDate(""); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCurrency === c
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80 text-muted-foreground"
            }`}
          >
            <span>{CURRENCY_FLAGS[c]}</span>
            <span>{c}/IDR</span>
          </button>
        ))}
      </div>

      {/* Current Rate Card */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="col-span-2">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Rate</p>
                <div className="flex items-baseline gap-3">
                  <p className="text-4xl font-bold text-indigo-600">
                    {CURRENCY_SYMBOLS[selectedCurrency]} {current.rateToIDR.toLocaleString()}
                  </p>
                  <Badge
                    variant="outline"
                    className={
                      current.change >= 0
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {current.change >= 0 ? (
                      <TrendingUp className="mr-1 h-3 w-3" />
                    ) : (
                      <TrendingDown className="mr-1 h-3 w-3" />
                    )}
                    {current.change >= 0 ? "+" : ""}
                    {current.change.toFixed(2)}%
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  1 {selectedCurrency} = Rp {current.rateToIDR.toLocaleString()} · as of {current.lastUpdated}
                </p>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 dark:bg-indigo-900/30">
                <span className="text-2xl">{CURRENCY_FLAGS[selectedCurrency]}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Highest</p>
                <p className="text-lg font-semibold">
                  {CURRENCY_SYMBOLS[selectedCurrency]} {Math.max(...history.map((r) => r.rate)).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                <TrendingDown className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Lowest</p>
                <p className="text-lg font-semibold">
                  {CURRENCY_SYMBOLS[selectedCurrency]} {Math.min(...history.map((r) => r.rate)).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Save className="h-4 w-4 text-indigo-600" />
              Update Rate
            </CardTitle>
            <CardDescription>
              Update kurs {selectedCurrency}/IDR. Berlaku untuk semua transaksi berikutnya.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Baru (IDR per 1 {selectedCurrency})</Label>
              <Input
                type="number"
                placeholder={`e.g. ${current.rateToIDR}`}
                value={newRate}
                onChange={(e) => setNewRate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Tanggal Efektif</Label>
              <Input
                type="date"
                value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)}
              />
            </div>

            {newRate && (
              <div className="rounded-lg border bg-muted/30 p-3 text-sm">
                <p className="text-muted-foreground">Preview:</p>
                <p className="mt-1">
                  1 {selectedCurrency} ={" "}
                  <span className="font-bold text-indigo-600">
                    Rp {parseInt(newRate).toLocaleString()}
                  </span>
                </p>
                <div className="mt-2 flex items-center gap-1">
                  <span className="text-muted-foreground">Change:</span>
                  {parseInt(newRate) >= current.rateToIDR ? (
                    <ArrowUp className="h-3 w-3 text-emerald-600" />
                  ) : (
                    <ArrowDown className="h-3 w-3 text-red-600" />
                  )}
                  <span
                    className={
                      parseInt(newRate) >= current.rateToIDR
                        ? "text-emerald-600"
                        : "text-red-600"
                    }
                  >
                    {Math.abs(parseInt(newRate) - current.rateToIDR).toLocaleString()} IDR
                    ({(((parseInt(newRate) - current.rateToIDR) / current.rateToIDR) * 100).toFixed(2)}%)
                  </span>
                </div>
              </div>
            )}

            <Button className="w-full" disabled={!newRate} onClick={handleUpdateRate}>
              <Save className="mr-2 h-4 w-4" />
              Update Rate
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-indigo-600" />
                  Rate History — {selectedCurrency}/IDR
                </CardTitle>
                <CardDescription>
                  Average: {CURRENCY_SYMBOLS[selectedCurrency]}{" "}
                  {history.length > 0
                    ? Math.round(history.reduce((s, r) => s + r.rate, 0) / history.length).toLocaleString()
                    : "—"}
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-3 w-3" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Rate (IDR/{selectedCurrency})</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                      Belum ada riwayat kurs.
                    </TableCell>
                  </TableRow>
                ) : (
                  history.map((entry, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-sm">{entry.date}</TableCell>
                      <TableCell className="text-right font-sans font-bold">
                        Rp {entry.rate.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {entry.change >= 0 ? (
                            <ArrowUp className="h-3 w-3 text-emerald-600" />
                          ) : (
                            <ArrowDown className="h-3 w-3 text-red-600" />
                          )}
                          <span
                            className={`font-sans text-sm ${
                              entry.change >= 0 ? "text-emerald-600" : "text-red-600"
                            }`}
                          >
                            {entry.change >= 0 ? "+" : ""}
                            {entry.change.toFixed(2)}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
