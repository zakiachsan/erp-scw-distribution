# SCW Distribution — Modul Akuntansi (Accounting Module)
## Implementation Plan

**Date:** 2026-06-18
**Status:** Plan Mode
**Stack:** Next.js 16 + shadcn/ui + Prisma ORM + PostgreSQL
**Standard:** PSAK (Pernyataan Standar Akuntansi Keuangan) — Ikatan Akuntan Indonesia

---

## Goal

Bangun modul akuntansi lengkap untuk SCW Distribution yang mengikuti standar PSAK Indonesia, dengan UX mirip Accurate Online. Modul ini menggantikan seluruh modul keuangan yang sudah ada.

---

## Fitur yang Dibangun (13 Fitur)

### Core Accounting
1. **Akun Perkiraan (Chart of Accounts)** — Hierarki akun 4-6 digit sesuai PSAK
2. **Jurnal Umum (General Journal)** — Double-entry bookkeeping, auto-balance validation

### Sales Cycle
3. **Penawaran Penjualan (Sales Quotation)** — SQ.YYYY.MM.NNNNN
4. **Faktur Penjualan (Sales Invoice)** — SI.YYYY.MM.NNNNN + auto journal

### Inventory
5. **Pekerjaan Pesanan (Work Order)** — JC.YYYY.MM.NNNNN (Job Costing)
6. **Penyelesaian Pesanan (Work Completion)** — Roll Over
7. **Penyesuaian Persediaan (Stock Adjustment)** — IA.YYYY.MM.NNNNN

### Cash & Bank
8. **Pembayaran (Payment Out)** — [AkunCode].YYYY.MM.NNNNN
9. **Penerimaan (Payment In)** — [AkunCode].YYYY.MM.NNNNN
10. **Transfer Bank** — Bank Transfer
11. **Rekonsiliasi Bank** — Split pane: Rekening Bank vs Jurnal

### Reporting & Assets
12. **Laporan Keuangan** — Neraca, Laba/Rugi, Arus Kas, Rasio, Grafik
13. **Aset Tetap + Auto Depresiasi** — Garis lurus, saldo menurun

---

## Database Schema (Prisma)

### File Structure

```
prisma/
├── schema.prisma                    # Main schema
├── models/
│   ├── accounting/
│   │   ├── ChartOfAccount.prisma
│   │   ├── JournalEntry.prisma
│   │   ├── JournalDetail.prisma
│   │   └── FiscalPeriod.prisma
│   ├── sales/
│   │   ├── SalesQuotation.prisma
│   │   ├── SalesInvoice.prisma
│   │   └── SalesDelivery.prisma
│   ├── inventory/
│   │   ├── Product.prisma
│   │   ├── Warehouse.prisma
│   │   ├── StockMovement.prisma
│   │   ├── StockBalance.prisma
│   │   ├── WorkOrder.prisma
│   │   └── WorkCompletion.prisma
│   ├── cashbank/
│   │   ├── Payment.prisma
│   │   ├── Receipt.prisma
│   │   ├── BankTransfer.prisma
│   │   └── BankReconciliation.prisma
│   ├── assets/
│   │   ├── FixedAsset.prisma
│   │   └── AssetDepreciation.prisma
│   └── system/
│       └── Sequence.prisma
```

### Core Tables

#### Chart of Accounts
```prisma
model ChartOfAccount {
  id            String   @id @default(cuid())
  code          String   @unique @db.VarChar(20)
  name          String   @db.VarChar(200)
  description   String?  @db.Text
  
  // Hierarki parent-child (recursive)
  parentId      String?
  parent        ChartOfAccount?  @relation("AccountHierarchy", fields: [parentId], references: [id])
  children      ChartOfAccount[] @relation("AccountHierarchy")
  
  // Klasifikasi
  accountType   AccountType      // ASSET, LIABILITY, EQUITY, INCOME, EXPENSE
  accountSubType AccountSubType? // BANK, CASH, RECEIVABLE, PAYABLE, FIXED_ASSET
  normalBalance NormalBalance @default(DEBIT)
  
  // Status
  isActive      Boolean  @default(true)
  isGroup       Boolean  @default(false)
  isSystem      Boolean  @default(false)
  
  // Currency
  currencyCode  String?  @default("IDR") @db.VarChar(3)
  
  // Laporan
  reportLine    String?  @db.VarChar(100)
  
  createdAt     DateTime @default(now()) @map("created_at")
  updatedAt     DateTime @updatedAt @map("updated_at")
  
  journalDetails JournalDetail[]
  
  @@map("chart_of_accounts")
}

enum AccountType { ASSET, LIABILITY, EQUITY, INCOME, EXPENSE }
enum AccountSubType { BANK, CASH, RECEIVABLE, PAYABLE, FIXED_ASSET, CURRENT_ASSET, LONG_TERM_ASSET, CURRENT_LIABILITY, LONG_TERM_LIABILITY, EQUITY, REVENUE, COST_OF_GOODS, OPERATING_EXPENSE, OTHER_INCOME, OTHER_EXPENSE }
enum NormalBalance { DEBIT, CREDIT }
```

#### Journal Entry
```prisma
model JournalEntry {
  id              String           @id @default(cuid())
  entryNumber     String           @unique @db.VarChar(30)
  postingDate     DateTime         @db.Date
  
  // Source reference
  sourceType      SourceDocumentType
  sourceId        String?
  sourceNumber    String?          @db.VarChar(30)
  
  status          JournalStatus    @default(DRAFT)
  description     String           @db.Text
  
  // Currency
  currencyCode    String           @default("IDR") @db.VarChar(3)
  exchangeRate    Decimal          @default(1) @db.Decimal(15, 8)
  
  // Validation
  totalDebit      Decimal          @default(0) @db.Decimal(18, 2)
  totalCredit     Decimal          @default(0) @db.Decimal(18, 2)
  isBalanced      Boolean          @default(true)
  
  // Fiscal
  fiscalYear      String           @db.VarChar(10)
  fiscalPeriod    Int              @db.SmallInt
  
  // Audit
  createdBy       String           @db.VarChar(50) @map("created_by")
  createdAt       DateTime         @default(now()) @map("created_at")
  postedAt        DateTime?        @map("posted_at")
  
  details         JournalDetail[]
  
  @@map("journal_entries")
}

model JournalDetail {
  id              String           @id @default(cuid())
  journalEntryId  String           @map("journal_entry_id")
  journalEntry    JournalEntry     @relation(fields: [journalEntryId], references: [id], onDelete: Cascade)
  
  lineSequence    Int              @default(0) @map("line_sequence")
  accountId       String           @map("account_id")
  account         ChartOfAccount   @relation(fields: [accountId], references: [id])
  
  debitAmount     Decimal          @default(0) @db.Decimal(18, 2) @map("debit_amount")
  creditAmount    Decimal          @default(0) @db.Decimal(18, 2) @map("credit_amount")
  
  partnerId       String?          @map("partner_id")
  description     String?          @db.VarChar(500)
  
  // Reconciliation
  reconcileId     String?          @map("reconcile_id")
  reconciledAt    DateTime?        @map("reconciled_at")
  
  createdAt       DateTime         @default(now()) @map("created_at")
  
  @@map("journal_details")
}

enum SourceDocumentType {
  JOURNAL_VOUCHER, SALES_QUOTATION, SALES_INVOICE, SALES_DELIVERY,
  PURCHASE_INVOICE, RECEIPT_VOUCHER, PAYMENT_VOUCHER, BANK_TRANSFER,
  STOCK_ADJUSTMENT, WORK_ORDER, WORK_COMPLETION,
  FIXED_ASSET_PURCHASE, FIXED_ASSET_DEPRECIATION,
  OPENING_ENTRY, CLOSING_ENTRY
}

enum JournalStatus { DRAFT, POSTED, REVERSED, VOIDED }
```

#### Auto-Numbering Sequence
```prisma
model Sequence {
  id            String   @id @default(cuid())
  sequenceName  String   @unique @map("sequence_name") @db.VarChar(100)
  prefix        String   @db.VarChar(20)
  formatPattern String   @db.VarChar(100) // e.g., "{prefix}{YYYY}{MM}.{seq:6}"
  currentNumber BigInt   @default(0) @map("current_number")
  incrementBy   Int      @default(1) @map("increment_by")
  minLength     Int      @default(1) @map("min_length")
  resetPeriod   ResetPeriod @default(NEVER) @map("reset_period")
  isActive      Boolean  @default(true)
  
  createdAt     DateTime @default(now()) @map("created_at")
  updatedAt     DateTime @updatedAt @map("updated_at")
  
  @@map("sequences")
}

enum ResetPeriod { NEVER, YEARLY, MONTHLY, WEEKLY, DAILY }
```

---

## Auto Journal Logic (PSAK Compliant)

### Sales Cycle

| Tahap | Journal Entry |
|-------|--------------|
| **Penawaran (SQ)** | Tidak ada journal |
| **Pesanan (SO)** | Tidak ada journal |
| **Pengiriman (DO)** | Dr: HPP (5100) / Cr: Persediaan (1310) |
| **Faktur (SI)** | Dr: Piutang Dagang (1210) / Cr: Pendapatan (4110) + Cr: PPN Keluaran (2320) |
| **Pembayaran (PM)** | Dr: Kas/Bank (1120) / Cr: Piutang Dagang (1210) |

### Inventory

| Tahap | Journal Entry |
|-------|--------------|
| **Pekerjaan Pesanan** | Dr: Persediaan Dalam Proses (1340) / Cr: Bahan Baku (1320) |
| **Penyelesaian** | Dr: Persediaan Barang Jadi (1350) / Cr: Persediaan Dalam Proses (1340) |
| **Penyesuaian (+)** | Dr: Persediaan (1310) / Cr: Selisih Persediaan (4250) |
| **Penyesuaian (-)** | Dr: Beban Selisih Stok (6960) / Cr: Persediaan (1310) |

### Cash & Bank

| Tahap | Journal Entry |
|-------|--------------|
| **Pembayaran** | Dr: Beban/Utang / Cr: Kas/Bank |
| **Penerimaan** | Dr: Kas/Bank / Cr: Piutang/Pendapatan |
| **Transfer** | Dr: Bank Tujuan / Cr: Bank Sumber |

### Fixed Assets

| Tahap | Journal Entry |
|-------|--------------|
| **Pembelian** | Dr: Aset Tetap (1400) / Cr: Kas/Bank (1120) |
| **Depresiasi/bulan** | Dr: Beban Penyusutan (6960) / Cr: Akum. Penyusutan (1500) |

---

## PSAK Compliance Checklist

- [ ] PSAK 1 — Penyajian Laporan Keuangan
- [ ] PSAK 14 — Inventori (metode FIFO/Weighted Average)
- [ ] PSAK 16 — Aset Tetap (metode depresiasi garis lurus)
- [ ] PSAK 23 — Pendapatan (pengakuan pendapatan)
- [ ] Double-entry validation (Debit = Kredit)
- [ ] PPN 11% handling
- [ ] Audit trail untuk semua transaksi
- [ ] Fiscal period control

---

## Implementation Phases

### Phase 1: Foundation (Database + CoA)
- [ ] Prisma schema untuk semua tabel
- [ ] Chart of Accounts CRUD
- [ ] Auto-numbering sequence engine
- [ ] Database triggers untuk double-entry validation

### Phase 2: Core Accounting
- [ ] Jurnal Umum (General Journal)
- [ ] Auto journal engine
- [ ] Posting & voiding

### Phase 3: Sales Cycle
- [ ] Penawaran Penjualan
- [ ] Faktur Penjualan (dengan auto journal)
- [ ] Status flow: SQ → SO → DO → SI

### Phase 4: Inventory
- [ ] Pekerjaan Pesanan (Work Order)
- [ ] Penyelesaian Pesanan (Work Completion)
- [ ] Penyesuaian Persediaan (Stock Adjustment)

### Phase 5: Cash & Bank
- [ ] Pembayaran (Payment Out)
- [ ] Penerimaan (Payment In)
- [ ] Transfer Bank
- [ ] Rekonsiliasi Bank

### Phase 6: Fixed Assets
- [ ] Aset Tetap CRUD
- [ ] Auto depresiasi engine
- [ ] Disposal & transfer

### Phase 7: Financial Reports
- [ ] Neraca (Balance Sheet)
- [ ] Laba/Rugi (Income Statement)
- [ ] Arus Kas (Cash Flow)
- [ ] Rasio Keuangan
- [ ] Grafik

### Phase 8: Integration & Testing
- [ ] Connect existing sales module
- [ ] Data migration dari Accurate
- [ ] User acceptance testing

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Auto journal logic error | High | Unit tests untuk setiap journal entry type |
| Double-entry imbalance | High | Database triggers + application validation |
| Performance on large datasets | Medium | Indexing strategy + pagination |
| PPN calculation error | High | Tested with real transaction data |
| Data migration from Accurate | Medium | Phased migration with rollback |

---

## Decisions (Confirmed)

1. **Multi-Currency: YES** — Support IDR + 1 foreign currency. Store both currency amount and base amount in journal details.

2. **Multi-Branch: NOT YET** — Single entity. Keep branchId field for future upgrade.

3. **Approval Workflow: SIMPLE**
   - Auto-generated journals → POSTED directly (system-generated, traceable)
   - Manual journal entries → DRAFT → POSTED by accountant (no approval needed)
   - Large amount (> Rp 50.000.000) → DRAFT → PENDING_APPROVAL → POSTED (needs manager approval)

4. **Data Retention: 10 YEARS** (compliant with UU KUP)
   - All transaction data: NEVER DELETED
   - Archive data > 5 years for performance
   - No "delete" function for accounting data — use REVERSAL (jurnal balik) instead
