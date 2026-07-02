"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, PlusCircle, Building2, Calculator } from "lucide-react"

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

// --- SLDS shared styles ---

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "11px",
  textTransform: "uppercase",
  color: "#444746",
  fontWeight: 500,
  marginBottom: "4px",
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: "32px",
  border: "1px solid #d8d8d8",
  borderRadius: "6px",
  padding: "0 12px",
  fontSize: "13px",
  color: "#1a1a1a",
  backgroundColor: "#fff",
  outline: "none",
  boxSizing: "border-box",
}

const selectTriggerStyle: React.CSSProperties = {
  width: "100%",
  height: "32px",
  border: "1px solid #d8d8d8",
  borderRadius: "6px",
  padding: "0 12px",
  fontSize: "13px",
  color: "#1a1a1a",
  backgroundColor: "#fff",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  boxSizing: "border-box",
}

const btnPrimaryStyle: React.CSSProperties = {
  backgroundColor: "#0176d3",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "0 16px",
  height: "32px",
  fontSize: "13px",
  fontWeight: 600,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  whiteSpace: "nowrap",
}

const btnOutlineStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  color: "#0176d3",
  border: "1px solid #d8d8d8",
  borderRadius: "6px",
  padding: "0 16px",
  height: "32px",
  fontSize: "13px",
  fontWeight: 600,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  whiteSpace: "nowrap",
}

const cardStyle: React.CSSProperties = {
  border: "1px solid #d8d8d8",
  borderRadius: "8px",
  backgroundColor: "#fff",
  overflow: "hidden",
}

const cardHeaderStyle: React.CSSProperties = {
  padding: "16px 20px 0 20px",
}

const cardContentStyle: React.CSSProperties = {
  padding: "16px 20px 20px 20px",
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

  // Shared select arrow SVG
  const selectArrowBg = {
    appearance: "none" as const,
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px center",
    paddingRight: "32px",
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Link href="/accounting/fixed-assets" style={{ display: "flex" }}>
          <button
            style={{
              ...btnOutlineStyle,
              width: "32px",
              height: "32px",
              padding: 0,
              justifyContent: "center",
            }}
          >
            <ArrowLeft style={{ width: "16px", height: "16px" }} />
          </button>
        </Link>
        <div>
          <h1 style={{ fontSize: "18px", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>
            Tambah Aset Tetap
          </h1>
          <p style={{ fontSize: "12px", color: "#666", margin: "2px 0 0 0" }}>
            Tambahkan aset tetap baru ke dalam register aset
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gap: "24px", gridTemplateColumns: "2fr 1fr" }}>
        {/* Main Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Informasi Dasar */}
          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
                <Building2 style={{ width: "16px", height: "16px", color: "#0176d3" }} />
                <h2 style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a1a", margin: 0 }}>
                  Informasi Aset
                </h2>
              </div>
              <p style={{ fontSize: "12px", color: "#666", margin: "2px 0 0 0" }}>
                Masukkan data dasar aset tetap
              </p>
            </div>
            <div style={cardContentStyle}>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* Nama Aset */}
                <div>
                  <label style={labelStyle}>Nama Aset *</label>
                  <input
                    placeholder="Contoh: Gedung Gudang Surabaya"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    style={inputStyle}
                  />
                </div>

                {/* Tanggal Beli & Tanggal Pakai */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={labelStyle}>Tanggal Beli *</label>
                    <input
                      type="date"
                      value={tanggalBeli}
                      onChange={(e) => setTanggalBeli(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Tanggal Pakai</label>
                    <input
                      type="date"
                      value={tanggalPakai}
                      onChange={(e) => setTanggalPakai(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Kode Aset & Harga Beli */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={labelStyle}>Kode Aset (Fixed Asset) *</label>
                    <input
                      placeholder="Contoh: FA-013"
                      value={kodeAset}
                      onChange={(e) => setKodeAset(e.target.value)}
                      style={{ ...inputStyle, fontFamily: "'Courier New', monospace" }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Harga Beli (Rp)</label>
                    <div style={{ position: "relative" }}>
                      <span style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "13px",
                        color: "#666",
                        fontWeight: 500,
                        pointerEvents: "none",
                      }}>
                        Rp
                      </span>
                      <input
                        type="text"
                        placeholder="0"
                        value={hargaBeli}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/[^0-9-]/g, "")
                          setHargaBeli(raw)
                        }}
                        style={{ ...inputStyle, paddingLeft: "40px", textAlign: "right" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Informasi Umum */}
          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
                <Calculator style={{ width: "16px", height: "16px", color: "#0176d3" }} />
                <h2 style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a1a", margin: 0 }}>
                  Informasi Umum
                </h2>
              </div>
              <p style={{ fontSize: "12px", color: "#666", margin: "2px 0 0 0" }}>
                Pengaturan penyusutan dan akun terkait
              </p>
            </div>
            <div style={cardContentStyle}>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* Aset Tidak Berwujud Checkbox */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 0" }}>
                  <input
                    type="checkbox"
                    id="intangible"
                    checked={asetTidakBerwujud}
                    onChange={(e) => setAsetTidakBerwujud(e.target.checked)}
                    style={{ width: "16px", height: "16px", margin: 0, cursor: "pointer" }}
                  />
                  <label htmlFor="intangible" style={{ fontSize: "13px", color: "#444746", cursor: "pointer", margin: 0 }}>
                    Aset Tidak Berwujud
                  </label>
                </div>

                {/* Metode Penyusutan */}
                <div>
                  <label style={labelStyle}>Metode Penyusutan</label>
                  <div style={{ position: "relative" }}>
                    <select
                      value={metodePenyusutan}
                      onChange={(e) => setMetodePenyusutan(e.target.value)}
                      style={{ ...selectTriggerStyle, ...selectArrowBg }}
                    >
                      <option value="">Pilih metode penyusutan...</option>
                      {metodePenyusutanOptions.map((m) => (
                        <option key={m.value} value={m.value}>
                          {m.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Akun Aset */}
                <div>
                  <label style={labelStyle}>Akun Aset *</label>
                  <div style={{ position: "relative" }}>
                    <select
                      value={akunAset}
                      onChange={(e) => setAkunAset(e.target.value)}
                      style={{ ...selectTriggerStyle, ...selectArrowBg }}
                    >
                      <option value="">Pilih akun aset...</option>
                      {akunAsetOptions.map((a) => (
                        <option key={a.value} value={a.value}>
                          {a.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Akumulasi Penyusutan */}
                <div>
                  <label style={labelStyle}>Akumulasi Penyusutan</label>
                  <div style={{ position: "relative" }}>
                    <select
                      value={akumPenyusutan}
                      onChange={(e) => setAkumPenyusutan(e.target.value)}
                      style={{ ...selectTriggerStyle, ...selectArrowBg }}
                    >
                      <option value="">Pilih akun akumulasi penyusutan...</option>
                      {akumPenyusutanOptions.map((a) => (
                        <option key={a.value} value={a.value}>
                          {a.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Beban Penyusutan */}
                <div>
                  <label style={labelStyle}>Beban Penyusutan</label>
                  <div style={{ position: "relative" }}>
                    <select
                      value={bebanPenyusutan}
                      onChange={(e) => setBebanPenyusutan(e.target.value)}
                      style={{ ...selectTriggerStyle, ...selectArrowBg }}
                    >
                      <option value="">Pilih akun beban penyusutan...</option>
                      {bebanPenyusutanOptions.map((b) => (
                        <option key={b.value} value={b.value}>
                          {b.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Kuantitas & Umur Aset */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={labelStyle}>Kuantitas</label>
                    <input
                      type="number"
                      value={kuantitas}
                      onChange={(e) => setKuantitas(e.target.value)}
                      style={inputStyle}
                      min="1"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Umur Aset (Tahun)</label>
                    <input
                      type="number"
                      value={umurTahun}
                      onChange={(e) => setUmurTahun(e.target.value)}
                      style={inputStyle}
                      min="0"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Umur Aset (Bulan)</label>
                    <input
                      type="number"
                      value={umurBulan}
                      onChange={(e) => setUmurBulan(e.target.value)}
                      style={inputStyle}
                      min="0"
                      max="11"
                    />
                  </div>
                </div>

                {/* Rasio & Nilai Sisa */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={labelStyle}>Rasio (%)</label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="number"
                        value={rasio}
                        onChange={(e) => setRasio(e.target.value)}
                        style={{ ...inputStyle, textAlign: "right", paddingRight: "32px" }}
                        min="0"
                        max="100"
                      />
                      <span style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "13px",
                        color: "#666",
                        pointerEvents: "none",
                      }}>
                        %
                      </span>
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Nilai Sisa (Rp)</label>
                    <div style={{ position: "relative" }}>
                      <span style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "13px",
                        color: "#666",
                        fontWeight: 500,
                        pointerEvents: "none",
                      }}>
                        Rp
                      </span>
                      <input
                        type="text"
                        placeholder="0"
                        value={nilaiSisa}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/[^0-9-]/g, "")
                          setNilaiSisa(raw)
                        }}
                        style={{ ...inputStyle, paddingLeft: "40px", textAlign: "right" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
            <Link href="/accounting/fixed-assets">
              <button type="button" style={btnOutlineStyle}>
                Batal
              </button>
            </Link>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{
                ...btnPrimaryStyle,
                opacity: isSubmitting ? 0.65 : 1,
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
            >
              {isSubmitting ? (
                "Menyimpan..."
              ) : (
                <>
                  <PlusCircle style={{ width: "14px", height: "14px" }} />
                  Simpan Aset
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sidebar - Preview */}
        <div>
          <div style={{ ...cardStyle, position: "sticky", top: "16px" }}>
            <div style={cardHeaderStyle}>
              <h2 style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a1a", margin: 0 }}>
                Preview Aset
              </h2>
            </div>
            <div style={cardContentStyle}>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {nama ? (
                  <>
                    <div>
                      <p style={{ fontSize: "11px", textTransform: "uppercase", color: "#444746", margin: 0 }}>
                        Nama Aset
                      </p>
                      <p style={{ fontSize: "13px", fontWeight: 500, color: "#1a1a1a", margin: "2px 0 0 0" }}>
                        {nama}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: "11px", textTransform: "uppercase", color: "#444746", margin: 0 }}>
                        Kode Aset
                      </p>
                      <p style={{ fontSize: "13px", fontFamily: "'Courier New', monospace", fontWeight: 500, color: "#1a1a1a", margin: "2px 0 0 0" }}>
                        {kodeAset || "\u2014"}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: "11px", textTransform: "uppercase", color: "#444746", margin: 0 }}>
                        Tanggal Beli
                      </p>
                      <p style={{ fontSize: "13px", color: "#1a1a1a", margin: "2px 0 0 0" }}>
                        {tanggalBeli || "\u2014"}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: "11px", textTransform: "uppercase", color: "#444746", margin: 0 }}>
                        Tanggal Pakai
                      </p>
                      <p style={{ fontSize: "13px", color: "#1a1a1a", margin: "2px 0 0 0" }}>
                        {tanggalPakai || "\u2014"}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: "11px", textTransform: "uppercase", color: "#444746", margin: 0 }}>
                        Harga Beli
                      </p>
                      <p style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a1a", margin: "2px 0 0 0" }}>
                        {parsedHargaBeli > 0 ? formatIDR(parsedHargaBeli) : "Rp 0"}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: "11px", textTransform: "uppercase", color: "#444746", margin: 0 }}>
                        Kuantitas
                      </p>
                      <p style={{ fontSize: "13px", color: "#1a1a1a", margin: "2px 0 0 0" }}>
                        {parsedKuantitas}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: "11px", textTransform: "uppercase", color: "#444746", margin: 0 }}>
                        Umur Aset
                      </p>
                      <p style={{ fontSize: "13px", color: "#1a1a1a", margin: "2px 0 0 0" }}>
                        {umurTahun} Tahun {umurBulan} Bulan
                      </p>
                    </div>
                    {asetTidakBerwujud && (
                      <div>
                        <p style={{ fontSize: "11px", textTransform: "uppercase", color: "#444746", margin: 0 }}>
                          Tipe
                        </p>
                        <p style={{ fontSize: "12px", fontWeight: 500, color: "#0176d3", margin: "2px 0 0 0" }}>
                          Aset Tidak Berwujud
                        </p>
                      </div>
                    )}
                    <div style={{ borderTop: "1px solid #d8d8d8", paddingTop: "12px", marginTop: "12px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ fontSize: "12px", color: "#444746" }}>Total Aset</span>
                          <span style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a1a" }}>
                            {formatIDR(totalAset)}
                          </span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ fontSize: "12px", color: "#444746" }}>Nilai Sisa</span>
                          <span style={{ fontSize: "13px", fontWeight: 500, color: "#e68a2e" }}>
                            {parsedNilaiSisa > 0 ? formatIDR(parsedNilaiSisa) : "Rp 0"}
                          </span>
                        </div>
                        <div style={{ borderTop: "1px solid #d8d8d8", paddingTop: "8px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ fontSize: "12px", fontWeight: 600, color: "#444746" }}>Nilai Buku</span>
                            <span style={{ fontSize: "13px", fontWeight: 700, color: "#2e844a" }}>
                              {formatIDR(nilaiBuku)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div style={{ padding: "32px 0", textAlign: "center" }}>
                    <Building2 style={{ margin: "0 auto 8px auto", width: "32px", height: "32px", color: "#c0c0c0" }} />
                    <p style={{ fontSize: "12px", color: "#999", margin: 0 }}>
                      Isi form untuk melihat preview
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm/Error Dialog */}
      {confirmOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "24px",
            maxWidth: "480px",
            width: "100%",
            boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
          }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#1a1a1a", margin: "0 0 4px 0" }}>
              {confirmSuccess ? "Berhasil" : "Perhatian"}
            </h2>
            <p style={{ fontSize: "13px", color: "#444746", margin: "8px 0 20px 0" }}>
              {confirmSuccess
                ? `Aset "${nama}" (${kodeAset}) berhasil ditambahkan ke register aset tetap.`
                : errorMessage}
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button onClick={handleDialogClose} style={btnPrimaryStyle}>
                {confirmSuccess ? "Kembali" : "Tutup"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
