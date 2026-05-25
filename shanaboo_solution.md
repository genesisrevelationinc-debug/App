Looking at this issue, I need to understand what's happening:

1. There's a "ghost/orphaned" expense that appears in PDF exports and report payloads but can't be opened in the UI
2. This causes QBO (QuickBooks Online) export to fail with error ONL118
3. The expense exists in the report data but can't be accessed

The issue seems to be related to how expenses are filtered/displayed in the UI versus how they're included in exports. The "Hmm... it's not here" error suggests the expense exists in the report's transaction list but the individual expense details aren't available or properly linked.

Let me analyze the repository structure. This is the Expensify App (New Expensify), a React Native/React web application. The issue is about:
- Report expense display
- PDF export showing different data than live UI
- QBO export failing

I need to find where:
1. Expenses are filtered for display in reports
2. Expenses are collected for PDF export
3. QBO export is handled

Given the repository structure, the relevant code would likely be in `src/` directory. Let me infer the most likely files based on common patterns in this codebase:

- Report-related logic: likely in `src/libs/` or `src/pages/`
- Export functionality: likely in `src/libs/` 
- QBO integration: likely in `src/libs/`

Looking at the error pattern "ONL118" - this is likely a backend error code, but the frontend might be sending invalid data.

The core issue seems to be that the UI filters out certain expenses (perhaps deleted/archived ones) but the export functionality doesn't apply the same filters. This creates a mismatch.

Let me think about where expense filtering would happen. In Expensify's codebase, there's typically:
- `src/libs/ReportUtils.ts` or similar for report utilities
- `src/libs/TransactionUtils.ts` or similar for transaction utilities

Given the issue mentions the expense is "(untagged)" and appears in PDF but not live UI, I suspect there's a filtering difference. The most common cause would be that the live UI filters out expenses that have been deleted or have certain status, but the export doesn't.

Let me look for where report transactions are retrieved and where PDF/QBO export gets its data.

Based on the Expensify App architecture and common patterns, I'll infer the most likely location for this fix. The issue is about expenses appearing in export but not in UI - this suggests a filtering inconsistency.

The most likely files would be:
- `src/libs/ReportUtils.ts` - utility functions for reports
- `src/libs/TransactionUtils.ts` - utility functions for transactions

Since I need to produce a complete diff and the issue is about ghost/orphaned expenses that can't be opened, I should look for where transactions are filtered. In many Expensify code patterns, there's a function that gets report transactions and filters out certain types.

Let me think about what would cause an expense to:
1. Show in PDF export
2. Not show in live UI
3. Not be openable (404 "not here")

This pattern suggests the expense might be in a "pending delete" state or the transaction thread/report has been deleted but the transaction still references it. Or it could be a transaction that was created but the associated expense report was never properly formed.

Given the QBO export fails with ONL118, this is likely a backend validation error when trying to export an invalid/expense state.

The fix should ensure consistency between what's shown in the UI and what's included in exports. If the UI filters something out, the export should too.

Let me search for likely file locations. In the Expensify codebase, I would expect:

For getting report actions/transactions for display:
- `src/libs/ReportActionsUtils.ts` or similar

For getting transactions for export:
- Could be in the same place or separate export utilities

Given I need to infer the structure, let me think about the most common pattern. The issue says "Live report UI" vs "PDF export" - these should use the same data source but apparently don't.

I'll look for where the report's transaction list is built. In New Expensify, this is often in `src/libs/ReportUtils.ts` with functions like `getReportTransactions` or similar.

Actually, let me reconsider. The issue mentions "Spend → Expenses" and trying to open the expense gives "Hmm... it's not here". This suggests the expense ID exists in the report but the expense itself (as a standalone report/thread) doesn't exist or is inaccessible.

In New Expensify's architecture, each expense is actually a "money request report" or similar. If the parent report references an expense report ID that doesn't exist or is corrupted, you'd get this ghost behavior.

The fix likely needs to be in how we validate/filter transactions when building the report view and when exporting.

Let me think about where QBO export is triggered. This would likely be in an action or API call where the report data is sent to the backend for export.

Given the constraints, I'll make an educated guess about the file structure. In New Expensify:

1. `src/libs/ReportUtils.ts` - likely has `getReportTransactions` or similar
2. `src/libs/TransactionUtils.ts` - transaction-specific utilities
3. Export-related code might be in `src/libs/actions/` or similar

For the actual fix, the most likely scenario is:
- There's a function that gets transactions for a report for display purposes, which filters out certain transactions
- There's a separate path for export that doesn't apply the same filters
- OR the transaction data itself is corrupted/missing required fields

Given the "(untagged)" mention and QBO export failing, I suspect the issue is that transactions need to have certain fields populated for QBO export, and ghost expenses are missing these.

Let me think about what specific code change would help. Without seeing the actual files, I need to infer the most likely fix.

One common pattern in Expensify is that expenses have a `transactionID` and the actual transaction data is stored separately. If the transaction data is missing but the ID is still in the report, you'd get this ghost behavior.

The fix would likely involve:
1. Adding validation when retrieving report transactions to filter out ones with missing/corrupted data
2. Ensuring the same filtering applies to export functionality

Let me look for where this might be. I'll check for `getReportTransactions` or similar functions.

Actually, I realize I should think more carefully about what files are most likely. Let me consider:

The issue is specifically about:
- Report showing different data in UI vs PDF
- QBO export failing

This suggests the fix needs to be in:
1. Where report transactions are retrieved for the UI (to understand what's being filtered)
2. Where report transactions are retrieved for export (to apply same filtering)

OR a single source of truth that both use.

In many React apps, selectors are used. In New Expensify, they often use utility functions.

Let me think about the most likely file names based on the codebase structure. Looking at the root listing, I see `src/` directory. Common files in `src/libs/` would include:

- `ReportUtils.ts`
- `Transaction