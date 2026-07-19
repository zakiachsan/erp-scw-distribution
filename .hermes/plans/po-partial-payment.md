# PO Detail — Pembayaran Sebagian / DP — UI Plan

## Current State

Halaman `/purchasing/[id]` sekarang cuma nampilin:
- Header PO (supplier, tanggal, status)
- Tabel item pesanan
- Summary (subtotal, tax, shipping, grand total)
- Status badge "Paid" / "Unpaid"
- **Tidak ada** informasi pembayaran sama sekali

## Problem

User sering bayar **DP (uang muka)** dulu atau **cicil** ke supplier — misal:
- PO Rp 21.169.000
- Bayar DP 30% = Rp 6.350.700
- Sisanya dibayar setelah barang diterima

Sistem harus bisa tracking: **sudah bayar berapa, sisa berapa, kapan aja bayarnya.**

## Proposed Design

### 1. Payment Status Card (section baru di atas Order Items)

```
┌─────────────────────────────────────────────────────┐
│ ● Payment Status                        [Record Payment] │
│                                                      │
│  Grand Total        Paid            Remaining         │
│  Rp 21.169.000    Rp 6.350.700    Rp 14.818.300      │
│                                          ↑            │
│                                    progress bar       │
│                                    [████░░░░] 30%     │
│                                                      │
│  Payment Type: DP (30%)                              │
│  Due Date:     2026-08-15                            │
└─────────────────────────────────────────────────────┘
```

### 2. Payment History Table (di bawah Payment Status)

```
┌──────────────────────────────────────────────────────────┐
│ Payment History                                           │
├─────────┬──────────────┬──────────┬───────────┬──────────┤
│ Date    │ Type         │ Method   │ Amount    │ Notes    │
├─────────┼──────────────┼──────────┼───────────┼──────────┤
│ 12/12  │ DP (30%)     │ Transfer │ Rp 6.350.700 │ DP #1  │
│ 20/12  │ Pelunasan    │ Transfer │ Rp 14.818.300 │ Lunas   │
├─────────┼──────────────┼──────────┼───────────┼──────────┤
│         │              │ Total    │ Rp 21.169.000 │ ✅ LUNAS│
└──────────────────────────────────────────────────────────┘
```

### 3. Record Payment Dialog

Modal ketika klik "Record Payment":

```
┌──────────────────────────────────┐
│ Record Payment                   │
├──────────────────────────────────┤
│ Payment Type: [Dropdown]         │
│   → DP (Uang Muka)               │
│   → Angsuran                     │
│   → Pelunasan                    │
│                                  │
│ Amount:    [Rp 6.350.700]        │
│ Date:      [12/12/2026]          │
│ Method:    [Dropdown: Transfer /  │
│             Tunai / Cek / GIRO]  │
│ Reference: [Nomor referensi]     │
│ Notes:     [Catatan]             │
│                                  │
│ ┌──────────────────────────────┐ │
│ │ DP Percentage: [30] %        │ │
│ │ (otomatis kalo type = DP)    │ │
│ └──────────────────────────────┘ │
│                                  │
│       [Batal]    [Simpan]        │
└──────────────────────────────────┘
```

### 4. Status PO Otomatis

| Kondisi | Status |
|---------|--------|
| Belum bayar | **Unpaid** |
| Bayar DP / Sebagian | **Partial** (warna amber/biru) |
| Lunas | **Paid** (warna emerald) |

## Flow Logic

1. PO dibuat → status **Unpaid**
2. User klik "Record Payment" → pilih type **DP** → isi amount
3. Status PO berubah jadi **Partial**
4. Progress bar muncul sesuai % yg sudah dibayar
5. Pembayaran berikutnya → type **Angsuran** atau **Pelunasan**
6. Ketika total paid >= grand total → status **Paid**, progress bar 100%

## Files affected

| File | Change |
|------|--------|
| `src/app/(dashboard)/purchasing/[id]/page.tsx` | Tambah Payment Status card, Payment History table, Record Payment dialog |
| `src/app/(dashboard)/purchasing/page.tsx` | (maybe) Tambah status "Partial" di filter & badge |

## Data Model (in-memory)

```typescript
interface Payment {
  id: string
  date: string
  type: "DP" | "Angsuran" | "Pelunasan"
  method: "Transfer" | "Tunai" | "Cek" | "GIRO"
  amount: number
  reference: string
  notes: string
  dpPercentage?: number // only for DP type
}

interface POData {
  // ... existing fields
  payments: Payment[]
  paymentStatus: "Unpaid" | "Partial" | "Paid"
}
```

---

**Approach:** Minimal perubahan — cuma tambah section di PO detail page tanpa ubah struktur routing. Data pake in-memory state (sama seperti existing pattern). Nanti tinggal diintegrasi ke DB kalo sudah waktunya.

Mau lanjut coding? Atau ada yg mau disesuaikan dari plan ini?
