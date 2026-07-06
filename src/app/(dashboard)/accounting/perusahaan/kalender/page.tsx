"use client"

import { useState, useMemo } from "react"
import {
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Plus,
  X,
} from "lucide-react"

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
  const [currentDate, setCurrentDate] = useState(new Date(2026, 6, 1)) // July 2026
  const [viewMode, setViewMode] = useState<ViewMode>("bulan")
  const [showModal, setShowModal] = useState(false)
  const [modalTab, setModalTab] = useState<ModalTab>("pengaturan")
  const [formData, setFormData] = useState({
    jenisKalender: "Kegiatan",
    namaKalender: "",
    deskripsi: "",
    semuaPengguna: false,
  })

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDay = (firstDay.getDay() + 6) % 7 // Monday = 0
    const totalDays = lastDay.getDate()
    const prevMonthDays = new Date(year, month, 0).getDate()

    const days: { date: number; isCurrentMonth: boolean; isToday: boolean }[] = []

    // Previous month
    for (let i = startDay - 1; i >= 0; i--) {
      days.push({ date: prevMonthDays - i, isCurrentMonth: false, isToday: false })
    }
    // Current month
    for (let d = 1; d <= totalDays; d++) {
      const isToday = year === 2026 && month === 6 && d === 6
      days.push({ date: d, isCurrentMonth: true, isToday })
    }
    // Next month
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

  const inputStyle = {
    padding: "6px 8px", fontSize: 12,
    border: "1px solid #d8d8d8", borderRadius: 4,
    outline: "none", width: "100%", boxSizing: "border-box" as const,
  }

  const labelStyle = { fontSize: 12, color: "#444746", minWidth: 110 }

  const modalTabs: { key: ModalTab; label: string }[] = [
    { key: "pengaturan", label: "Pengaturan" },
    { key: "akses", label: "Hak Mengakses" },
    { key: "event", label: "Hak Tambah/Ubah Event" },
    { key: "admin", label: "Hak Administrasi" },
  ]

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#fff" }}>
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", borderBottom: "1px solid #e5e5e5" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={goToday} style={{ padding: "4px 10px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 4, background: "#fff", cursor: "pointer", color: "#444746" }}>hari ini</button>
          <button onClick={prevMonth} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, border: "1px solid #d8d8d8", borderRadius: 4, background: "#fff", cursor: "pointer", color: "#444746" }}><ChevronLeft size={14} /></button>
          <button onClick={nextMonth} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, border: "1px solid #d8d8d8", borderRadius: 4, background: "#fff", cursor: "pointer", color: "#444746" }}><ChevronRight size={14} /></button>
          <button style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, border: "1px solid #d8d8d8", borderRadius: 4, background: "#fff", cursor: "pointer", color: "#0176d3" }}><RefreshCw size={12} /></button>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#001526", marginLeft: 8 }}>{BULAN[month]} {year}</h2>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {(["bulan", "minggu", "hari"] as ViewMode[]).map((mode) => (
            <button key={mode} onClick={() => setViewMode(mode)} style={{ padding: "4px 12px", fontSize: 11, fontWeight: viewMode === mode ? 600 : 400, border: "1px solid #d8d8d8", borderRadius: 4, background: viewMode === mode ? "#0176d3" : "#fff", color: viewMode === mode ? "#fff" : "#444746", cursor: "pointer", textTransform: "capitalize" }}>
              {mode}
            </button>
          ))}
          <button style={{ padding: "5px 12px", fontSize: 11, fontWeight: 500, border: "1px solid #0176d3", borderRadius: 4, background: "#fff", color: "#0176d3", cursor: "pointer" }}>+ Subscribe</button>
          <button onClick={() => { setShowModal(true); setModalTab("pengaturan") }} style={{ padding: "5px 12px", fontSize: 11, fontWeight: 600, border: "none", borderRadius: 4, background: "#1a237e", color: "#fff", cursor: "pointer" }}>+ Buat Baru</button>
        </div>
      </div>

      {/* Main content: Calendar + Sidebar */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Calendar grid */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>
          {/* Day headers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", background: "#4a5568" }}>
            {HARI.map((h) => (
              <div key={h} style={{ padding: "8px", textAlign: "center", fontSize: 11, fontWeight: 600, color: "#fff", borderRight: "1px solid #3a4150" }}>{h}</div>
            ))}
          </div>

          {/* Calendar cells */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", flex: 1 }}>
            {calendarDays.map((day, i) => (
              <div
                key={i}
                style={{
                  padding: "6px 8px",
                  minHeight: 70,
                  borderRight: "1px solid #f0f0f0",
                  borderBottom: "1px solid #f0f0f0",
                  background: day.isToday ? "#fffde7" : "#fff",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => { if (!day.isToday) e.currentTarget.style.background = "#f8f9ff" }}
                onMouseLeave={(e) => { if (!day.isToday) e.currentTarget.style.background = "#fff" }}
              >
                <span style={{ fontSize: 12, fontWeight: day.isToday ? 700 : 400, color: day.isCurrentMonth ? "#001526" : "#bbb" }}>
                  {day.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ width: 260, borderLeft: "1px solid #e5e5e5", overflow: "auto", padding: "12px 14px" }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#001526", marginBottom: 10 }}>Reminder</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {reminders.map((r) => (
              <div key={r.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 11 }}>
                <span style={{ color: "#444746" }}>{r.label}</span>
                <span style={{ padding: "1px 6px", borderRadius: 3, background: r.color, color: "#fff", fontSize: 9, fontWeight: 600, whiteSpace: "nowrap" }}></span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid #eee", marginTop: 14, paddingTop: 10 }}>
            <h4 style={{ fontSize: 12, fontWeight: 600, color: "#001526", marginBottom: 6 }}>Kegiatan</h4>
            <p style={{ fontSize: 11, color: "#888" }}>Belum ada kalender</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", borderRadius: 8, width: 500, maxHeight: "80vh", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", background: "#1a237e" }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>Form Kalender</span>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff" }}><X size={16} /></button>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid #d8d8d8" }}>
              {modalTabs.map((t) => (
                <button key={t.key} onClick={() => setModalTab(t.key)} style={{ padding: "10px 14px", fontSize: 11, fontWeight: modalTab === t.key ? 600 : 400, background: "none", border: "none", borderBottom: modalTab === t.key ? "2px solid #e91e63" : "2px solid transparent", color: modalTab === t.key ? "#e91e63" : "#666", cursor: "pointer" }}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div style={{ padding: "16px 20px" }}>
              {modalTab === "pengaturan" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={labelStyle}>Jenis Kalender *</label>
                    <select value={formData.jenisKalender} onChange={(e) => setFormData({ ...formData, jenisKalender: e.target.value })} style={{ ...inputStyle, maxWidth: 200, padding: "5px 8px", flex: "none" }}>
                      <option>Kegiatan</option>
                      <option>Keuangan</option>
                    </select>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={labelStyle}>Nama Kalender *</label>
                    <input type="text" value={formData.namaKalender} onChange={(e) => setFormData({ ...formData, namaKalender: e.target.value })} style={inputStyle} />
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <label style={{ ...labelStyle, marginTop: 6 }}>Deskripsi</label>
                    <textarea value={formData.deskripsi} onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
                  </div>
                </div>
              )}

              {(modalTab === "akses" || modalTab === "event" || modalTab === "admin") && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <input type="checkbox" checked={formData.semuaPengguna} onChange={(e) => setFormData({ ...formData, semuaPengguna: e.target.checked })} style={{ width: 16, height: 16 }} />
                    <span style={{ fontSize: 12, color: "#444746" }}>Semua Pengguna</span>
                  </div>
                  <p style={{ fontSize: 11, color: "#666" }}>
                    {modalTab === "akses" && "Hak untuk melihat event-event yang ada pada kalender ini"}
                    {modalTab === "event" && "Hak untuk menambah, merubah ataupun menghapus event pada kalender"}
                    {modalTab === "admin" && "Hak untuk mengganti nama, deskripsi, dan parameter lainnya serta menghapus kalender"}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={labelStyle}>Grup/Cabang</label>
                    <div style={{ position: "relative", flex: 1 }}>
                      <input type="text" placeholder="Cari/Pilih..." style={{ ...inputStyle, paddingLeft: 8, paddingRight: 28 }} />
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)" }}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <label style={{ ...labelStyle, marginTop: 6 }}>Pengguna</label>
                    <div style={{ flex: 1, border: "1px solid #d8d8d8", borderRadius: 4, padding: "4px 8px", display: "flex", flexWrap: "wrap", gap: 4, minHeight: 32, alignItems: "center" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 6px", background: "#e3f2fd", borderRadius: 3, fontSize: 11, color: "#1565c0" }}>
                        Email Zaki
                        <X size={10} style={{ cursor: "pointer" }} />
                      </span>
                      <input type="text" placeholder="Cari/Pilih..." style={{ border: "none", outline: "none", fontSize: 11, flex: 1, minWidth: 80 }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "12px 20px", borderTop: "1px solid #eee" }}>
              <button onClick={handleSave} style={{ padding: "7px 20px", fontSize: 12, fontWeight: 600, background: "#4caf50", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}>Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
