# Purchasing — PR & Price Quotation Implementation Plan

> **Goal:** Add Purchase Request (PR) and Price Quotation flow before PO in the Purchasing module.

**Flow:** PR (Pengajuan) → Price Quotation (Penawaran vendor + Perbandingan + Approval) → PO

**Architecture:** Follow existing patterns — hardcoded data via useState, same shadcn/ui components, same sidebar structure. All data lives in component state (no DB changes needed for MVP).

**Tech Stack:** Next.js 16 (src/app), React 19, shadcn/ui, Tailwind 4, lucide-react

---

## Task 1: Update sidebar menu (modules.ts)

**Objective:** Add "Purchase Requests" and "Price Quotations" as new menu items under Purchasing.

**Files:**
- Modify: `src/lib/modules.ts:69-73`

**Changes:**
```typescript
children: [
  { label: "Purchase Requests", href: "/purchasing/requests" },
  { label: "Price Quotations", href: "/purchasing/quotations" },
  { label: "Purchase Orders", href: "/purchasing" },
  { label: "Suppliers", href: "/purchasing/suppliers" },
  { label: "USD Rate", href: "/purchasing/usd-rate" },
],
```

---

## Task 2: Create Purchase Requests list page

**Objective:** PR list page with table, create modal, and multi-level approval tracker.

**Files:**
- Create: `src/app/(dashboard)/purchasing/requests/page.tsx`

**Features:**
- Table of PRs with columns: No PR, Request Date, Requester, Items, Total, Approval Status, Aksi
- Approval tracker component (3 levels: Pengaju → Mengetahui → Menyetujui)
- Approve/Reject buttons
- Create PR modal (no, requester, items with qty/specs/est price)
- Detail link per row

**Pattern:** Follow existing `purchasing/page.tsx` UI patterns (Card, Table, Badge, Button, modal).

---

## Task 3: Create PR detail page

**Objective:** PR detail view with approval tracker and item list.

**Files:**
- Create: `src/app/(dashboard)/purchasing/requests/[id]/page.tsx`

**Features:**
- Approval timeline (visual tracker from gac-erp style)
- List of items requested
- Status badge
- Link to create Quotation from this PR
- Back button to PR list

---

## Task 4: Create Price Quotations list page

**Objective:** List all PRs that have quotations, or create new quotation from PR.

**Files:**
- Create: `src/app/(dashboard)/purchasing/quotations/page.tsx`

**Features:**
- Table: PR No, Project, Items, Vendors (count), Selected Vendor, Status, Aksi
- Button "Buat Penawaran" → select PR → add vendors
- Status: "Menunggu Vendor", "Menunggu Approval", "Disetujui", "Selesai"
- Link to quotation detail

---

## Task 5: Create Price Quotation detail page

**Objective:** Detail page comparing multiple vendor prices, select best, approve.

**Files:**
- Create: `src/app/(dashboard)/purchasing/quotations/[id]/page.tsx`

**Features:**
- Step indicator showing position in procurement flow (inspired by gac-erp)
- Project info header
- Comparison table: Items (rows) × Vendors (columns)
  - Each cell: vendor's price for that item
  - Highlight lowest price in green
  - Total row per vendor
- Add vendor modal (name + upload document)
- Select/Pilih vendor button
- Approval flow after selection
- Tambah Item button

---

## Task 6: Wire up navigation

**Objective:** Verify all links work between pages and from sidebar.

---

## Key Design Decisions

1. **No DB changes** — all data uses component state (useState), same as existing purchasing pages
2. **UI patterns** — consistent with existing: Card, Table, Badge, Button, lucide icons
3. **Approval** — 3-level: Pengaju → Mengetahui → Menyetujui (from gac-erp)
4. **Step indicator** — shows position: PR → Quotation → PO (inspired by gac-erp)
5. **Quotation comparison** — table with vendor columns, item rows, lowest price highlighted
