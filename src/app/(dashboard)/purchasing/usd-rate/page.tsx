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

const rateHistory = [
  { date: "2025-12-15", rate: 15720, change: 0.12, setBy: "Admin" },
  { date: "2025-12-14", rate: 15702, change: -0.08, setBy: "Admin" },
  { date: "2025-12-13", rate: 15715, change: 0.25, setBy: "Admin" },
  { date: "2025-12-12", rate: 15676, change: -0.15, setBy: "Admin" },
  { date: "2025-12-11", rate: 15700, change: 0.18, setBy: "Admin" },
  { date: "2025-12-10", rate: 15672, change: -0.22, setBy: "Admin" },
  { date: "2025-12-09", rate: 15707, change: 0.10, setBy: "Admin" },
  { date: "2025-12-08", rate: 15691, change: -0.05, setBy: "Admin" },
  { date: "2025-12-07", rate: 15699, change: 0.08, setBy: "Admin" },
  { date: "2025-12-06", rate: 15686, change: -0.12, setBy: "Admin" },
  { date: "2025-12-05", rate: 15705, change: 0.15, setBy: "Admin" },
  { date: "2025-12-04", rate: 15682, change: -0.08, setBy: "Admin" },
]

export default function UsdRatePage() {
  const [newRate, setNewRate] = useState("")
  const [effectiveDate, setEffectiveDate] = useState("")

  const currentRate = rateHistory[0].rate
  const previousRate = rateHistory[1].rate
  const change = currentRate - previousRate
  const changePercent = ((change / previousRate) * 100).toFixed(2)

  const maxRate = Math.max(...rateHistory.map((r) => r.rate))
  const minRate = Math.min(...rateHistory.map((r) => r.rate))
  const avgRate = Math.round(
    rateHistory.reduce((sum, r) => sum + r.rate, 0) / rateHistory.length
  )

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">USD/IDR Rate Management</h1>
        <p className="text-muted-foreground">
          Manage exchange rate for USD to IDR conversions
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="col-span-2">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Rate</p>
                <div className="flex items-baseline gap-3">
                  <p className="text-4xl font-bold text-indigo-600">
                    Rp {currentRate.toLocaleString()}
                  </p>
                  <Badge
                    variant="outline"
                    className={
                      change >= 0
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {change >= 0 ? (
                      <TrendingUp className="mr-1 h-3 w-3" />
                    ) : (
                      <TrendingDown className="mr-1 h-3 w-3" />
                    )}
                    {change >= 0 ? "+" : ""}
                    {changePercent}%
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  as of {rateHistory[0].date}
                </p>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 dark:bg-indigo-900/30">
                <DollarSign className="h-8 w-8 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Highest (30d)</p>
                <p className="text-xl font-bold">Rp {maxRate.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lowest (30d)</p>
                <p className="text-xl font-bold">Rp {minRate.toLocaleString()}</p>
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
              Set New Rate
            </CardTitle>
            <CardDescription>
              Update the USD/IDR exchange rate. This will affect all future transactions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>New Rate (IDR per 1 USD)</Label>
              <Input
                type="number"
                placeholder="e.g. 15720"
                value={newRate}
                onChange={(e) => setNewRate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Effective Date</Label>
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
                  1 USD ={" "}
                  <span className="font-bold text-indigo-600">
                    Rp {parseInt(newRate).toLocaleString()}
                  </span>
                </p>
                <div className="mt-2 flex items-center gap-1">
                  <span className="text-muted-foreground">Change:</span>
                  {parseInt(newRate) >= currentRate ? (
                    <ArrowUp className="h-3 w-3 text-emerald-600" />
                  ) : (
                    <ArrowDown className="h-3 w-3 text-red-600" />
                  )}
                  <span
                    className={
                      parseInt(newRate) >= currentRate
                        ? "text-emerald-600"
                        : "text-red-600"
                    }
                  >
                    {Math.abs(parseInt(newRate) - currentRate).toLocaleString()} IDR
                    ({(((parseInt(newRate) - currentRate) / currentRate) * 100).toFixed(2)}
                    %)
                  </span>
                </div>
              </div>
            )}

            <Button className="w-full" disabled={!newRate}>
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
                  Rate History
                </CardTitle>
                <CardDescription>Average rate: Rp {avgRate.toLocaleString()}</CardDescription>
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
                  <TableHead className="text-right">Rate (IDR/USD)</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                  <TableHead>Set By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rateHistory.map((entry, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-sm">{entry.date}</TableCell>
                    <TableCell className="text-right font-mono font-bold">
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
                          className={`font-mono text-sm ${
                            entry.change >= 0 ? "text-emerald-600" : "text-red-600"
                          }`}
                        >
                          {entry.change >= 0 ? "+" : ""}
                          {entry.change.toFixed(2)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {entry.setBy}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
