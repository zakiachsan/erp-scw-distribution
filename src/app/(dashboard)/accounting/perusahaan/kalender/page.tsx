"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight, RefreshCw, X } from "lucide-react"

const HARI = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"]
const BULAN = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"]

const reminders = [
  { label: "Batch Number Expiry", color: "#4caf50" },
  { label: "Exchange Invoice Collection", color: "#795548" },
  { label: "Expense Payment Due", color: "#f9a825" },
  { label: "Goods Delivery Schedule", color: "#4caf50" },
  { label: "Goods Receipt Schedule", color: "#ffc107" },
  { label: "Inventory Taking Schedule", color: "#ffc107" },
  { label: "Jatuh Tempo Giro Keluar", color: "#1565c0" },
  { label: "Jatuh Tempo Pembayaran", color: "#78909c" },
  { label: "Jatuh Tempo Penerimaan", color: "#7b1fa2" },
  { label: "Payable Due", color: "#4caf50" },
  { label: "Payroll Payment Due", color: "#4caf50" },
  { label: "Purchase Income Tax Due", color: "#ffc107" },
  { label: "Purchase Requisition Due Date", color: "#ffc107" },
  { label: "Receivable Cheque/Giro Due", color: "#ffc107" },
  { label: "Receivable Due", color: "#4caf50" },
  { label: "Recurring Transactions", color: "#4caf50" },
  { label: "Sales Invoice Tax Due", color: "#7b1fa2" },
]

type ViewMode = "bulan" | "minggu" | "hari"
type ModalTab = "pengaturan" | "akses" | "event" | "admin"

export default function KalenderPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 6, 1))
  const [viewMode, setViewMode] = useState<ViewMode>("bulan")
  const [showModal, setShowModal] = useState(false)
  const [modalTab, setModalTab] = useState<ModalTab>("pengaturan")
  const [formData, setFormData] = useState({
    jenisKalender: "Kegiatan", namaKalender: "", deskripsi: "", semuaPengguna: false,
  })

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDay = (firstDay.getDay() + 6) % 7
    const totalDays = lastDay.getDate()
    const prevMonthDays = new Date(year, month, 0).getDate()

    const days: { date: number; isCurrentMonth: boolean; isToday: boolean }[] = []

    for (let i = startDay - 1; i >= 0; i--) {
      days.push({ date: prevMonthDays - i, isCurrentMonth: false, isToday: false })
    }
    for (let d = 1; d <= totalDays; d++) {
      const isToday = year === 2026 && month === 6 && d === 6
      days.push({ date: d, isCurrentMonth: true, isToday })
    }
    const remaining = 42 - days.length
    for (let d = 1; d <= remaining; d++) {
      days.push({ date: d, isCurrentMonth: false, isToday: false })
    }

    return days
  }, [year, month])

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))
  const goToday = () => setCurrentDate(new Date(2026, 6, 1))

  const handleSave = () => {
    console.log("Save calendar:", formData)
    setShowModal(false)
  }

  const modalTabs: { key: ModalTab; label: string }[] = [
    { key: "pengaturan", label: "Pengaturan" },
    { key: "akses", label: "Hak Mengakses" },
    { key: "event", label: "Hak Tambah/Ubah Event" },
    { key: "admin", label: "Hak Administrasi" },
  ]

  const inputStyle: React.CSSProperties = { height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none" }
  const viewBtnStyle = (active: boolean): React.CSSProperties => ({
    padding: "4px 12px", fontSize: 12, fontWeight: 500, border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer", textTransform: "capitalize",
    background: active ? "#0176d3" : "#fff", color: active ? "#fff" : "#444746", borderColor: active ? "#0176d3" : "#d8d8d8",
  })

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#fff" }}>
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", borderBottom: "1px solid #ecebea" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={goToday} style={{ height: 28, padding: "0 10px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 6, background: "#fff", color: "#444746", cursor: "pointer" }}>hari ini</button>
          <button onClick={prevMonth} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, background: "transparent", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer", color: "#444746" }}><ChevronLeft size={14} /></button>
          <button onClick={nextMonth} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, background: "transparent", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer", color: "#444746" }}><ChevronRight size={14} /></button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, background: "transparent", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer", color: "#0176d3" }}><RefreshCw size={14} /></button>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#001526", margin: 0, marginLeft: 8 }}>{BULAN[month]} {year}</h2>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {(["bulan", "minggu", "hari"] as ViewMode[]).map((mode) => (
            <button key={mode} onClick={() => setViewMode(mode)} style={viewBtnStyle(viewMode === mode)}>
              {mode}
            </button>
          ))}
          <button style={{ height: 28, padding: "0 10px", fontSize: 12, fontWeight: 500, border: "1px solid #0176d3", borderRadius: 6, background: "transparent", color: "#0176d3", cursor: "pointer" }}>+ Subscribe</button>
          <button onClick={() => { setShowModal(true); setModalTab("pengaturan") }} style={{ display: "inline-flex", alignItems: "center", gap: 4, height: 28, padding: "0 12px", fontSize: 12, fontWeight: 600, background: "#032d60", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>+ Buat Baru</button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>
          {/* Day headers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", background: "#032d60" }}>
            {HARI.map((h) => (
              <div key={h} style={{ padding: "8px 0", textAlign: "center", fontSize: 12, fontWeight: 600, color: "#fff", borderRight: "1px solid rgba(255,255,255,0.1)" }}>{h}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", flex: 1 }}>
            {calendarDays.map((day, i) => (
              <div key={i}
                style={{
                  padding: "4px 6px", minHeight: 70, borderRight: "1px solid #ecebea", borderBottom: "1px solid #ecebea",
                  cursor: "pointer", transition: "background 100ms",
                  background: day.isToday ? "#fff9e6" : day.isCurrentMonth ? "#fff" : "#fafafa",
                }}
                onMouseEnter={(e) => { if (!day.isToday) e.currentTarget.style.background = "#f0f7ff" }}
                onMouseLeave={(e) => { e.currentTarget.style.background = day.isToday ? "#fff9e6" : day.isCurrentMonth ? "#fff" : "#fafafa" }}>
                <span style={{ fontSize: 12, fontWeight: day.isToday ? 700 : 400, color: day.isCurrentMonth ? "#001526" : "#c9c9c9" }}>
                  {day.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ width: 260, borderLeft: "1px solid #ecebea", overflow: "auto", padding: "12px 14px" }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: "#001526", margin: "0 0 10px" }}>Reminder</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {reminders.map((r) => (
              <div key={r.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, color: "#444746" }}>{r.label}</span>
                <span style={{ width: 14, height: 14, borderRadius: 3, background: r.color, flexShrink: 0 }}></span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid #ecebea", marginTop: 14, paddingTop: 10 }}>
            <h4 style={{ fontSize: 12, fontWeight: 600, color: "#001526", margin: "0 0 6px" }}>Kegiatan</h4>
            <p style={{ fontSize: 11, color: "#b0b5ba", margin: 0 }}>Belum ada kalender</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", borderRadius: 8, width: 500, maxHeight: "80vh", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", background: "#032d60" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Form Kalender</span>
              <button onClick={() => setShowModal(false)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#fff", padding: 0 }}><X size={16} /></button>
            </div>

            <div style={{ display: "flex", borderBottom: "1px solid #ecebea" }}>
              {modalTabs.map((t) => (
                <button key={t.key} onClick={() => setModalTab(t.key)}
                  style={{
                    padding: "10px 14px", fontSize: 11, fontWeight: 500, background: "transparent", border: "none", cursor: "pointer",
                    color: modalTab === t.key ? "#0176d3" : "#444746",
                    borderBottom: modalTab === t.key ? "2px solid #0176d3" : "2px solid transparent",
                  }}>
                  {t.label}
                </button>
              ))}
            </div>

            <div style={{ padding: "16px 20px" }}>
              {modalTab === "pengaturan" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={{ fontSize: 13, color: "#444746", minWidth: 110 }}>Jenis Kalender *</label>
                    <select value={formData.jenisKalender} onChange={(e) => setFormData({ ...formData, jenisKalender: e.target.value })}
                      style={{ height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, background: "#fff", color: "#001526", cursor: "pointer", outline: "none", maxWidth: 200 }}>
                      <option>Kegiatan</option><option>Keuangan</option>
                    </select>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={{ fontSize: 13, color: "#444746", minWidth: 110 }}>Nama Kalender *</label>
                    <input value={formData.namaKalender} onChange={(e) => setFormData({ ...formData, namaKalender: e.target.value })}
                      style={inputStyle} />
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <label style={{ fontSize: 13, color: "#444746", minWidth: 110, marginTop: 6 }}>Deskripsi</label>
                    <textarea value={formData.deskripsi} onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })} rows={3}
                      style={{ flex: 1, padding: "6px 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", resize: "vertical" }} />
                  </div>
                </div>
              )}

              {(modalTab === "akses" || modalTab === "event" || modalTab === "admin") && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <input type="checkbox" checked={formData.semuaPengguna} onChange={(e) => setFormData({ ...formData, semuaPengguna: e.target.checked })}
                      style={{ width: 16, height: 16, cursor: "pointer" }} />
                    <span style={{ fontSize: 13, color: "#444746" }}>Semua Pengguna</span>
                  </div>
                  <p style={{ fontSize: 11, color: "#706e6b", margin: 0 }}>
                    {modalTab === "akses" && "Hak untuk melihat event-event yang ada pada kalender ini"}
                    {modalTab === "event" && "Hak untuk menambah, merubah ataupun menghapus event pada kalender"}
                    {modalTab === "admin" && "Hak untuk mengganti nama, deskripsi, dan parameter lainnya serta menghapus kalender"}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={{ fontSize: 13, color: "#444746", minWidth: 110 }}>Grup/Cabang</label>
                    <div style={{ position: "relative", flex: 1 }}>
                      <input placeholder="Cari/Pilih..." style={{ ...inputStyle, width: "100%", paddingRight: 30 }} />
                      <svg style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <label style={{ fontSize: 13, color: "#444746", minWidth: 110, marginTop: 4 }}>Pengguna</label>
                    <div style={{ flex: 1, border: "1px solid #d8d8d8", borderRadius: 6, padding: "4px 8px", display: "flex", flexWrap: "wrap", gap: 4, minHeight: 32, alignItems: "center" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 6px", background: "#e3f0ff", borderRadius: 10, fontSize: 11, color: "#0176d3" }}>
                        Email Zaki
                        <X size={10} style={{ cursor: "pointer" }} />
                      </span>
                      <input type="text" placeholder="Cari/Pilih..." style={{ border: "none", outline: "none", fontSize: 11, flex: 1, minWidth: 80 }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", padding: "12px 20px", borderTop: "1px solid #ecebea" }}>
              <button onClick={handleSave}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 20px", fontSize: 13, fontWeight: 600, background: "#2e844a", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
