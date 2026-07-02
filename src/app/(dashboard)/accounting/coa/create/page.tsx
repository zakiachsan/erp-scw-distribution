"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, PlusCircle, CheckCircle2 } from "lucide-react"

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

// ── SLDS-style label ──
const SldsLabel = ({
  htmlFor,
  children,
  required,
}: {
  htmlFor?: string
  children: React.ReactNode
  required?: boolean
}) => (
  <label
    htmlFor={htmlFor}
    className="block text-[11px] uppercase tracking-[0.025em] font-bold text-[#444746] mb-1"
  >
    {children}
    {required && <span className="text-[#ea001e] ml-0.5">*</span>}
  </label>
)

// ── SLDS-style input ──
const SldsInput = ({
  id,
  placeholder,
  value,
  onChange,
  className = "",
  type = "text",
}: {
  id?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  type?: string
}) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`w-full h-8 px-3 text-sm text-[#001526] bg-white border border-[#d8d8d8] rounded-[6px] placeholder:text-[#747474] focus:border-[#0176d3] focus:ring-1 focus:ring-[#0176d3] focus:outline-none transition-colors ${className}`}
  />
)

// ── SLDS-style select ──
const SldsSelect = ({
  id,
  value,
  onChange,
  placeholder,
  children,
}: {
  id?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  children: React.ReactNode
}) => (
  <select
    id={id}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`w-full h-8 px-3 text-sm text-[#001526] bg-white border border-[#d8d8d8] rounded-[6px] appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23747474' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")] bg-no-repeat bg-[right_8px_center] pr-8 focus:border-[#0176d3] focus:ring-1 focus:ring-[#0176d3] focus:outline-none transition-colors ${
      !value ? "text-[#747474]" : ""
    }`}
  >
    {placeholder && (
      <option value="" disabled>
        {placeholder}
      </option>
    )}
    {children}
  </select>
)

// ── SLDS-style checkbox toggle ──
const SldsToggle = ({
  id,
  checked,
  onCheckedChange,
  label,
}: {
  id: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label: string
}) => (
  <div className="flex items-center gap-3 py-2">
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-[#0176d3] focus:ring-offset-1 ${
        checked ? "bg-[#0176d3]" : "bg-[#c9c9c9]"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition-transform ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
    <span className="text-xs text-[#444746] select-none">{label}</span>
  </div>
)

export default function CreateCOAPage() {
  const router = useRouter()

  const [accountType, setAccountType] = useState("")
  const [isActive, setIsActive] = useState(true)
  const [accountCode, setAccountCode] = useState("")
  const [accountName, setAccountName] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmSuccess, setConfirmSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

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
    <div className="space-y-5 p-6 max-w-3xl">
      {/* ── Page Header ── */}
      <div className="flex items-center gap-3 pb-1">
        <Link
          href="/accounting/coa"
          className="flex h-7 w-7 items-center justify-center rounded-[4px] hover:bg-[#f3f3f3] transition-colors"
        >
          <ArrowLeft className="h-4 w-4 text-[#444746]" />
        </Link>
        <div>
          <h1 className="text-lg font-bold text-[#001526]">Tambah Akun Perkiraan</h1>
          <p className="text-[11px] text-[#444746]">
            Tambahkan akun baru ke dalam Chart of Accounts
          </p>
        </div>
      </div>

      {/* ── Informasi Akun Section ── */}
      <div className="space-y-4">
        <div className="border-b border-[#d8d8d8] pb-2">
          <h2 className="text-sm font-bold text-[#001526]">Informasi Akun</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Tipe Akun */}
          <div className="space-y-0.5">
            <SldsLabel htmlFor="account-type" required>
              Tipe Akun
            </SldsLabel>
            <SldsSelect
              id="account-type"
              value={accountType}
              onChange={(v) => setAccountType(v)}
              placeholder="Pilih tipe akun..."
            >
              {accountTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </SldsSelect>
          </div>

          {/* Kode Perkiraan */}
          <div className="space-y-0.5">
            <SldsLabel htmlFor="account-code" required>
              Kode Perkiraan
            </SldsLabel>
            <SldsInput
              id="account-code"
              placeholder="Contoh: 110105"
              value={accountCode}
              onChange={(e) => setAccountCode(e.target.value.replace(/[^0-9]/g, ""))}
            />
          </div>

          {/* Nama Akun */}
          <div className="space-y-0.5">
            <SldsLabel htmlFor="account-name" required>
              Nama Akun
            </SldsLabel>
            <SldsInput
              id="account-name"
              placeholder="Contoh: Kas Kecil"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />
          </div>

          {/* Active Toggle */}
          <div className="flex items-end pb-1">
            <SldsToggle
              id="is-active"
              checked={isActive}
              onCheckedChange={setIsActive}
              label="Akun Aktif"
            />
          </div>
        </div>
      </div>

      {/* ── Actions ── */}
      <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#d8d8d8]">
        <Link href="/accounting/coa">
          <button
            type="button"
            className="inline-flex items-center justify-center h-8 px-5 text-sm font-bold text-[#0176d3] bg-white border border-[#d8d8d8] rounded-[6px] hover:bg-[#f3f3f3] transition-colors cursor-pointer"
          >
            Batal
          </button>
        </Link>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="inline-flex items-center justify-center h-8 px-5 text-sm font-bold text-white bg-[#0176d3] border border-[#0176d3] rounded-[6px] hover:bg-[#014486] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {isSubmitting ? (
            "Menyimpan..."
          ) : (
            <>
              <PlusCircle className="mr-1.5 h-3.5 w-3.5" />
              Simpan
            </>
          )}
        </button>
      </div>

      {/* ── Success/Error Dialog (minimal SLDS modal) ── */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={handleDialogClose}
          />
          {/* Modal */}
          <div className="relative w-full max-w-sm bg-white rounded-[8px] shadow-xl p-6 mx-4">
            <div className="text-center">
              {confirmSuccess ? (
                <CheckCircle2 className="mx-auto h-10 w-10 text-[#2e844a] mb-3" />
              ) : (
                <div className="mx-auto h-10 w-10 rounded-full bg-[#fef3f2] flex items-center justify-center mb-3">
                  <span className="text-[#ea001e] text-xl font-bold">!</span>
                </div>
              )}
              <h3 className="text-base font-bold text-[#001526] mb-1">
                {confirmSuccess ? "Berhasil" : "Perhatian"}
              </h3>
              <p className="text-sm text-[#444746] mb-5">
                {confirmSuccess
                  ? `Akun "${accountName}" (${accountCode}) berhasil ditambahkan ke Chart of Accounts.`
                  : errorMessage}
              </p>
            </div>
            <button
              type="button"
              onClick={handleDialogClose}
              className="w-full inline-flex items-center justify-center h-8 px-5 text-sm font-bold text-white bg-[#0176d3] border border-[#0176d3] rounded-[6px] hover:bg-[#014486] transition-colors cursor-pointer"
            >
              {confirmSuccess ? "Kembali" : "Tutup"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
