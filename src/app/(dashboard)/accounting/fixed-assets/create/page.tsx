"use client"

import { useState, useMemo } from "react"
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
import {
  ArrowLeft,
  PlusCircle,
  Building2,
  Calculator,
} from "lucide-react"

const metodePenyusutanOptions = [
  { value: "garis_lurus", label: "Garis Lurus" },
  { value: "saldo_menurun", label: "Saldo Menurun" },
]

const akunAsetOptions = [
  { value: "1401", label: "1401 - Tanah" },
  { value: "1402", label: "1402 - Gedung" },
  { value: "1403", label: "1403 - Peralatan" },
  { value: "1404", label: "1404 - Kendaraan" },
  { value: "1405", label: "1405 - Peralatan Kantor" },
  { value: "1406", label: "1406 - Peralatan IT" },
]

const akumPenyusutanOptions = [
  { value: "140901", label: "140901 - Akum. Penyusutan Tanah" },
  { value: "140902", label: "140902 - Akum. Penyusutan Gedung" },
  { value: "140903", label: "140903 - Akum. Penyusutan Peralatan" },
  { value: "140904", label: "140904 - Akum. Penyusutan Kendaraan" },
  { value: "140905", label: "140905 - Akum. Penyusutan Peralatan Kantor" },
  { value: "140906", label: "140906 - Akum. Penyusutan Peralatan IT" },
]

const bebanPenyusutanOptions = [
  { value: "6601", label: "6601 - Beban Penyusutan Peralatan" },
  { value: "6602", label: "6602 - Beban Penyusutan Gedung" },
  { value: "6603", label: "6603 - Beban Penyusutan Kendaraan" },
  { value: "6604", label: "6604 - Beban Penyusutan Peralatan Kantor" },
]

function formatIDR(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`
}

export default function CreateFixedAssetPage() {
  const router = useRouter()

  const [nama, setNama] = useState("")
  const [tanggalBeli, setTanggalBeli] = useState("")
  const [tanggalPakai, setTanggalPakai] = useState("")
  const [kodeAset, setKodeAset] = useState("")
  const [asetTidakBerwujud, setAsetTidakBerwujud] = useState(false)
  const [metodePenyusutan, setMetodePenyusutan] = useState("")
  const [akunAset, setAkunAset] = useState("")
  const [akumPenyusutan, setAkumPenyusutan] = useState("")
  const [bebanPenyusutan, setBebanPenyusutan] = useState("")
  const [kuantitas, setKuantitas] = useState("1")
  const [umurTahun, setUmurTahun] = useState("5")
  const [umurBulan, setUmurBulan] = useState("0")
  const [rasio, setRasio] = useState("10")
  const [nilaiSisa, setNilaiSisa] = useState("")
  const [hargaBeli, setHargaBeli] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmSuccess, setConfirmSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const parsedHargaBeli = parseInt(hargaBeli.replace(/[^0-9-]/g, "")) || 0
  const parsedNilaiSisa = parseInt(nilaiSisa.replace(/[^0-9-]/g, "")) || 0
  const parsedKuantitas = parseInt(kuantitas) || 1

  const totalAset = useMemo(() => {
    return parsedHargaBeli * parsedKuantitas
  }, [parsedHargaBeli, parsedKuantitas])

  const nilaiBuku = useMemo(() => {
    return totalAset - parsedNilaiSisa
  }, [totalAset, parsedNilaiSisa])

  const handleSubmit = () => {
    if (!nama.trim()) {
      setErrorMessage("Masukkan nama aset.")
      setConfirmOpen(true)
      return
    }
    if (!tanggalBeli) {
      setErrorMessage("Pilih tanggal beli aset.")
      setConfirmOpen(true)
      return
    }
    if (!kodeAset.trim()) {
      setErrorMessage("Masukkan kode aset.")
      setConfirmOpen(true)
      return
    }
    if (!akunAset) {
      setErrorMessage("Pilih akun aset.")
      setConfirmOpen(true)
      return
    }

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
      router.push("/accounting/fixed-assets")
    }
  }

  return (
    <div className="space-y-4 p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/accounting/fixed-assets"
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-lg font-bold text-gray-900">Tambah Aset Tetap</h1>
          <p className="text-xs text-gray-500">
            Tambahkan aset tetap baru ke dalam register aset
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* Main Form */}
        <div className="space-y-4">
          {/* Informasi Dasar */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 className="h-4 w-4 text-indigo-600" />
                Informasi Aset
              </CardTitle>
              <CardDescription>
                Masukkan data dasar aset tetap
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Nama Aset */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Nama Aset *</Label>
                <Input
                  placeholder="Contoh: Gedung Gudang Surabaya"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="h-8 text-sm"
                />
              </div>

              {/* Tanggal Beli & Tanggal Pakai */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Tanggal Beli *</Label>
                  <Input
                    type="date"
                    value={tanggalBeli}
                    onChange={(e) => setTanggalBeli(e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Tanggal Pakai</Label>
                  <Input
                    type="date"
                    value={tanggalPakai}
                    onChange={(e) => setTanggalPakai(e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>
              </div>

              {/* Kode Aset & Harga Beli */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Kode Aset (Fixed Asset) *</Label>
                  <Input
                    placeholder="Contoh: FA-013"
                    value={kodeAset}
                    onChange={(e) => setKodeAset(e.target.value)}
                    className="h-8 text-sm font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Harga Beli (Rp)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">
                      Rp
                    </span>
                    <Input
                      type="text"
                      placeholder="0"
                      value={hargaBeli}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/[^0-9-]/g, "")
                        setHargaBeli(raw)
                      }}
                      className="h-8 text-sm pl-10 font-sans text-right"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informasi Umum */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Calculator className="h-4 w-4 text-indigo-600" />
                Informasi Umum
              </CardTitle>
              <CardDescription>
                Pengaturan penyusutan dan akun terkait
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Aset Tidak Berwujud Checkbox */}
              <div className="flex items-center gap-2 py-2">
                <Checkbox
                  id="intangible"
                  checked={asetTidakBerwujud}
                  onCheckedChange={(checked) => setAsetTidakBerwujud(!!checked)}
                  className="h-4 w-4"
                />
                <Label
                  htmlFor="intangible"
                  className="text-xs font-medium cursor-pointer"
                >
                  Aset Tidak Berwujud
                </Label>
              </div>

              {/* Metode Penyusutan */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Metode Penyusutan</Label>
                <Select value={metodePenyusutan} onValueChange={(v) => setMetodePenyusutan(v ?? "")}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Pilih metode penyusutan..." />
                  </SelectTrigger>
                  <SelectContent>
                    {metodePenyusutanOptions.map((m) => (
                      <SelectItem key={m.value} value={m.value}>
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Akun Aset, Akum. Penyusutan, Beban Penyusutan */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Akun Aset *</Label>
                <Select value={akunAset} onValueChange={(v) => setAkunAset(v ?? "")}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Pilih akun aset..." />
                  </SelectTrigger>
                  <SelectContent>
                    {akunAsetOptions.map((a) => (
                      <SelectItem key={a.value} value={a.value}>
                        {a.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Akumulasi Penyusutan</Label>
                <Select value={akumPenyusutan} onValueChange={(v) => setAkumPenyusutan(v ?? "")}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Pilih akun akumulasi penyusutan..." />
                  </SelectTrigger>
                  <SelectContent>
                    {akumPenyusutanOptions.map((a) => (
                      <SelectItem key={a.value} value={a.value}>
                        {a.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Beban Penyusutan</Label>
                <Select value={bebanPenyusutan} onValueChange={(v) => setBebanPenyusutan(v ?? "")}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Pilih akun beban penyusutan..." />
                  </SelectTrigger>
                  <SelectContent>
                    {bebanPenyusutanOptions.map((b) => (
                      <SelectItem key={b.value} value={b.value}>
                        {b.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Kuantitas & Umur Aset */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Kuantitas</Label>
                  <Input
                    type="number"
                    value={kuantitas}
                    onChange={(e) => setKuantitas(e.target.value)}
                    className="h-8 text-sm font-sans"
                    min="1"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Umur Aset (Tahun)</Label>
                  <Input
                    type="number"
                    value={umurTahun}
                    onChange={(e) => setUmurTahun(e.target.value)}
                    className="h-8 text-sm font-sans"
                    min="0"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Umur Aset (Bulan)</Label>
                  <Input
                    type="number"
                    value={umurBulan}
                    onChange={(e) => setUmurBulan(e.target.value)}
                    className="h-8 text-sm font-sans"
                    min="0"
                    max="11"
                  />
                </div>
              </div>

              {/* Rasio & Nilai Sisa */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Rasio (%)</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={rasio}
                      onChange={(e) => setRasio(e.target.value)}
                      className="h-8 text-sm font-sans text-right pr-8"
                      min="0"
                      max="100"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      %
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Nilai Sisa (Rp)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">
                      Rp
                    </span>
                    <Input
                      type="text"
                      placeholder="0"
                      value={nilaiSisa}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/[^0-9-]/g, "")
                        setNilaiSisa(raw)
                      }}
                      className="h-8 text-sm pl-10 font-sans text-right"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Link href="/accounting/fixed-assets">
              <Button type="button" variant="outline" size="sm">
                Batal
              </Button>
            </Link>
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {isSubmitting ? (
                "Menyimpan..."
              ) : (
                <>
                  <PlusCircle className="mr-1.5 h-3.5 w-3.5" />
                  Simpan Aset
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Sidebar - Preview */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-base">Preview Aset</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {nama ? (
                <>
                  <div>
                    <p className="text-[11px] text-muted-foreground">Nama Aset</p>
                    <p className="text-sm font-medium">{nama}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-muted-foreground">Kode Aset</p>
                    <p className="text-sm font-mono font-medium">{kodeAset || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-muted-foreground">Tanggal Beli</p>
                    <p className="text-sm">{tanggalBeli || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-muted-foreground">Tanggal Pakai</p>
                    <p className="text-sm">{tanggalPakai || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-muted-foreground">Harga Beli</p>
                    <p className="text-sm font-sans font-bold">
                      {parsedHargaBeli > 0 ? formatIDR(parsedHargaBeli) : "Rp 0"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-muted-foreground">Kuantitas</p>
                    <p className="text-sm">{parsedKuantitas}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-muted-foreground">Umur Aset</p>
                    <p className="text-sm">{umurTahun} Tahun {umurBulan} Bulan</p>
                  </div>
                  {asetTidakBerwujud && (
                    <div>
                      <p className="text-[11px] text-muted-foreground">Tipe</p>
                      <p className="text-xs font-medium text-indigo-600">Aset Tidak Berwujud</p>
                    </div>
                  )}
                  <div className="border-t pt-3 mt-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-600">Total Aset</span>
                      <span className="text-sm font-sans font-bold text-slate-900">
                        {formatIDR(totalAset)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-600">Nilai Sisa</span>
                      <span className="text-sm font-sans font-medium text-amber-600">
                        {parsedNilaiSisa > 0 ? formatIDR(parsedNilaiSisa) : "Rp 0"}
                      </span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between">
                        <span className="text-xs font-medium text-slate-700">Nilai Buku</span>
                        <span className="text-sm font-sans font-bold text-green-700">
                          {formatIDR(nilaiBuku)}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-8 text-center">
                  <Building2 className="mx-auto mb-2 h-8 w-8 text-muted-foreground/40" />
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
                ? `Aset "${nama}" (${kodeAset}) berhasil ditambahkan ke register aset tetap.`
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
