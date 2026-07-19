-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('ASSET', 'LIABILITY', 'EQUITY', 'INCOME', 'EXPENSE');

-- CreateEnum
CREATE TYPE "AccountSubType" AS ENUM ('BANK', 'CASH', 'RECEIVABLE', 'PAYABLE', 'FIXED_ASSET', 'ACCUMULATED_DEPRECIATION', 'CURRENT_ASSET', 'LONG_TERM_ASSET', 'CURRENT_LIABILITY', 'LONG_TERM_LIABILITY', 'EQUITY', 'REVENUE', 'COST_OF_GOODS', 'OPERATING_EXPENSE', 'OTHER_INCOME', 'OTHER_EXPENSE');

-- CreateEnum
CREATE TYPE "NormalBalance" AS ENUM ('DEBIT', 'CREDIT');

-- CreateTable
CREATE TABLE "chart_of_accounts" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(20) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "parentId" TEXT,
    "accountType" "AccountType" NOT NULL,
    "accountSubType" "AccountSubType",
    "normalBalance" "NormalBalance" NOT NULL DEFAULT 'DEBIT',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isGroup" BOOLEAN NOT NULL DEFAULT false,
    "isBankAccount" BOOLEAN NOT NULL DEFAULT false,
    "isCashAccount" BOOLEAN NOT NULL DEFAULT false,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "currencyCode" VARCHAR(3) DEFAULT 'IDR',
    "reportLine" VARCHAR(100),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chart_of_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journal_entries" (
    "id" TEXT NOT NULL,
    "entryNumber" VARCHAR(30) NOT NULL,
    "postingDate" DATE NOT NULL,
    "sourceType" VARCHAR(30) NOT NULL,
    "sourceId" TEXT,
    "sourceNumber" VARCHAR(30),
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "description" TEXT NOT NULL,
    "currencyCode" VARCHAR(3) NOT NULL DEFAULT 'IDR',
    "exchangeRate" DECIMAL(15,8) NOT NULL DEFAULT 1,
    "totalDebit" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "totalCredit" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "isBalanced" BOOLEAN NOT NULL DEFAULT true,
    "fiscalYear" VARCHAR(10) NOT NULL,
    "fiscalPeriod" SMALLINT NOT NULL,
    "created_by" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "posted_at" TIMESTAMP(3),
    "posted_by" VARCHAR(50),

    CONSTRAINT "journal_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journal_details" (
    "id" TEXT NOT NULL,
    "journal_entry_id" TEXT NOT NULL,
    "line_sequence" INTEGER NOT NULL DEFAULT 0,
    "account_id" TEXT NOT NULL,
    "debit_amount" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "credit_amount" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "debit_currency" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "credit_currency" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "partner_id" TEXT,
    "description" VARCHAR(500),
    "reconcile_id" TEXT,
    "reconciled_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "journal_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partners" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(20) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "email" VARCHAR(200),
    "phone" VARCHAR(50),
    "address" TEXT,
    "npwp" VARCHAR(30),
    "payment_term_days" INTEGER NOT NULL DEFAULT 0,
    "credit_limit" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "sku" VARCHAR(50) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL DEFAULT 'STOCK',
    "cost_price" DECIMAL(18,2) NOT NULL,
    "selling_price" DECIMAL(18,2) NOT NULL,
    "currencyCode" VARCHAR(3) NOT NULL DEFAULT 'IDR',
    "uom" VARCHAR(20) NOT NULL,
    "minimum_stock" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "maximum_stock" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "inventory_account_id" TEXT,
    "cogs_account_id" TEXT,
    "revenue_account_id" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "warehouses" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(20) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "address" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "is_main" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "warehouses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_balances" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "warehouse_id" TEXT NOT NULL,
    "quantity" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "average_cost" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "total_value" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stock_balances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales_quotations" (
    "id" TEXT NOT NULL,
    "quotation_number" VARCHAR(30) NOT NULL,
    "quotation_date" DATE NOT NULL,
    "customer_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "subtotal" DECIMAL(18,2) NOT NULL,
    "discount_percent" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "discount_amount" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "tax_amount" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "total_amount" DECIMAL(18,2) NOT NULL,
    "notes" TEXT,
    "created_by" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sales_quotations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales_quotation_items" (
    "id" TEXT NOT NULL,
    "sales_quotation_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" DECIMAL(18,4) NOT NULL,
    "unit_price" DECIMAL(18,2) NOT NULL,
    "discount_percent" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "discount_amount" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "subtotal" DECIMAL(18,2) NOT NULL,
    "total_amount" DECIMAL(18,2) NOT NULL,
    "description" VARCHAR(500),

    CONSTRAINT "sales_quotation_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales_invoices" (
    "id" TEXT NOT NULL,
    "invoice_number" VARCHAR(30) NOT NULL,
    "invoice_date" DATE NOT NULL,
    "due_date" DATE NOT NULL,
    "customer_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "payment_status" TEXT NOT NULL DEFAULT 'UNPAID',
    "subtotal" DECIMAL(18,2) NOT NULL,
    "discount_percent" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "discount_amount" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "tax_amount" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "total_amount" DECIMAL(18,2) NOT NULL,
    "paid_amount" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "remaining_amount" DECIMAL(18,2) NOT NULL,
    "ppn_rate" DECIMAL(5,2) NOT NULL DEFAULT 11,
    "ppn_amount" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "journal_entry_id" TEXT,
    "notes" TEXT,
    "created_by" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sales_invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales_invoice_items" (
    "id" TEXT NOT NULL,
    "sales_invoice_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" DECIMAL(18,4) NOT NULL,
    "unit_price" DECIMAL(18,2) NOT NULL,
    "discount_percent" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "discount_amount" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "subtotal" DECIMAL(18,2) NOT NULL,
    "total_amount" DECIMAL(18,2) NOT NULL,
    "description" VARCHAR(500),

    CONSTRAINT "sales_invoice_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_invoices" (
    "id" TEXT NOT NULL,
    "invoice_number" VARCHAR(30) NOT NULL,
    "invoice_date" DATE NOT NULL,
    "due_date" DATE NOT NULL,
    "vendor_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "payment_status" TEXT NOT NULL DEFAULT 'UNPAID',
    "subtotal" DECIMAL(18,2) NOT NULL,
    "discount_percent" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "discount_amount" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "tax_amount" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "total_amount" DECIMAL(18,2) NOT NULL,
    "paid_amount" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "remaining_amount" DECIMAL(18,2) NOT NULL,
    "journal_entry_id" TEXT,
    "notes" TEXT,
    "created_by" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "purchase_invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_invoice_items" (
    "id" TEXT NOT NULL,
    "purchase_invoice_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" DECIMAL(18,4) NOT NULL,
    "unit_price" DECIMAL(18,2) NOT NULL,
    "discount_percent" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "discount_amount" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "subtotal" DECIMAL(18,2) NOT NULL,
    "total_amount" DECIMAL(18,2) NOT NULL,
    "description" VARCHAR(500),

    CONSTRAINT "purchase_invoice_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_orders" (
    "id" TEXT NOT NULL,
    "order_number" VARCHAR(30) NOT NULL,
    "order_date" DATE NOT NULL,
    "customer_id" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "target_product" VARCHAR(200),
    "target_quantity" DECIMAL(18,4),
    "notes" TEXT,
    "journal_entry_id" TEXT,
    "created_by" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "work_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_order_items" (
    "id" TEXT NOT NULL,
    "work_order_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" DECIMAL(18,4) NOT NULL,
    "unit" VARCHAR(20) NOT NULL,
    "description" VARCHAR(500),

    CONSTRAINT "work_order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_completions" (
    "id" TEXT NOT NULL,
    "completion_number" VARCHAR(30) NOT NULL,
    "completion_date" DATE NOT NULL,
    "work_order_id" TEXT NOT NULL,
    "roll_over_type" TEXT NOT NULL DEFAULT 'BARANG',
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "portion" DECIMAL(5,2) NOT NULL DEFAULT 100,
    "notes" TEXT,
    "journal_entry_id" TEXT,
    "created_by" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "work_completions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_completion_items" (
    "id" TEXT NOT NULL,
    "work_completion_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" DECIMAL(18,4) NOT NULL,
    "unit" VARCHAR(20) NOT NULL,
    "allocation_amount" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "description" VARCHAR(500),

    CONSTRAINT "work_completion_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_adjustments" (
    "id" TEXT NOT NULL,
    "adjustment_number" VARCHAR(30) NOT NULL,
    "adjustment_date" DATE NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "notes" TEXT,
    "journal_entry_id" TEXT,
    "created_by" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stock_adjustments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_adjustment_items" (
    "id" TEXT NOT NULL,
    "stock_adjustment_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "adjustment_type" TEXT NOT NULL,
    "quantity" DECIMAL(18,4) NOT NULL,
    "unit" VARCHAR(20) NOT NULL,
    "unit_cost" DECIMAL(18,2) NOT NULL,
    "total_cost" DECIMAL(18,2) NOT NULL,
    "description" VARCHAR(500),

    CONSTRAINT "stock_adjustment_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "payment_number" VARCHAR(30) NOT NULL,
    "payment_date" DATE NOT NULL,
    "bank_account_id" TEXT NOT NULL,
    "vendor_id" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "amount" DECIMAL(18,2) NOT NULL,
    "check_number" VARCHAR(50),
    "description" VARCHAR(500),
    "journal_entry_id" TEXT,
    "created_by" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "receipts" (
    "id" TEXT NOT NULL,
    "receipt_number" VARCHAR(30) NOT NULL,
    "receipt_date" DATE NOT NULL,
    "bank_account_id" TEXT NOT NULL,
    "customer_id" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "amount" DECIMAL(18,2) NOT NULL,
    "description" VARCHAR(500),
    "journal_entry_id" TEXT,
    "created_by" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "receipts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bank_transfers" (
    "id" TEXT NOT NULL,
    "transfer_number" VARCHAR(30) NOT NULL,
    "transfer_date" DATE NOT NULL,
    "from_account_id" TEXT NOT NULL,
    "to_account_id" TEXT NOT NULL,
    "amount" DECIMAL(18,2) NOT NULL,
    "description" VARCHAR(500),
    "journal_entry_id" TEXT,
    "created_by" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bank_transfers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bank_reconciliations" (
    "id" TEXT NOT NULL,
    "reconciliation_number" VARCHAR(30) NOT NULL,
    "reconciliation_date" DATE NOT NULL,
    "bank_account_id" TEXT NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "book_balance" DECIMAL(18,2) NOT NULL,
    "bank_balance" DECIMAL(18,2) NOT NULL,
    "reconciled_book_balance" DECIMAL(18,2) NOT NULL,
    "reconciled_bank_balance" DECIMAL(18,2) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "created_by" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bank_reconciliations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fixed_assets" (
    "id" TEXT NOT NULL,
    "asset_number" VARCHAR(30) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "purchase_date" DATE NOT NULL,
    "use_date" DATE NOT NULL,
    "purchase_price" DECIMAL(18,2) NOT NULL,
    "residual_value" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "useful_life_years" SMALLINT NOT NULL,
    "useful_life_months" SMALLINT NOT NULL DEFAULT 0,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "depreciation_method" TEXT NOT NULL DEFAULT 'STRAIGHT_LINE',
    "depreciation_rate" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "is_intangible" BOOLEAN NOT NULL DEFAULT false,
    "asset_account_id" TEXT NOT NULL,
    "accumulated_depr_account_id" TEXT NOT NULL,
    "expense_account_id" TEXT NOT NULL,
    "current_book_value" DECIMAL(18,2) NOT NULL,
    "accumulated_depreciation" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "journal_entry_id" TEXT,
    "created_by" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fixed_assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asset_depreciations" (
    "id" TEXT NOT NULL,
    "fixed_asset_id" TEXT NOT NULL,
    "period_year" SMALLINT NOT NULL,
    "period_month" SMALLINT NOT NULL,
    "depreciation_amount" DECIMAL(18,2) NOT NULL,
    "accumulated_depreciation" DECIMAL(18,2) NOT NULL,
    "book_value" DECIMAL(18,2) NOT NULL,
    "is_posted" BOOLEAN NOT NULL DEFAULT false,
    "journal_entry_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "asset_depreciations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sequences" (
    "id" TEXT NOT NULL,
    "sequence_name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(200),
    "prefix" VARCHAR(20) NOT NULL,
    "format_pattern" VARCHAR(100) NOT NULL,
    "current_number" BIGINT NOT NULL DEFAULT 0,
    "increment_by" INTEGER NOT NULL DEFAULT 1,
    "min_length" INTEGER NOT NULL DEFAULT 1,
    "reset_period" TEXT NOT NULL DEFAULT 'NEVER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sequences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fiscal_periods" (
    "id" TEXT NOT NULL,
    "year" SMALLINT NOT NULL,
    "month" SMALLINT NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "is_closed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fiscal_periods_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "chart_of_accounts_code_key" ON "chart_of_accounts"("code");

-- CreateIndex
CREATE INDEX "chart_of_accounts_code_idx" ON "chart_of_accounts"("code");

-- CreateIndex
CREATE INDEX "chart_of_accounts_accountType_idx" ON "chart_of_accounts"("accountType");

-- CreateIndex
CREATE INDEX "chart_of_accounts_parentId_idx" ON "chart_of_accounts"("parentId");

-- CreateIndex
CREATE UNIQUE INDEX "journal_entries_entryNumber_key" ON "journal_entries"("entryNumber");

-- CreateIndex
CREATE INDEX "journal_entries_postingDate_idx" ON "journal_entries"("postingDate");

-- CreateIndex
CREATE INDEX "journal_entries_status_idx" ON "journal_entries"("status");

-- CreateIndex
CREATE INDEX "journal_entries_sourceType_sourceId_idx" ON "journal_entries"("sourceType", "sourceId");

-- CreateIndex
CREATE INDEX "journal_entries_fiscalYear_fiscalPeriod_idx" ON "journal_entries"("fiscalYear", "fiscalPeriod");

-- CreateIndex
CREATE INDEX "journal_details_journal_entry_id_idx" ON "journal_details"("journal_entry_id");

-- CreateIndex
CREATE INDEX "journal_details_account_id_idx" ON "journal_details"("account_id");

-- CreateIndex
CREATE INDEX "journal_details_partner_id_idx" ON "journal_details"("partner_id");

-- CreateIndex
CREATE INDEX "journal_details_reconcile_id_idx" ON "journal_details"("reconcile_id");

-- CreateIndex
CREATE UNIQUE INDEX "partners_code_key" ON "partners"("code");

-- CreateIndex
CREATE UNIQUE INDEX "products_sku_key" ON "products"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "warehouses_code_key" ON "warehouses"("code");

-- CreateIndex
CREATE UNIQUE INDEX "stock_balances_product_id_warehouse_id_key" ON "stock_balances"("product_id", "warehouse_id");

-- CreateIndex
CREATE UNIQUE INDEX "sales_quotations_quotation_number_key" ON "sales_quotations"("quotation_number");

-- CreateIndex
CREATE INDEX "sales_quotations_customer_id_idx" ON "sales_quotations"("customer_id");

-- CreateIndex
CREATE INDEX "sales_quotations_quotation_date_idx" ON "sales_quotations"("quotation_date");

-- CreateIndex
CREATE INDEX "sales_quotation_items_sales_quotation_id_idx" ON "sales_quotation_items"("sales_quotation_id");

-- CreateIndex
CREATE UNIQUE INDEX "sales_invoices_invoice_number_key" ON "sales_invoices"("invoice_number");

-- CreateIndex
CREATE INDEX "sales_invoices_customer_id_idx" ON "sales_invoices"("customer_id");

-- CreateIndex
CREATE INDEX "sales_invoices_invoice_date_idx" ON "sales_invoices"("invoice_date");

-- CreateIndex
CREATE INDEX "sales_invoice_items_sales_invoice_id_idx" ON "sales_invoice_items"("sales_invoice_id");

-- CreateIndex
CREATE UNIQUE INDEX "purchase_invoices_invoice_number_key" ON "purchase_invoices"("invoice_number");

-- CreateIndex
CREATE INDEX "purchase_invoices_vendor_id_idx" ON "purchase_invoices"("vendor_id");

-- CreateIndex
CREATE INDEX "purchase_invoices_invoice_date_idx" ON "purchase_invoices"("invoice_date");

-- CreateIndex
CREATE INDEX "purchase_invoice_items_purchase_invoice_id_idx" ON "purchase_invoice_items"("purchase_invoice_id");

-- CreateIndex
CREATE UNIQUE INDEX "work_orders_order_number_key" ON "work_orders"("order_number");

-- CreateIndex
CREATE INDEX "work_order_items_work_order_id_idx" ON "work_order_items"("work_order_id");

-- CreateIndex
CREATE UNIQUE INDEX "work_completions_completion_number_key" ON "work_completions"("completion_number");

-- CreateIndex
CREATE INDEX "work_completion_items_work_completion_id_idx" ON "work_completion_items"("work_completion_id");

-- CreateIndex
CREATE UNIQUE INDEX "stock_adjustments_adjustment_number_key" ON "stock_adjustments"("adjustment_number");

-- CreateIndex
CREATE INDEX "stock_adjustment_items_stock_adjustment_id_idx" ON "stock_adjustment_items"("stock_adjustment_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_payment_number_key" ON "payments"("payment_number");

-- CreateIndex
CREATE UNIQUE INDEX "receipts_receipt_number_key" ON "receipts"("receipt_number");

-- CreateIndex
CREATE UNIQUE INDEX "bank_transfers_transfer_number_key" ON "bank_transfers"("transfer_number");

-- CreateIndex
CREATE UNIQUE INDEX "bank_reconciliations_reconciliation_number_key" ON "bank_reconciliations"("reconciliation_number");

-- CreateIndex
CREATE UNIQUE INDEX "fixed_assets_asset_number_key" ON "fixed_assets"("asset_number");

-- CreateIndex
CREATE UNIQUE INDEX "asset_depreciations_fixed_asset_id_period_year_period_month_key" ON "asset_depreciations"("fixed_asset_id", "period_year", "period_month");

-- CreateIndex
CREATE UNIQUE INDEX "sequences_sequence_name_key" ON "sequences"("sequence_name");

-- CreateIndex
CREATE UNIQUE INDEX "fiscal_periods_year_month_key" ON "fiscal_periods"("year", "month");

-- AddForeignKey
ALTER TABLE "chart_of_accounts" ADD CONSTRAINT "chart_of_accounts_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "chart_of_accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journal_details" ADD CONSTRAINT "journal_details_journal_entry_id_fkey" FOREIGN KEY ("journal_entry_id") REFERENCES "journal_entries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
