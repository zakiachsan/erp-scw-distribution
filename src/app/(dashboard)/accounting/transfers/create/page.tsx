"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save, Send, ArrowRightLeft } from "lucide-react"

const cashBankAccounts = [
  { code: "1101", name: "Kas" },
  { code: "1102", name: "Bank BCA" },
  { code: "1103", name: "Bank Mandiri" },
]

function formatIDR(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`
}

function generateTransferNo(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const seq = String(Math.floor(Math.random() * 99999) + 1).padStart(5, "0")
  return `TF.${year}.${month}.${seq}`
}

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

export default function CreateTransferPage() {
  const [transferDate, setTransferDate] = useState(new Date().toISOString().split("T")[0])
  const [transferNo, setTransferNo] = useState(generateTransferNo())
  const [fromBank, setFromBank] = useState("")
  const [toBank, setToBank] = useState("")
  const [amount, setAmount] = useState(0)
  const [description, setDescription] = useState("")

  const fromAccount = cashBankAccounts.find((a) => a.code === fromBank)
  const toAccount = cashBankAccounts.find((a) => a.code === toBank)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link href="/accounting/transfers" style={{ display: "flex" }}>
            <button
              style={{
                ...btnOutlineStyle,
                width: "32px",
                height: "32px",
                padding: 0,
                justifyContent: "center",
              }}
            >
              <ArrowLeft style={{ width: "18px", height: "18px" }} />
            </button>
          </Link>
          <div>
            <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>
              Transfer Uang
            </h1>
            <p style={{ fontSize: "13px", color: "#666", margin: "2px 0 0 0" }}>
              Pindahkan dana antar rekening kas & bank
            </p>
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button style={btnOutlineStyle}>
            <Save style={{ width: "16px", height: "16px" }} />
            Simpan Draft
          </button>
          <button style={btnPrimaryStyle}>
            <Send style={{ width: "16px", height: "16px" }} />
            Terbitkan
          </button>
        </div>
      </div>

      {/* Transfer Form Card */}
      <div style={cardStyle}>
        <div style={cardHeaderStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
            <ArrowRightLeft style={{ width: "20px", height: "20px", color: "#0176d3" }} />
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#1a1a1a", margin: 0 }}>
              Detail Transfer
            </h2>
          </div>
          <p style={{ fontSize: "12px", color: "#666", margin: "2px 0 0 0" }}>
            Isi data transfer antar rekening bank
          </p>
        </div>
        <div style={cardContentStyle}>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Top Row: Date & Transfer No & Description */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
              <div>
                <label htmlFor="transferDate" style={labelStyle}>Tanggal Transaksi *</label>
                <input
                  id="transferDate"
                  type="date"
                  value={transferDate}
                  onChange={(e) => setTransferDate(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="transferNo" style={labelStyle}>Nomor Transfer *</label>
                <input
                  id="transferNo"
                  value={transferNo}
                  onChange={(e) => setTransferNo(e.target.value)}
                  style={{ ...inputStyle, fontFamily: "'Courier New', monospace" }}
                />
              </div>
              <div>
                <label htmlFor="description" style={labelStyle}>Keterangan</label>
                <input
                  id="description"
                  placeholder="Deskripsi transfer..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Transfer Visual */}
            <div style={{
              border: "1px solid #d8d8d8",
              borderRadius: "6px",
              backgroundColor: "#f9f9f9",
              padding: "24px",
            }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                gap: "16px",
                alignItems: "end",
              }}>
                {/* From */}
                <div>
                  <label style={labelStyle}>Dari Kas/Bank *</label>
                  <div style={{ position: "relative" }}>
                    <select
                      value={fromBank}
                      onChange={(e) => setFromBank(e.target.value ?? "")}
                      style={{
                        ...selectTriggerStyle,
                        appearance: "none",
                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 10px center",
                        paddingRight: "32px",
                      }}
                    >
                      <option value="">Pilih rekening asal...</option>
                      {cashBankAccounts.map((a) => (
                        <option key={a.code} value={a.code}>
                          {a.code} - {a.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {fromAccount && (
                    <div style={{
                      marginTop: "8px",
                      borderRadius: "6px",
                      backgroundColor: "#fff",
                      border: "1px solid #d8d8d8",
                      padding: "12px",
                    }}>
                      <p style={{ fontSize: "11px", color: "#666", margin: 0 }}>Rekening Asal</p>
                      <p style={{ fontSize: "13px", fontWeight: 600, color: "#1a1a1a", margin: "2px 0" }}>
                        {fromAccount.name}
                      </p>
                      <p style={{ fontSize: "11px", fontFamily: "'Courier New', monospace", color: "#666", margin: 0 }}>
                        {fromAccount.code}
                      </p>
                    </div>
                  )}
                </div>

                {/* Arrow */}
                <div style={{ display: "flex", justifyContent: "center", paddingBottom: "24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "48px", height: "1px", backgroundColor: "#c0c0c0" }} />
                    <ArrowRightLeft style={{ width: "24px", height: "24px", color: "#0176d3" }} />
                    <div style={{ width: "48px", height: "1px", backgroundColor: "#c0c0c0" }} />
                  </div>
                </div>

                {/* To */}
                <div>
                  <label style={labelStyle}>Ke Kas/Bank *</label>
                  <div style={{ position: "relative" }}>
                    <select
                      value={toBank}
                      onChange={(e) => setToBank(e.target.value ?? "")}
                      style={{
                        ...selectTriggerStyle,
                        appearance: "none",
                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 10px center",
                        paddingRight: "32px",
                      }}
                    >
                      <option value="">Pilih rekening tujuan...</option>
                      {cashBankAccounts.map((a) => (
                        <option key={a.code} value={a.code}>
                          {a.code} - {a.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {toAccount && (
                    <div style={{
                      marginTop: "8px",
                      borderRadius: "6px",
                      backgroundColor: "#fff",
                      border: "1px solid #d8d8d8",
                      padding: "12px",
                    }}>
                      <p style={{ fontSize: "11px", color: "#666", margin: 0 }}>Rekening Tujuan</p>
                      <p style={{ fontSize: "13px", fontWeight: 600, color: "#1a1a1a", margin: "2px 0" }}>
                        {toAccount.name}
                      </p>
                      <p style={{ fontSize: "11px", fontFamily: "'Courier New', monospace", color: "#666", margin: 0 }}>
                        {toAccount.code}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Amount */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
              <div>
                <label htmlFor="amount" style={labelStyle}>Jumlah Transfer (Rp) *</label>
                <input
                  id="amount"
                  type="number"
                  placeholder="0"
                  value={amount || ""}
                  onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                  style={{ ...inputStyle, textAlign: "right", fontSize: "16px" }}
                  min={0}
                />
                <p style={{ fontSize: "13px", color: "#666", margin: "4px 0 0 0" }}>
                  Terbilang: {formatIDR(amount)}
                </p>
              </div>
            </div>

            {/* Preview Table */}
            {fromBank && toBank && amount > 0 && (
              <div style={{ border: "1px solid #d8d8d8", borderRadius: "6px", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#f9f9f9" }}>
                      <th style={{
                        padding: "10px 12px",
                        textAlign: "left",
                        fontWeight: 600,
                        color: "#444746",
                        fontSize: "11px",
                        textTransform: "uppercase",
                        borderBottom: "1px solid #d8d8d8",
                      }}>
                        Rekening Asal
                      </th>
                      <th style={{
                        padding: "10px 12px",
                        textAlign: "left",
                        fontWeight: 600,
                        color: "#444746",
                        fontSize: "11px",
                        textTransform: "uppercase",
                        borderBottom: "1px solid #d8d8d8",
                      }}>
                        Rekening Tujuan
                      </th>
                      <th style={{
                        padding: "10px 12px",
                        textAlign: "right",
                        fontWeight: 600,
                        color: "#444746",
                        fontSize: "11px",
                        textTransform: "uppercase",
                        borderBottom: "1px solid #d8d8d8",
                      }}>
                        Jumlah
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: "10px 12px", borderBottom: "1px solid #d8d8d8" }}>
                        <span style={{ fontSize: "13px", fontWeight: 500, color: "#1a1a1a" }}>
                          {fromAccount?.name} ({fromAccount?.code})
                        </span>
                      </td>
                      <td style={{ padding: "10px 12px", borderBottom: "1px solid #d8d8d8" }}>
                        <span style={{ fontSize: "13px", fontWeight: 500, color: "#1a1a1a" }}>
                          {toAccount?.name} ({toAccount?.code})
                        </span>
                      </td>
                      <td style={{
                        padding: "10px 12px",
                        textAlign: "right",
                        borderBottom: "1px solid #d8d8d8",
                        fontWeight: 700,
                        color: "#1a1a1a",
                      }}>
                        {formatIDR(amount)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
