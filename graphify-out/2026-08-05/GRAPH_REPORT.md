# Graph Report - erp-scw-distribution  (2026-08-03)

## Corpus Check
- 266 files · ~327,037 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2339 nodes · 5119 edges · 164 communities (143 shown, 21 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4406a7ec`
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
- invoices/[id]/page.tsx
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
- clsx
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
- `LogisticDetailPage()` --references--> `react`  [EXTRACTED]
  src/app/(dashboard)/purchasing/logistic/[id]/page.tsx → package.json
- `Sidebar()` --references--> `react`  [EXTRACTED]
  src/components/layout/sidebar.tsx → package.json
- `useT()` --references--> `react`  [EXTRACTED]
  src/lib/i18n.ts → package.json
- `CustomerReturnDetailPage()` --references--> `react`  [EXTRACTED]
  src/app/(dashboard)/customer-returns/[id]/page.tsx → package.json

## Import Cycles
- None detected.

## Communities (164 total, 21 thin omitted)

### Community 0 - "card.tsx"
Cohesion: 0.04
Nodes (73): departments, EmployeeKPI, employees, KPIMetric, initialReviews, Review, ReviewStatus, statusConfig (+65 more)

### Community 1 - "CardDescription"
Cohesion: 0.08
Nodes (36): Banner, initialBanners, Category, initialCategories, Coupon, CouponsPage(), formatRupiah(), initialCoupons (+28 more)

### Community 2 - "table.tsx"
Cohesion: 0.36
Nodes (7): formatDate(), formatIDR(), journalEntries, JournalEntry, JournalPage(), statusBadge(), transactionTypes

### Community 3 - "cn"
Cohesion: 0.16
Nodes (16): Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem(), CommandList(), CommandSeparator() (+8 more)

### Community 4 - "label.tsx"
Cohesion: 0.05
Nodes (72): CreateReturnForm(), formatIDR(), Invoice, InvoiceItem, invoices, reasons, ReturnItem, salesOrders (+64 more)

### Community 5 - "pembayaran-pembelian/page.tsx"
Cohesion: 0.12
Nodes (17): BTN_ICON, BTN_ICON_OUTLINE, formatIDR(), INPUT, PembayaranPage(), SELECT, TD, TH (+9 more)

### Community 6 - "inventory/[id]/page.tsx"
Cohesion: 0.07
Nodes (26): CourierPayment, courierPaymentsByShipment, getInitialData(), LogisticDetailPage(), LogisticItem, nextStatus, PaymentRecord, saveData() (+18 more)

### Community 7 - "accounting-dummy-data.ts"
Cohesion: 0.06
Nodes (33): AccountingDashboardPage(), formatIDR(), Tab, defaultKurs, KursMataUang, AssetCategory, AssetChange, AssetDisposition (+25 more)

### Community 8 - "tiering/page.tsx"
Cohesion: 0.09
Nodes (31): defaultProduct, discussionsData, formatPrice(), productData, ProductDetailPage(), relatedProducts, reviewsData, Employee (+23 more)

### Community 9 - "histori-akun/page.tsx"
Cohesion: 0.06
Nodes (30): btnIconBlue, btnIconWhite, cardStyle, extendedRecords, inputStyle, selectStyle, thStyle, BTN_ICON (+22 more)

### Community 10 - "SCW Distribution — Modul Akuntansi (Accounting Module)"
Cohesion: 0.06
Nodes (32): Auto Journal Logic (PSAK Compliant), Auto-Numbering Sequence, Cash & Bank, Cash & Bank, Chart of Accounts, Core Accounting, Core Tables, Database Schema (Prisma) (+24 more)

### Community 11 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 12 - "roles/page.tsx"
Cohesion: 0.09
Nodes (28): allProducts, categories, formatPrice(), priceRanges, ProductCardGrid(), ProductCardList(), BalanceSheetItem, BalanceSheetPage() (+20 more)

### Community 13 - "badge.tsx"
Cohesion: 0.05
Nodes (43): btnIcon, btnIconOutline, inputStyle, labelStyle, rowStyle, selectStyle, tdStyle, thRight (+35 more)

### Community 14 - "jurnal-umum/page.tsx"
Cohesion: 0.09
Nodes (14): btnIconBlue, btnIconWhite, inputStyle, labelStyle, selectStyle, thStyle, fmt(), JournalDetailPanel() (+6 more)

### Community 15 - "coupons/page.tsx"
Cohesion: 0.09
Nodes (28): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), CardAction(), CardFooter() (+20 more)

### Community 16 - "pesanan-penjualan/page.tsx"
Cohesion: 0.09
Nodes (24): CartItem, CartPage(), formatPrice(), initialCartItems, accounts, formatIDR(), ledgerData, LedgerEntry (+16 more)

### Community 17 - "gudang/page.tsx"
Cohesion: 0.08
Nodes (15): btnIcon, btnIconWhite, inputStyle, selectStyle, thStyle, btnIcon, btnIconBlue, btnIconWhite (+7 more)

### Community 18 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 19 - "akun-perkiraan/page.tsx"
Cohesion: 0.08
Nodes (14): AkunPerkiraanPage(), btnIcon, btnIconBlue, btnIconWhite, btnPrimary, CURRENCIES, FormTab, getNextKode() (+6 more)

### Community 20 - "devDependencies"
Cohesion: 0.10
Nodes (21): eslint, eslint-config-next, @opennextjs/cloudflare, devDependencies, eslint, eslint-config-next, @opennextjs/cloudflare, tailwindcss (+13 more)

### Community 21 - "customer-returns/create/page.tsx"
Cohesion: 0.09
Nodes (12): ActivityLog, btnIconWhite, btnPrimary, DUMMY_LOGS, DUMMY_USERS, formatToday(), inputStyle, LogAktifitasJurnalPage() (+4 more)

### Community 22 - "dependencies"
Cohesion: 0.11
Nodes (19): @base-ui/react, class-variance-authority, cmdk, date-fns, lucide-react, dependencies, @base-ui/react, class-variance-authority (+11 more)

### Community 23 - "pencatatan-beban/page.tsx"
Cohesion: 0.11
Nodes (8): btnIconBlue, btnIconWhite, btnPrimary, inputStyle, labelStyle, selectStyle, thStyle, ExpenseRecord

### Community 24 - "faktur-penjualan/page.tsx"
Cohesion: 0.16
Nodes (14): CustomerTierAssignment, defaultTypeARules, defaultTypeBRules, formatNumber(), formatRupiah(), mockCustomers, mockMonthlyHistory, MonthlyResetLog (+6 more)

### Community 25 - "input.tsx"
Cohesion: 0.20
Nodes (10): react, react, CustomerReturnDetailPage(), formatIDR(), formatIDR(), SalesOrderDetailPage(), buttonVariants, Calendar() (+2 more)

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
Cohesion: 0.13
Nodes (17): aktivaLancar, aktivaTetap, formatIDR(), liabPanjang, liabPendek, modalRows, NeracaPage(), periods (+9 more)

### Community 30 - "barang-jasa/page.tsx"
Cohesion: 0.12
Nodes (11): BarangDanJasaPage(), btnIcon, btnIconBlue, btnIconWhite, btnPrimary, formatIDR(), FormTab, inputStyle (+3 more)

### Community 31 - "navbar.tsx"
Cohesion: 0.13
Nodes (13): AppLayout(), Navbar(), DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem() (+5 more)

### Community 32 - "aset-tetap/page.tsx"
Cohesion: 0.10
Nodes (19): akunAkumulasiOptions, akunAsetOptions, akunBebanOptions, akunPengeluaranOptions, AsetTetapPage(), btnIcon, btnIconOutline, formatIDR() (+11 more)

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
Cohesion: 0.11
Nodes (24): colorMap, iconMap, ModulesPage(), LanguageSwitcher(), options, iconMap, Sidebar(), breadcrumbs (+16 more)

### Community 37 - "fixed-assets/create/page.tsx"
Cohesion: 0.14
Nodes (14): akumPenyusutanOptions, akunAsetOptions, bebanPenyusutanOptions, btnOutlineStyle, btnPrimaryStyle, cardContentStyle, cardHeaderStyle, cardStyle (+6 more)

### Community 38 - "pesanan-pembelian/page.tsx"
Cohesion: 0.16
Nodes (13): btnIcon, btnIconOutline, formatIDR(), inputStyle, labelStyle, PesananPembelianPage(), rowStyle, selectStyle (+5 more)

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
Nodes (42): FilterValue, formatIDR(), Payment, payments, PaymentsPage(), statusBadge(), bankOptions, formatDate() (+34 more)

### Community 46 - "retur-penjualan/page.tsx"
Cohesion: 0.15
Nodes (13): btnIcon, btnIconOutline, formatIDR(), inputStyle, labelStyle, ReturPenjualanPage(), rowStyle, selectStyle (+5 more)

### Community 47 - "penyesuaian-persediaan/page.tsx"
Cohesion: 0.12
Nodes (11): AdjustmentItem, AdjustmentType, btnIcon, btnIconBlue, btnIconWhite, btnPrimary, inputStyle, labelStyle (+3 more)

### Community 48 - "shipping/page.tsx"
Cohesion: 0.19
Nodes (10): statusConfig, typeConfig, courierColors, DeliveryOrder, deliveryOrders, getCourierColor(), ShippingPage(), statusConfig (+2 more)

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
Cohesion: 0.17
Nodes (8): BarangStokMinimumPage(), btnIcon, btnIconAmber, btnIconWhite, btnOutline, formatIDR(), inputStyle, thStyle

### Community 59 - "transfers/create/page.tsx"
Cohesion: 0.18
Nodes (12): btnOutlineStyle, btnPrimaryStyle, cardContentStyle, cardHeaderStyle, cardStyle, cashBankAccounts, CreateTransferPage(), formatIDR() (+4 more)

### Community 60 - "estimasi-harga/page.tsx"
Cohesion: 0.04
Nodes (51): cashBankAccounts, CreateReceiptPage(), formatIDR(), generateVoucherNo(), incomeAccounts, ReceiptLine, FilterValue, formatIDR() (+43 more)

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
Cohesion: 0.20
Nodes (10): fmt(), healthColor(), MONTHS, RasioKeuanganPage(), RatioRow, RATIOS, Tab, TD (+2 more)

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
Cohesion: 0.17
Nodes (12): btnIcon, btnIconOutline, DisposisiAsetTetapPage(), formatIDR(), metodeColor, rowStyle, selectStyle, tdMono (+4 more)

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
Cohesion: 0.23
Nodes (9): checkoutItems, CheckoutPage(), formatPrice(), paymentMethods, savedAddresses, shippingMethods, Checkbox(), RadioGroup() (+1 more)

### Community 83 - "aset-tetap/[id]/page.tsx"
Cohesion: 0.22
Nodes (9): AsetTetapDetailPage(), assetData, AssetDetail, formatIDR(), labelStyle, tdMono, tdStyle, thRight (+1 more)

### Community 84 - "fixed-asset/page.tsx"
Cohesion: 0.24
Nodes (9): assets, categoryIcons, FixedAsset, FixedAssetPage(), formatIDR(), statusBadge(), totalAccumDep, totalBookValue (+1 more)

### Community 85 - "smartlink-ebanking/page.tsx"
Cohesion: 0.17
Nodes (12): defaultPO, formatCurrency(), formatIDR(), generateOrderTimeline(), initialPaymentsPO1, Payment, POData, poDataMap (+4 more)

### Community 86 - "hutang-piutang/page.tsx"
Cohesion: 0.17
Nodes (10): btnIcon, btnIconOutline, inputStyle, labelStyle, rowStyle, selectStyle, tdStyle, thStyle (+2 more)

### Community 87 - "pembelian/page.tsx"
Cohesion: 0.22
Nodes (9): AsetPerLokasiPage(), btnIconOutline, formatIDR(), locationGroups, rowStyle, tdRight, tdStyle, thStyle (+1 more)

### Community 88 - "penjualan/page.tsx"
Cohesion: 0.06
Nodes (41): formatIDR(), hutangData, HutangPiutangPage(), periods, piutangData, tdStyle, thStyle, totalHutang (+33 more)

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
Cohesion: 0.25
Nodes (7): bebanRows, formatIDR(), LabaRugiPage(), periods, sections, tdStyle, thStyle

### Community 101 - "accounting/sales/invoices/create/page.tsx"
Cohesion: 0.20
Nodes (8): btnIcon, btnIconOutline, rowStyle, selectStyle, tdMono, tdStyle, thStyle, dummyAssetTransfers

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
Cohesion: 0.40
Nodes (5): formatRupiah(), Product, products, ProductsPage(), statusConfig

### Community 111 - "kalender/page.tsx"
Cohesion: 0.29
Nodes (5): BULAN, HARI, ModalTab, reminders, ViewMode

### Community 112 - "accounting/sales/invoices/page.tsx"
Cohesion: 0.22
Nodes (7): DATA, fmtIDR(), LabaDitahanPage(), RowRetained, TD, TH, TH_RIGHT

### Community 113 - "accounting/sales/quotations/create/page.tsx"
Cohesion: 0.38
Nodes (6): CreateQuotationPage(), customers, formatIDR(), generateQuoteNumber(), products, QuoteItem

### Community 114 - "accounting/sales/quotations/page.tsx"
Cohesion: 0.22
Nodes (7): btnIcon, btnIconOutline, rowStyle, selectStyle, tdStyle, thStyle, dummyAssetChanges

### Community 115 - "ecommerce/products/page.tsx"
Cohesion: 0.28
Nodes (8): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), InputGroupText(), InputGroupTextarea()

### Community 116 - "outbond/create/page.tsx"
Cohesion: 0.29
Nodes (7): DATA, EquityRow, fmtIDR(), PerubahanEquitasPage(), TD, TH, TH_RIGHT

### Community 117 - "sales/customers/[id]/page.tsx"
Cohesion: 0.29
Nodes (4): cashFlow, expenseBreakdown, profitTrend, salesVsPurchase

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

### Community 128 - "invoices/[id]/page.tsx"
Cohesion: 0.38
Nodes (5): formatIDR(), invoiceData, InvoiceDetailPage(), statusConfig, Separator()

### Community 129 - "KPIPage"
Cohesion: 0.50
Nodes (4): getScoreBg(), getScoreColor(), getScoreLabel(), KPIPage()

### Community 135 - "ReceiptsPage"
Cohesion: 0.36
Nodes (7): cashBankOptions, formatDate(), formatIDR(), mockReceipts, ReceiptItem, ReceiptsPage(), statusBadge()

### Community 136 - "ReconciliationPage"
Cohesion: 0.40
Nodes (5): CustomerReturn, CustomerReturnsPage(), formatIDR(), returns, statusConfig

### Community 137 - "TransfersPage"
Cohesion: 0.36
Nodes (7): bankOptions, formatDate(), formatIDR(), mockTransfers, statusBadge(), Transfer, TransfersPage()

### Community 141 - "date-fns"
Cohesion: 0.40
Nodes (5): Customer, customers, CustomersPage(), formatRupiah(), statusConfig

### Community 159 - "EstimasiHargaPage"
Cohesion: 0.16
Nodes (14): LineItem, Product, products, TIER_DISCOUNT, tierColors, CustomerListPage(), formatIDR(), SortKey (+6 more)

### Community 160 - "WorkOrdersPage"
Cohesion: 0.50
Nodes (4): calculateShipping(), EstimasiHargaPage(), formatRupiah(), nextLineId()

### Community 161 - "CreatePaymentPage"
Cohesion: 0.32
Nodes (7): cashBankAccounts, CreatePaymentPage(), expenseAccounts, formatIDR(), generateVoucherNo(), PaymentLine, SelectItem()

### Community 177 - "formatIDR"
Cohesion: 0.29
Nodes (7): flowSteps, formatIDR(), orders, paymentConfig, SalesOrder, SalesOrdersPage(), statusConfig

## Knowledge Gaps
- **1240 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+1235 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `coupons/page.tsx` to `invoices/[id]/page.tsx`, `CardDescription`, `CreatePaymentPage`, `cn`, `modules/page.tsx`, `label.tsx`, `card.tsx`, `tiering/page.tsx`, `react`, `roles/page.tsx`, `purchasing/[id]/page.tsx`, `pesanan-penjualan/page.tsx`, `(dashboard)/sales/quotations/create/page.tsx`, `checkout/page.tsx`, `ecommerce/products/page.tsx`, `input.tsx`, `estimasi-harga/page.tsx`, `navbar.tsx`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Why does `react` connect `input.tsx` to `tiering/page.tsx`, `modules/page.tsx`, `dependencies`, `inventory/[id]/page.tsx`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `clsx`, `next`, `@prisma/client`, `react-day-picker`, `react-dom`, `tailwind-merge`, `zustand`, `input.tsx`, `package.json`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _1240 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `card.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.04402920962199313 - nodes in this community are weakly interconnected._
- **Should `CardDescription` be split into smaller, more focused modules?**
  _Cohesion score 0.07878787878787878 - nodes in this community are weakly interconnected._
- **Should `label.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.045655375552282766 - nodes in this community are weakly interconnected._