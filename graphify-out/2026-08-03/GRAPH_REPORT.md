# Graph Report - erp-scw-distribution  (2026-07-29)

## Corpus Check
- 257 files · ~311,459 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2210 nodes · 4955 edges · 166 communities (145 shown, 21 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `52ceaa05`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- card.tsx
- CardDescription
- table.tsx
- cn
- label.tsx
- pembayaran-pembelian/page.tsx
- inventory/[id]/page.tsx
- accounting-dummy-data.ts
- tiering/page.tsx
- histori-akun/page.tsx
- SCW Distribution — Modul Akuntansi (Accounting Module)
- compilerOptions
- roles/page.tsx
- badge.tsx
- jurnal-umum/page.tsx
- coupons/page.tsx
- pesanan-penjualan/page.tsx
- gudang/page.tsx
- components.json
- akun-perkiraan/page.tsx
- devDependencies
- customer-returns/create/page.tsx
- dependencies
- pencatatan-beban/page.tsx
- faktur-penjualan/page.tsx
- input.tsx
- anggaran/page.tsx
- pekerjaan-pesanan/page.tsx
- pipeline/[id]/page.tsx
- neraca/page.tsx
- barang-jasa/page.tsx
- navbar.tsx
- aset-tetap/page.tsx
- pemasok/page.tsx
- pemindahan-barang/page.tsx
- penambahan-bahan-baku/page.tsx
- modules/page.tsx
- fixed-assets/create/page.tsx
- pesanan-pembelian/page.tsx
- pelanggan/page.tsx
- penawaran-penjualan/page.tsx
- kategori-barang/page.tsx
- merek-barang/page.tsx
- penyelesaian-pesanan/page.tsx
- satuan-barang/page.tsx
- purchasing/[id]/page.tsx
- retur-penjualan/page.tsx
- penyesuaian-persediaan/page.tsx
- shipping/page.tsx
- i18n.ts
- commerce/page.tsx
- kategori-aset/page.tsx
- adjustments/page.tsx
- completions/page.tsx
- journal/create/page.tsx
- arus-kas/page.tsx
- kategori-pemasok/page.tsx
- retur-pembelian/page.tsx
- barang-stok-minimum/page.tsx
- transfers/create/page.tsx
- estimasi-harga/page.tsx
- PO Detail — Pembayaran Sebagian / DP — UI Plan
- adjustments/create/page.tsx
- completions/create/page.tsx
- faktur-pembelian/page.tsx
- uang-muka-pembelian/page.tsx
- komisi-penjual/page.tsx
- pengiriman-pesanan/page.tsx
- penyesuaian-harga-diskon/page.tsx
- target-penjualan/page.tsx
- fix_toolbar.py
- disposisi-aset-tetap/page.tsx
- work-orders/create/page.tsx
- transfer-bank/page.tsx
- harga-pemasok/page.tsx
- penerimaan-barang/page.tsx
- kategori-pelanggan/page.tsx
- kategori-penjualan/page.tsx
- purchasing/create/page.tsx
- purchasing/quotations/[id]/page.tsx
- requests/page.tsx
- (dashboard)/sales/quotations/create/page.tsx
- checkout/page.tsx
- aset-tetap/[id]/page.tsx
- fixed-asset/page.tsx
- smartlink-ebanking/page.tsx
- hutang-piutang/page.tsx
- pembelian/page.tsx
- penjualan/page.tsx
- ecommerce/customers/[id]/page.tsx
- suppliers/[id]/page.tsx
- (dashboard)/sales/invoices/create/page.tsx
- Purchasing — PR & Price Quotation Implementation Plan
- scripts
- fixed-assets/page.tsx
- packing/[id]/page.tsx
- usd-rate/page.tsx
- orders/create/page.tsx
- balance-sheet/page.tsx
- coa/create/page.tsx
- laba-rugi/page.tsx
- accounting/sales/invoices/create/page.tsx
- tax/page.tsx
- ecommerce/orders/[id]/page.tsx
- (dashboard)/page.tsx
- purchasing/page.tsx
- suppliers/page.tsx
- react
- commerce/orders/page.tsx
- coa/page.tsx
- accounting/payments/page.tsx
- kalender/page.tsx
- accounting/sales/invoices/page.tsx
- accounting/sales/quotations/create/page.tsx
- accounting/sales/quotations/page.tsx
- ecommerce/products/page.tsx
- outbond/create/page.tsx
- sales/customers/[id]/page.tsx
- sales-team/[id]/page.tsx
- accounting/reports/page.tsx
- ecommerce/page.tsx
- (dashboard)/sales/invoices/page.tsx
- app-layout.tsx
- operasional/page.tsx
- app/layout.tsx
- package.json
- README.md
- BudgetPage
- KPIPage
- fob/page.tsx
- log-aktifitas/page.tsx
- pengiriman/page.tsx
- syarat-pembayaran/page.tsx
- transaksi-favorit/page.tsx
- ReceiptsPage
- ReconciliationPage
- TransfersPage
- laporan/page.tsx
- perusahaan/page.tsx
- AGENTS.md
- date-fns
- eslint.config.mjs
- next
- next.config.ts
- next-env.d.ts
- @prisma/client
- react-day-picker
- react-dom
- tailwind-merge
- zustand
- postcss.config.mjs
- storefront/next-env.d.ts
- EstimasiHargaPage
- WorkOrdersPage
- CreatePaymentPage
- CreateReceiptPage
- clsx
- formatRupiah
- CommissionPage
- formatIDR

## God Nodes (most connected - your core abstractions)
1. `cn()` - 134 edges
2. `Card()` - 116 edges
3. `CardContent()` - 116 edges
4. `Badge()` - 100 edges
5. `Button()` - 98 edges
6. `CardHeader()` - 97 edges
7. `CardTitle()` - 97 edges
8. `Table()` - 83 edges
9. `TableHeader()` - 83 edges
10. `TableBody()` - 83 edges

## Surprising Connections (you probably didn't know these)
- `ProductDetailPage()` --references--> `react`  [EXTRACTED]
  src/app/commerce/products/[id]/page.tsx → package.json
- `SalesOrderDetailPage()` --references--> `react`  [EXTRACTED]
  src/app/(dashboard)/sales/orders/[id]/page.tsx → package.json
- `Sidebar()` --references--> `react`  [EXTRACTED]
  src/components/layout/sidebar.tsx → package.json
- `useT()` --references--> `react`  [EXTRACTED]
  src/lib/i18n.ts → package.json
- `CustomerReturnDetailPage()` --references--> `react`  [EXTRACTED]
  src/app/(dashboard)/customer-returns/[id]/page.tsx → package.json

## Import Cycles
- None detected.

## Communities (166 total, 21 thin omitted)

### Community 0 - "card.tsx"
Cohesion: 0.04
Nodes (76): accounts, formatIDR(), ledgerData, LedgerEntry, LedgerPage(), typeBadge(), conditionConfig, defaultReturn (+68 more)

### Community 1 - "CardDescription"
Cohesion: 0.16
Nodes (11): cogs, formatIDR(), operatingExpenses, PLLine, ProfitLossPage(), revenue, PackingOrder, packingOrders (+3 more)

### Community 2 - "table.tsx"
Cohesion: 0.36
Nodes (7): formatDate(), formatIDR(), journalEntries, JournalEntry, JournalPage(), statusBadge(), transactionTypes

### Community 3 - "cn"
Cohesion: 0.08
Nodes (42): AlertDialogMedia(), AlertDialogOverlay(), CardAction(), CardFooter(), Command(), CommandDialog(), CommandEmpty(), CommandGroup() (+34 more)

### Community 4 - "label.tsx"
Cohesion: 0.06
Nodes (52): Banner, initialBanners, Category, initialCategories, Coupon, CouponsPage(), formatRupiah(), initialCoupons (+44 more)

### Community 5 - "pembayaran-pembelian/page.tsx"
Cohesion: 0.12
Nodes (17): BTN_ICON, BTN_ICON_OUTLINE, formatIDR(), INPUT, PembayaranPage(), SELECT, TD, TH (+9 more)

### Community 6 - "inventory/[id]/page.tsx"
Cohesion: 0.05
Nodes (35): DamagedItemsPage(), DamagedDetailPage(), formatIDR(), formatUSD(), movementTypeConfig(), ProductDetailPage(), getPutawayStatus(), InboundPage() (+27 more)

### Community 7 - "accounting-dummy-data.ts"
Cohesion: 0.05
Nodes (31): btnIcon, btnIconOutline, inputStyle, labelStyle, rowStyle, selectStyle, tdStyle, thStyle (+23 more)

### Community 8 - "tiering/page.tsx"
Cohesion: 0.07
Nodes (36): defaultProduct, discussionsData, formatPrice(), productData, ProductDetailPage(), relatedProducts, reviewsData, Employee (+28 more)

### Community 9 - "histori-akun/page.tsx"
Cohesion: 0.06
Nodes (27): btnIconBlue, btnIconWhite, inputStyle, thStyle, BTN_ICON, BTN_ICON_OUTLINE, formatIDR(), HistoriBankPage() (+19 more)

### Community 10 - "SCW Distribution — Modul Akuntansi (Accounting Module)"
Cohesion: 0.06
Nodes (32): Auto Journal Logic (PSAK Compliant), Auto-Numbering Sequence, Cash & Bank, Cash & Bank, Chart of Accounts, Core Accounting, Core Tables, Database Schema (Prisma) (+24 more)

### Community 11 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 12 - "roles/page.tsx"
Cohesion: 0.28
Nodes (7): allProducts, categories, formatPrice(), priceRanges, ProductCardGrid(), ProductCardList(), SelectValue()

### Community 13 - "badge.tsx"
Cohesion: 0.11
Nodes (16): AccountingDashboardPage(), formatIDR(), btnIcon, btnIconOutline, inputStyle, labelStyle, rowStyle, selectStyle (+8 more)

### Community 14 - "jurnal-umum/page.tsx"
Cohesion: 0.08
Nodes (11): btnIconBlue, btnIconWhite, inputStyle, labelStyle, selectStyle, thStyle, btnIconWhite, inputStyle (+3 more)

### Community 15 - "coupons/page.tsx"
Cohesion: 0.18
Nodes (6): SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle()

### Community 16 - "pesanan-penjualan/page.tsx"
Cohesion: 0.17
Nodes (12): btnIcon, btnIconOutline, formatIDR(), inputStyle, labelStyle, PesananPenjualanPage(), rowStyle, selectStyle (+4 more)

### Community 17 - "gudang/page.tsx"
Cohesion: 0.14
Nodes (8): btnIcon, btnIconBlue, btnIconWhite, btnPrimary, FormTab, inputStyle, labelStyle, thStyle

### Community 18 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 19 - "akun-perkiraan/page.tsx"
Cohesion: 0.09
Nodes (13): AkunPerkiraanPage(), btnIcon, btnIconBlue, btnIconWhite, btnPrimary, FormTab, getNextKode(), inputStyle (+5 more)

### Community 20 - "devDependencies"
Cohesion: 0.10
Nodes (21): eslint, eslint-config-next, @opennextjs/cloudflare, devDependencies, eslint, eslint-config-next, @opennextjs/cloudflare, tailwindcss (+13 more)

### Community 21 - "customer-returns/create/page.tsx"
Cohesion: 0.25
Nodes (7): CreateReturnForm(), formatIDR(), reasons, ReturnItem, SalesOrder, salesOrders, SOItem

### Community 22 - "dependencies"
Cohesion: 0.11
Nodes (19): @base-ui/react, class-variance-authority, cmdk, date-fns, lucide-react, dependencies, @base-ui/react, class-variance-authority (+11 more)

### Community 23 - "pencatatan-beban/page.tsx"
Cohesion: 0.11
Nodes (8): btnIconBlue, btnIconWhite, btnPrimary, inputStyle, labelStyle, selectStyle, thStyle, ExpenseRecord

### Community 24 - "faktur-penjualan/page.tsx"
Cohesion: 0.12
Nodes (16): btnIcon, btnIconOutline, inputStyle, labelStyle, rowStyle, selectStyle, tdStyle, thRight (+8 more)

### Community 25 - "input.tsx"
Cohesion: 0.18
Nodes (11): react, react, CustomerReturnDetailPage(), formatIDR(), getInitialData(), LogisticDetailPage(), saveData(), buttonVariants (+3 more)

### Community 26 - "anggaran/page.tsx"
Cohesion: 0.12
Nodes (10): AnggaranPage(), btnIconBlue, btnIconWhite, formatIDR(), inputStyle, labelStyle, statusBadge(), thStyle (+2 more)

### Community 27 - "pekerjaan-pesanan/page.tsx"
Cohesion: 0.12
Nodes (12): btnIcon, btnIconBlue, btnIconWhite, btnPrimary, inputStyle, labelStyle, PekerjaanPesananPage(), selectStyle (+4 more)

### Community 28 - "pipeline/[id]/page.tsx"
Cohesion: 0.13
Nodes (16): ACTIVITY_TYPES, ActivityLog, formatIDR(), getActivityColor(), getActivityIcon(), MOCK_ACTIVITIES, MOCK_DEALS, MOCK_QUOTATION_ITEMS (+8 more)

### Community 29 - "neraca/page.tsx"
Cohesion: 0.14
Nodes (16): aktivaLancar, aktivaTetap, formatIDR(), liabPanjang, liabPendek, modalRows, NeracaPage(), periods (+8 more)

### Community 30 - "barang-jasa/page.tsx"
Cohesion: 0.12
Nodes (11): BarangDanJasaPage(), btnIcon, btnIconBlue, btnIconWhite, btnPrimary, formatIDR(), FormTab, inputStyle (+3 more)

### Community 31 - "navbar.tsx"
Cohesion: 0.10
Nodes (18): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), DropdownMenu(), DropdownMenuCheckboxItem() (+10 more)

### Community 32 - "aset-tetap/page.tsx"
Cohesion: 0.13
Nodes (14): AsetTetapPage(), btnIcon, btnIconOutline, formatIDR(), inputStyle, labelStyle, rowStyle, selectStyle (+6 more)

### Community 33 - "pemasok/page.tsx"
Cohesion: 0.14
Nodes (14): btnIcon, btnIconOutline, formatIDR(), FormTab, inputStyle, labelStyle, PemasokPage(), rowStyle (+6 more)

### Community 34 - "pemindahan-barang/page.tsx"
Cohesion: 0.12
Nodes (9): btnIcon, btnIconBlue, btnIconWhite, btnPrimary, inputStyle, labelStyle, selectStyle, thStyle (+1 more)

### Community 35 - "penambahan-bahan-baku/page.tsx"
Cohesion: 0.12
Nodes (9): BahanItem, btnIcon, btnIconBlue, btnIconWhite, btnPrimary, inputStyle, labelStyle, selectStyle (+1 more)

### Community 36 - "modules/page.tsx"
Cohesion: 0.10
Nodes (26): colorMap, iconMap, ModulesPage(), AppLayout(), LanguageSwitcher(), options, Navbar(), iconMap (+18 more)

### Community 37 - "fixed-assets/create/page.tsx"
Cohesion: 0.14
Nodes (14): akumPenyusutanOptions, akunAsetOptions, bebanPenyusutanOptions, btnOutlineStyle, btnPrimaryStyle, cardContentStyle, cardHeaderStyle, cardStyle (+6 more)

### Community 38 - "pesanan-pembelian/page.tsx"
Cohesion: 0.15
Nodes (14): btnIcon, btnIconOutline, formatIDR(), inputStyle, labelStyle, PesananPembelianPage(), rowStyle, selectStyle (+6 more)

### Community 39 - "pelanggan/page.tsx"
Cohesion: 0.15
Nodes (14): btnIcon, btnIconOutline, formatIDR(), FormTab, inputStyle, labelStyle, PelangganPage(), rowStyle (+6 more)

### Community 40 - "penawaran-penjualan/page.tsx"
Cohesion: 0.15
Nodes (14): btnIcon, btnIconOutline, btnOutline, btnPrimary, formatIDR(), inputStyle, labelStyle, PenawaranPenjualanPage() (+6 more)

### Community 41 - "kategori-barang/page.tsx"
Cohesion: 0.13
Nodes (9): btnIcon, btnIconBlue, btnIconWhite, btnPrimary, dummyData, inputStyle, Kategori, labelStyle (+1 more)

### Community 42 - "merek-barang/page.tsx"
Cohesion: 0.13
Nodes (9): btnIcon, btnIconBlue, btnIconWhite, btnPrimary, dummyData, inputStyle, labelStyle, Merek (+1 more)

### Community 43 - "penyelesaian-pesanan/page.tsx"
Cohesion: 0.13
Nodes (9): btnIcon, btnIconBlue, btnIconWhite, btnPrimary, inputStyle, labelStyle, selectStyle, thStyle (+1 more)

### Community 44 - "satuan-barang/page.tsx"
Cohesion: 0.13
Nodes (9): btnIcon, btnIconBlue, btnIconWhite, btnPrimary, dummyData, inputStyle, labelStyle, Satuan (+1 more)

### Community 45 - "purchasing/[id]/page.tsx"
Cohesion: 0.06
Nodes (44): Customer, customers, CustomersPage(), formatRupiah(), statusConfig, AllocationItem, CLAIM_STATUSES, ClaimStatus (+36 more)

### Community 46 - "retur-penjualan/page.tsx"
Cohesion: 0.15
Nodes (13): btnIcon, btnIconOutline, formatIDR(), inputStyle, labelStyle, ReturPenjualanPage(), rowStyle, selectStyle (+5 more)

### Community 47 - "penyesuaian-persediaan/page.tsx"
Cohesion: 0.12
Nodes (11): AdjustmentItem, AdjustmentType, btnIcon, btnIconBlue, btnIconWhite, btnPrimary, inputStyle, labelStyle (+3 more)

### Community 48 - "shipping/page.tsx"
Cohesion: 0.13
Nodes (16): CustomerListPage(), formatIDR(), SortKey, tierConfig, statusConfig, typeConfig, courierColors, DeliveryOrder (+8 more)

### Community 49 - "i18n.ts"
Cohesion: 0.08
Nodes (27): "asset_depreciations", "bank_reconciliations", "bank_transfers", "chart_of_accounts", "fiscal_periods", "fixed_assets", "journal_details", "journal_entries" (+19 more)

### Community 50 - "commerce/page.tsx"
Cohesion: 0.18
Nodes (8): banners, categories, featuredProducts, flashSaleProducts, FlashSaleSection(), formatPrice(), ProductCard(), rekomendasiProducts

### Community 51 - "kategori-aset/page.tsx"
Cohesion: 0.15
Nodes (10): btnIcon, btnIconOutline, dummyData, inputStyle, Kategori, labelStyle, rowStyle, selectStyle (+2 more)

### Community 52 - "adjustments/page.tsx"
Cohesion: 0.22
Nodes (11): Adjustment, adjustments, AdjustmentsPage(), categoryFilterOptions, formatDate(), slds, sldsButton(), sldsCard() (+3 more)

### Community 53 - "completions/page.tsx"
Cohesion: 0.22
Nodes (11): categoryFilterOptions, Completion, completions, CompletionsPage(), formatDate(), slds, sldsButton(), sldsCard() (+3 more)

### Community 54 - "journal/create/page.tsx"
Cohesion: 0.24
Nodes (12): chartOfAccounts, CreateJournalEntryPage(), formatIDR(), generateJournalNumber(), JournalLine, slds, sldsButton(), sldsCard() (+4 more)

### Community 55 - "arus-kas/page.tsx"
Cohesion: 0.19
Nodes (12): ArusKasPage(), formatIDR(), investasiRows, kasBersihInvestasi, kasBersihOperasi, kasBersihPendanaan, operasiRows, pendanaanRows (+4 more)

### Community 56 - "kategori-pemasok/page.tsx"
Cohesion: 0.15
Nodes (10): btnIcon, btnIconOutline, dummyData, inputStyle, Kategori, labelStyle, rowStyle, selectStyle (+2 more)

### Community 57 - "retur-pembelian/page.tsx"
Cohesion: 0.17
Nodes (12): btnIcon, btnIconOutline, formatIDR(), inputStyle, labelStyle, ReturPembelianPage(), rowStyle, selectStyle (+4 more)

### Community 58 - "barang-stok-minimum/page.tsx"
Cohesion: 0.08
Nodes (15): btnIcon, btnIconWhite, inputStyle, selectStyle, thStyle, BarangStokMinimumPage(), btnIcon, btnIconAmber (+7 more)

### Community 59 - "transfers/create/page.tsx"
Cohesion: 0.18
Nodes (12): btnOutlineStyle, btnPrimaryStyle, cardContentStyle, cardHeaderStyle, cardStyle, cashBankAccounts, CreateTransferPage(), formatIDR() (+4 more)

### Community 60 - "estimasi-harga/page.tsx"
Cohesion: 0.06
Nodes (37): cashBankAccounts, expenseAccounts, PaymentLine, AlertProduct, alertProducts, PackingVideo, videos, CourierPayment (+29 more)

### Community 61 - "PO Detail — Pembayaran Sebagian / DP — UI Plan"
Cohesion: 0.17
Nodes (11): 1. Payment Status Card (section baru di atas Order Items), 2. Payment History Table (di bawah Payment Status), 3. Record Payment Dialog, 4. Status PO Otomatis, Current State, Data Model (in-memory), Files affected, Flow Logic (+3 more)

### Community 62 - "adjustments/create/page.tsx"
Cohesion: 0.27
Nodes (11): AdjustmentLine, CreateAdjustmentPage(), formatIDR(), generateAdjustmentNumber(), inventoryItems, slds, sldsButton(), sldsCard() (+3 more)

### Community 63 - "completions/create/page.tsx"
Cohesion: 0.26
Nodes (11): CompletionLine, CreateCompletionPage(), formatIDR(), inventoryItems, slds, sldsButton(), sldsCard(), sldsInput() (+3 more)

### Community 64 - "faktur-pembelian/page.tsx"
Cohesion: 0.17
Nodes (10): btnIcon, btnIconOutline, inputStyle, labelStyle, rowStyle, selectStyle, tdMono, tdStyle (+2 more)

### Community 65 - "uang-muka-pembelian/page.tsx"
Cohesion: 0.17
Nodes (10): btnIcon, btnIconOutline, inputStyle, labelStyle, rowStyle, selectStyle, tdMono, tdStyle (+2 more)

### Community 66 - "komisi-penjual/page.tsx"
Cohesion: 0.22
Nodes (9): CustomerDetail, CustomerDetailPage(), formatRupiah(), mockCustomers, mockOrderHistory, mockReviews, OrderHistory, Review (+1 more)

### Community 67 - "pengiriman-pesanan/page.tsx"
Cohesion: 0.17
Nodes (10): btnIcon, btnIconOutline, inputStyle, labelStyle, rowStyle, selectStyle, tdStyle, thStyle (+2 more)

### Community 68 - "penyesuaian-harga-diskon/page.tsx"
Cohesion: 0.17
Nodes (10): btnIcon, btnIconOutline, inputStyle, labelStyle, rowStyle, selectStyle, tdStyle, thStyle (+2 more)

### Community 69 - "target-penjualan/page.tsx"
Cohesion: 0.17
Nodes (10): btnIcon, btnIconOutline, inputStyle, labelStyle, rowStyle, selectStyle, tdStyle, thStyle (+2 more)

### Community 70 - "fix_toolbar.py"
Cohesion: 0.27
Nodes (10): count_div_depth(), fix_placeholder(), merge_filter_toolbar_lines(), process_file(), Process a single file., Replace 'Ketik dan [Enter...' with 'Cari [context]..., Count net div depth change in a line, excluding self-closing divs., Merge filter div and toolbar div using line-based processing. (+2 more)

### Community 71 - "disposisi-aset-tetap/page.tsx"
Cohesion: 0.18
Nodes (8): btnIcon, btnIconOutline, inputStyle, labelStyle, rowStyle, selectStyle, tdStyle, thStyle

### Community 72 - "work-orders/create/page.tsx"
Cohesion: 0.27
Nodes (9): CreateWorkOrderPage(), generateWorkOrderNumber(), inventoryItems, slds, sldsButton(), sldsCard(), sldsInput(), sldsLabel() (+1 more)

### Community 73 - "transfer-bank/page.tsx"
Cohesion: 0.20
Nodes (10): BTN_ICON, BTN_ICON_OUTLINE, dummyData, formatIDR(), INPUT, SELECT, TD, TH (+2 more)

### Community 74 - "harga-pemasok/page.tsx"
Cohesion: 0.18
Nodes (8): btnIcon, btnIconOutline, inputStyle, labelStyle, rowStyle, selectStyle, tdStyle, thStyle

### Community 75 - "penerimaan-barang/page.tsx"
Cohesion: 0.18
Nodes (9): btnIcon, btnIconOutline, inputStyle, labelStyle, rowStyle, selectStyle, tdMono, tdStyle (+1 more)

### Community 76 - "kategori-pelanggan/page.tsx"
Cohesion: 0.18
Nodes (9): btnIcon, btnIconOutline, dummyData, inputStyle, Kategori, labelStyle, rowStyle, tdStyle (+1 more)

### Community 77 - "kategori-penjualan/page.tsx"
Cohesion: 0.18
Nodes (9): btnIcon, btnIconOutline, dummyData, inputStyle, Kategori, labelStyle, rowStyle, tdStyle (+1 more)

### Community 78 - "purchasing/create/page.tsx"
Cohesion: 0.20
Nodes (9): CreatePOPageContent(), CURRENCIES, Currency, CURRENCY_LABELS, CURRENCY_SYMBOLS, formatCurrency(), POItem, products (+1 more)

### Community 79 - "purchasing/quotations/[id]/page.tsx"
Cohesion: 0.50
Nodes (4): fmt(), parseNum(), QuotationDetailPage(), recalcVendor()

### Community 80 - "requests/page.tsx"
Cohesion: 0.22
Nodes (10): fmt(), initialDepartments, initialProducts, initialPRs, initialRequesters, PRItem, PurchaseRequest, PurchaseRequestsPage() (+2 more)

### Community 81 - "(dashboard)/sales/quotations/create/page.tsx"
Cohesion: 0.13
Nodes (16): categories, defaultProduct, mockProducts, categories, CreateQuotationForm(), customers, CustomerType, customerTypeDiscount (+8 more)

### Community 82 - "checkout/page.tsx"
Cohesion: 0.16
Nodes (13): CartItem, CartPage(), formatPrice(), initialCartItems, checkoutItems, CheckoutPage(), formatPrice(), paymentMethods (+5 more)

### Community 83 - "aset-tetap/[id]/page.tsx"
Cohesion: 0.22
Nodes (9): AsetTetapDetailPage(), assetData, AssetDetail, formatIDR(), labelStyle, tdMono, tdStyle, thRight (+1 more)

### Community 84 - "fixed-asset/page.tsx"
Cohesion: 0.24
Nodes (9): assets, categoryIcons, FixedAsset, FixedAssetPage(), formatIDR(), statusBadge(), totalAccumDep, totalBookValue (+1 more)

### Community 85 - "smartlink-ebanking/page.tsx"
Cohesion: 0.20
Nodes (7): defaultPO, initialPaymentsPO1, Payment, POData, poDataMap, statusConfig, timelineColorConfig

### Community 86 - "hutang-piutang/page.tsx"
Cohesion: 0.22
Nodes (9): formatIDR(), hutangData, HutangPiutangPage(), periods, piutangData, tdStyle, thStyle, totalHutang (+1 more)

### Community 87 - "pembelian/page.tsx"
Cohesion: 0.22
Nodes (9): formatIDR(), LaporanPembelianPage(), monthlyData, periods, summaryCards, tdStyle, thStyle, totalPembelian (+1 more)

### Community 88 - "penjualan/page.tsx"
Cohesion: 0.18
Nodes (11): FilterPreset, formatIDR(), inputStyle, LaporanPenjualanPage(), monthlyData, periods, tdStyle, thStyle (+3 more)

### Community 89 - "ecommerce/customers/[id]/page.tsx"
Cohesion: 0.20
Nodes (7): customers, OrderItem, PIPELINE_DEALS, PIPELINE_QUOTATION_ITEMS, products, QUOTATION_DATA, tierDiscountMap

### Community 90 - "suppliers/[id]/page.tsx"
Cohesion: 0.21
Nodes (13): formatCurrency(), formatIDR(), getAgingBadge(), getAgingDays(), getDueStatus(), paymentTermsOptions, POTransaction, poTransactions (+5 more)

### Community 91 - "(dashboard)/sales/invoices/create/page.tsx"
Cohesion: 0.20
Nodes (9): CreateInvoiceContent(), formatIDR(), invoiceableStatuses, PO, POItem, products, purchaseOrders, statusConfig (+1 more)

### Community 92 - "Purchasing — PR & Price Quotation Implementation Plan"
Cohesion: 0.22
Nodes (8): Key Design Decisions, Purchasing — PR & Price Quotation Implementation Plan, Task 1: Update sidebar menu (modules.ts), Task 2: Create Purchase Requests list page, Task 3: Create PR detail page, Task 4: Create Price Quotations list page, Task 5: Create Price Quotation detail page, Task 6: Wire up navigation

### Community 93 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, build, cf-typegen, deploy, dev, lint, preview, start (+1 more)

### Community 94 - "fixed-assets/page.tsx"
Cohesion: 0.28
Nodes (8): categoryIcons, FixedAsset, FixedAssetsPage(), formatIDR(), kategoriFilterOptions, mockAssets, statusBadge(), statusConfig

### Community 95 - "packing/[id]/page.tsx"
Cohesion: 0.28
Nodes (8): formatIDR(), LineItem, MaterialUsed, nextVideoId(), PACKING_DATA, PackingDetail, PackingDetailPage(), PackingVideo

### Community 96 - "usd-rate/page.tsx"
Cohesion: 0.17
Nodes (12): btnIcon, btnIconOutline, formatIDR(), inputStyle, labelStyle, PembayaranPembelianPage(), rowStyle, selectStyle (+4 more)

### Community 97 - "orders/create/page.tsx"
Cohesion: 0.17
Nodes (12): btnIcon, btnIconOutline, formatIDR(), inputStyle, labelStyle, PenerimaanPenjualanPage(), rowStyle, selectStyle (+4 more)

### Community 98 - "balance-sheet/page.tsx"
Cohesion: 0.21
Nodes (11): countMenusPerms(), emptyPerms(), initialRoles, isMenuAllChecked(), isMenuSomeChecked(), MenuPerms, moduleDefs, Perm (+3 more)

### Community 100 - "laba-rugi/page.tsx"
Cohesion: 0.29
Nodes (7): bebanRows, formatIDR(), LabaRugiPage(), periods, sections, tdStyle, thStyle

### Community 101 - "accounting/sales/invoices/create/page.tsx"
Cohesion: 0.25
Nodes (8): flowSteps, formatIDR(), OrderItem, orders, paymentConfig, SalesOrderDetail, SalesOrderDetailPage(), statusConfig

### Community 102 - "tax/page.tsx"
Cohesion: 0.22
Nodes (7): formatCompactIDR(), INITIAL_DEALS, PipelineDeal, PipelinePage(), SALES_PEOPLE, StageId, STAGES

### Community 103 - "ecommerce/orders/[id]/page.tsx"
Cohesion: 0.29
Nodes (7): formatRupiah(), mockOrders, OrderDetail, OrderDetailPage(), OrderItem, statusConfig, statusSteps

### Community 104 - "(dashboard)/page.tsx"
Cohesion: 0.32
Nodes (7): DashboardPage(), getActivityBadge(), getActivityIcon(), quickActions, recentActivities, salesData, statCards

### Community 105 - "purchasing/page.tsx"
Cohesion: 0.29
Nodes (6): CURRENCY_SYMBOLS, formatCurrency(), PurchaseOrder, purchaseOrders, PurchasingPage(), statusConfig

### Community 106 - "suppliers/page.tsx"
Cohesion: 0.50
Nodes (4): fmtIDR(), getAgingBadge(), getAgingDays(), SuppliersPage()

### Community 107 - "react"
Cohesion: 0.22
Nodes (3): SettingsLayout(), settingsNav, TooltipContent()

### Community 108 - "commerce/orders/page.tsx"
Cohesion: 0.33
Nodes (6): formatPrice(), Order, orders, OrdersPage(), statusConfig, statusTabs

### Community 109 - "coa/page.tsx"
Cohesion: 0.33
Nodes (6): AccountType, accountTypeConfig, COAAccount, COAPage(), formatIDR(), mockCOA

### Community 110 - "accounting/payments/page.tsx"
Cohesion: 0.08
Nodes (24): FilterValue, formatIDR(), Payment, payments, PaymentsPage(), statusBadge(), formatRupiah(), Product (+16 more)

### Community 111 - "kalender/page.tsx"
Cohesion: 0.29
Nodes (5): BULAN, HARI, ModalTab, reminders, ViewMode

### Community 112 - "accounting/sales/invoices/page.tsx"
Cohesion: 0.33
Nodes (6): FilterValue, formatIDR(), Invoice, invoices, InvoicesPage(), statusConfig

### Community 113 - "accounting/sales/quotations/create/page.tsx"
Cohesion: 0.38
Nodes (6): CreateQuotationPage(), customers, formatIDR(), generateQuoteNumber(), products, QuoteItem

### Community 114 - "accounting/sales/quotations/page.tsx"
Cohesion: 0.33
Nodes (6): FilterValue, formatIDR(), Quotation, quotations, QuotationsPage(), statusConfig

### Community 115 - "ecommerce/products/page.tsx"
Cohesion: 0.29
Nodes (7): BalanceSheetItem, BalanceSheetPage(), currentAssets, equity, fixedAssets, formatIDR(), liabilities

### Community 116 - "outbond/create/page.tsx"
Cohesion: 0.33
Nodes (6): ALL_PRODUCTS, CreateOutbondPage(), LineItem, nextLineId(), Tujuan, TUJUAN_OPTIONS

### Community 117 - "sales/customers/[id]/page.tsx"
Cohesion: 0.33
Nodes (6): customerData, CustomerDetailPage(), formatIDR(), purchaseHistory, statusConfig, tierDiscounts

### Community 118 - "sales-team/[id]/page.tsx"
Cohesion: 0.32
Nodes (7): CreateInvoicePage(), customers, formatIDR(), generateInvoiceNumber(), InvoiceItem, products, quotations

### Community 119 - "accounting/reports/page.tsx"
Cohesion: 0.33
Nodes (4): categories, CategoryId, ReportItem, reportsByCategory

### Community 120 - "ecommerce/page.tsx"
Cohesion: 0.33
Nodes (4): quickActions, recentOrders, stats, statusColors

### Community 121 - "(dashboard)/sales/invoices/page.tsx"
Cohesion: 0.40
Nodes (5): formatIDR(), Invoice, InvoiceListPage(), invoices, statusConfig

### Community 122 - "app-layout.tsx"
Cohesion: 1.00
Nodes (3): fmtForeign(), fmtIDR(), LogisticPage()

### Community 123 - "operasional/page.tsx"
Cohesion: 0.40
Nodes (3): quickActions, recentActivities, stats

### Community 124 - "app/layout.tsx"
Cohesion: 0.40
Nodes (3): geistMono, jakartaSans, metadata

### Community 125 - "package.json"
Cohesion: 0.50
Nodes (3): name, private, version

### Community 126 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 127 - "BudgetPage"
Cohesion: 0.36
Nodes (7): budgetData, BudgetItem, BudgetPage(), divisions, formatIDR(), progressColor(), utilizationBadge()

### Community 129 - "KPIPage"
Cohesion: 0.31
Nodes (8): departments, EmployeeKPI, employees, getScoreBg(), getScoreColor(), getScoreLabel(), KPIMetric, KPIPage()

### Community 135 - "ReceiptsPage"
Cohesion: 0.36
Nodes (7): cashBankOptions, formatDate(), formatIDR(), mockReceipts, ReceiptItem, ReceiptsPage(), statusBadge()

### Community 136 - "ReconciliationPage"
Cohesion: 0.36
Nodes (7): bankOptions, formatDate(), formatIDR(), mockReconciliations, Reconciliation, ReconciliationPage(), statusBadge()

### Community 137 - "TransfersPage"
Cohesion: 0.36
Nodes (7): bankOptions, formatDate(), formatIDR(), mockTransfers, statusBadge(), Transfer, TransfersPage()

### Community 141 - "date-fns"
Cohesion: 0.40
Nodes (5): formatCurrency(), formatIDR(), generateOrderTimeline(), PurchaseOrderDetailContent(), today()

### Community 159 - "EstimasiHargaPage"
Cohesion: 0.27
Nodes (9): calculateShipping(), EstimasiHargaPage(), formatRupiah(), LineItem, nextLineId(), Product, products, TIER_DISCOUNT (+1 more)

### Community 160 - "WorkOrdersPage"
Cohesion: 0.38
Nodes (6): categoryFilterOptions, formatDate(), statusBadge(), WorkOrder, workOrders, WorkOrdersPage()

### Community 161 - "CreatePaymentPage"
Cohesion: 0.67
Nodes (3): CreatePaymentPage(), formatIDR(), generateVoucherNo()

### Community 162 - "CreateReceiptPage"
Cohesion: 0.38
Nodes (6): cashBankAccounts, CreateReceiptPage(), formatIDR(), generateVoucherNo(), incomeAccounts, ReceiptLine

### Community 168 - "formatRupiah"
Cohesion: 0.33
Nodes (6): formatRupiah(), Order, orders, OrdersPage(), statusConfig, statusTabs

### Community 173 - "CommissionPage"
Cohesion: 0.33
Nodes (6): CommissionPage(), formatIDR(), periods, SalesPerson, salesPersons, SelectItem()

### Community 177 - "formatIDR"
Cohesion: 0.29
Nodes (7): flowSteps, formatIDR(), orders, paymentConfig, SalesOrder, SalesOrdersPage(), statusConfig

## Knowledge Gaps
- **1161 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+1156 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `card.tsx`, `CardDescription`, `modules/page.tsx`, `label.tsx`, `tiering/page.tsx`, `react`, `roles/page.tsx`, `purchasing/[id]/page.tsx`, `accounting/payments/page.tsx`, `CommissionPage`, `coupons/page.tsx`, `(dashboard)/sales/quotations/create/page.tsx`, `checkout/page.tsx`, `input.tsx`, `estimasi-harga/page.tsx`, `navbar.tsx`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Why does `react` connect `input.tsx` to `tiering/page.tsx`, `modules/page.tsx`, `accounting/sales/invoices/create/page.tsx`, `dependencies`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `clsx`, `next`, `@prisma/client`, `react-day-picker`, `react-dom`, `tailwind-merge`, `zustand`, `input.tsx`, `package.json`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _1161 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `card.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.04254385964912281 - nodes in this community are weakly interconnected._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.07955596669750231 - nodes in this community are weakly interconnected._
- **Should `label.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0625694187338023 - nodes in this community are weakly interconnected._