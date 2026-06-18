"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ArrowLeft, PlusCircle, BookOpen, CheckCircle2 } from "lucide-react"

// ── Account types for Indonesian COA ──
const accountTypes = [
  { value: "Aset", label: "Aset (Asset)" },
  { value: "Liabilitas", label: "Liabilitas (Liability)" },
  { value: "Ekuitas", label: "Ekuitas (Equity)" },
  { value: "Pendapatan", label: "Pendapatan (Revenue)" },
  { value: "Beban", label: "Beban (Expense)" },
]

// ── Format helper ──
const formatIDR = (val: number) => `Rp ${val.toLocaleString("id-ID")}`

export default function CreateCOAPage() {
  const router = useRouter()

  const [accountType, setAccountType] = useState("")
  const [isSubAccount, setIsSubAccount] = useState(false)
  const [parentAccount, setParentAccount] = useState("")
  const [accountCode, setAccountCode] = useState("")
  const [accountName, setAccountName] = useState("")
  const [openingBalance, setOpeningBalance] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmSuccess, setConfirmSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  // Parse balance input
  const parsedBalance = parseInt(openingBalance.replace(/[^0-9-]/g, "")) || 0

  const handleSubmit = () => {
    // Validation
    if (!accountType) {
      setErrorMessage("Pilih tipe akun terlebih dahulu.")
      setConfirmOpen(true)
      return
    }
    if (!accountCode.trim()) {
      setErrorMessage("Masukkan kode perkiraan.")
      setConfirmOpen(true)
      return
    }
    if (!accountCode.trim().match(/^\d+$/)) {
      setErrorMessage("Kode perkiraan hanya boleh berisi angka.")
      setConfirmOpen(true)
      return
    }
    if (!accountName.trim()) {
      setErrorMessage("Masukkan nama akun.")
      setConfirmOpen(true)
      return
    }
    if (isSubAccount && !parentAccount) {
      setErrorMessage("Pilih akun induk untuk sub akun.")
      setConfirmOpen(true)
      return
    }

    // Simulate save
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setConfirmSuccess(true)
      setConfirmOpen(true)
    }, 800)
  }

  const handleDialogClose = () => {
    setConfirmOpen(false)
    if (confirmSuccess) {
      setConfirmSuccess(false)
      router.push("/accounting/coa")
    }
  }

  return (
    <div className="space-y-4 p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/accounting/coa"
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-lg font-bold text-gray-900">Tambah Akun Perkiraan</h1>
          <p className="text-xs text-gray-500">
            Tambahkan akun baru ke dalam Chart of Accounts
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* Main Form */}
        <div className="space-y-4">
          {/* Account Type */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-indigo-600" />
                Informasi Akun
              </CardTitle>
              <CardDescription>
                Pilih tipe akun dan masukkan data dasar akun
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Tipe Akun */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Tipe Akun *</Label>
                <Select value={accountType} onValueChange={(v) => setAccountType(v ?? "")}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Pilih tipe akun..." />
                  </SelectTrigger>
                  <SelectContent>
                    {accountTypes.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sub Akun Checkbox */}
              <div className="flex items-center gap-2 py-2">
                <Checkbox
                  id="sub-account"
                  checked={isSubAccount}
                  onCheckedChange={(checked) => {
                    setIsSubAccount(!!checked)
                    if (!checked) setParentAccount("")
                  }}
                  className="h-4 w-4"
                />
                <Label
                  htmlFor="sub-account"
                  className="text-xs font-medium cursor-pointer"
                >
                  Sub Akun (akun ini adalah anak dari akun induk lain)
                </Label>
              </div>

              {/* Parent Account (conditional) */}
              {isSubAccount && (
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Akun Induk *</Label>
                  <Select value={parentAccount} onValueChange={(v) => setParentAccount(v ?? "")}>
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue placeholder="Pilih akun induk..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1101">1101 - Kas & Bank</SelectItem>
                      <SelectItem value="1210">1210 - Piutang Dagang</SelectItem>
                      <SelectItem value="1220">1220 - Piutang Lain-lain</SelectItem>
                      <SelectItem value="1300">1300 - Persediaan Barang Dagang</SelectItem>
                      <SelectItem value="1400">1400 - Aset Tetap</SelectItem>
                      <SelectItem value="2101">2101 - Utang Dagang</SelectItem>
                      <SelectItem value="2201">2201 - Utang Bank</SelectItem>
                      <SelectItem value="2301">2301 - Utang Lain-lain</SelectItem>
                      <SelectItem value="3100">3100 - Modal</SelectItem>
                      <SelectItem value="3200">3200 - Laba Ditahan</SelectItem>
                      <SelectItem value="4101">4101 - Penjualan Produk</SelectItem>
                      <SelectItem value="5101">5101 - Harga Pokok Penjualan</SelectItem>
                      <SelectItem value="6101">6101 - Beban Gaji</SelectItem>
                      <SelectItem value="6201">6201 - Beban Sewa</SelectItem>
                      <SelectItem value="6301">6301 - Beban Utilitas</SelectItem>
                      <SelectItem value="6401">6401 - Beban Marketing</SelectItem>
                      <SelectItem value="6501">6501 - Beban Transport & Kirim</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Kode Perkiraan */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Kode Perkiraan *</Label>
                <Input
                  placeholder="Contoh: 110105"
                  value={accountCode}
                  onChange={(e) => setAccountCode(e.target.value.replace(/[^0-9]/g, ""))}
                  className="h-8 text-sm font-mono"
                />
                <p className="text-[11px] text-muted-foreground">
                  {isSubAccount && parentAccount
                    ? `Akun induk: ${parentAccount} — Kode harus diawali dengan ${parentAccount}`
                    : "Masukkan kode unik akun (angka saja)"}
                </p>
              </div>

              {/* Nama Akun */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Nama Akun *</Label>
                <Input
                  placeholder="Contoh: Kas Kecil"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  className="h-8 text-sm"
                />
              </div>
            </CardContent>
          </Card>

          {/* Opening Balance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <span className="text-indigo-600">Rp</span>
                Saldo Awal
              </CardTitle>
              <CardDescription>
                Masukkan saldo awal untuk akun ini (opsional)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Saldo Awal (Rp)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">
                    Rp
                  </span>
                  <Input
                    type="text"
                    placeholder="0"
                    value={openingBalance}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9-]/g, "")
                      setOpeningBalance(raw)
                    }}
                    className="h-8 text-sm pl-10 font-sans text-right"
                  />
                </div>
                {parsedBalance !== 0 && (
                  <p className="text-[11px] text-muted-foreground">
                    Saldo: {parsedBalance < 0 ? "(" + formatIDR(Math.abs(parsedBalance)).replace("Rp ", "") + ")" : formatIDR(parsedBalance)}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Link href="/accounting/coa">
              <Button type="button" variant="outline" size="sm">
                Batal
              </Button>
            </Link>
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Menyimpan..."
              ) : (
                <>
                  <PlusCircle className="mr-1.5 h-3.5 w-3.5" />
                  Simpan Akun
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Sidebar - Preview */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-base">Preview Akun</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {accountName ? (
                <>
                  <div>
                    <p className="text-xs text-muted-foreground">Kode Perkiraan</p>
                    <p className="text-sm font-mono font-medium">
                      {accountCode || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Nama Akun</p>
                    <p className="text-sm font-medium">{accountName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Tipe Akun</p>
                    <p className="text-sm">{accountType || "—"}</p>
                  </div>
                  {isSubAccount && parentAccount && (
                    <div>
                      <p className="text-xs text-muted-foreground">Akun Induk</p>
                      <p className="text-sm">{parentAccount}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-muted-foreground">Saldo Awal</p>
                    <p className={`text-sm font-sans font-bold ${parsedBalance < 0 ? "text-red-600" : "text-slate-900"}`}>
                      {parsedBalance === 0 ? "Rp 0" : formatIDR(parsedBalance)}
                    </p>
                  </div>
                </>
              ) : (
                <div className="py-8 text-center">
                  <BookOpen className="mx-auto mb-2 h-8 w-8 text-muted-foreground/40" />
                  <p className="text-xs text-muted-foreground">
                    Isi form untuk melihat preview
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirm/Error Dialog */}
      <Dialog open={confirmOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {confirmSuccess ? "Berhasil" : "Perhatian"}
            </DialogTitle>
            <DialogDescription>
              {confirmSuccess
                ? `Akun "${accountName}" (${accountCode}) berhasil ditambahkan ke Chart of Accounts.`
                : errorMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleDialogClose}>
              {confirmSuccess ? "Kembali" : "Tutup"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
