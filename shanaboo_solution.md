Looking at this issue, I need to analyze what's happening:

The problem described is about "ghost/orphaned expense blocks" that exist in reports but can't be accessed, causing QuickBooks Online exports to fail with error ONL118. The issue is that these orphaned expenses are still being included in export payloads even though they can't be viewed or edited.

Based on the repository structure and the nature of the issue, this appears to be related to data synchronization problems where expenses exist in the report data but have been deleted/removed from the system, creating inconsistent state.

The most likely files to address this issue would be in the report generation/export functionality. Looking at a typical Expensify app structure, I'd expect to find export-related code in:

--- a/src/libs/actions/Report.js
+++ b/src/libs/actions/Report.js
@@ -1,1 +1,100 @@
+/**
+ * @param {Object} report
+ * @returns {Object} Sanitized report data with orphaned expenses filtered out
+ */
+function sanitizeReportData(report) {
+    // Remove orphaned/ghost expenses that can't be accessed but still appear in export
+    const sanitizedReport = {...report};
+    
+    // Check if report has expenses array
+    if (sanitizedReport && sanitizedReport.reportList) {
+        // Filter out expenses that are orphaned (cannot be accessed)
+        if (sanitizedReport.reportList.transactions) {
+            const validTransactions = [];
+            for (const transaction of sanitizedReport.reportList.transactions) {
+                // Skip transactions that result in "Hmm... it's not here" error
+                // This helps prevent orphaned expenses from being included in QBO export
+                if (transaction.error === 'Hmm... it\'s not here') {
+                    continue;
+                }
+                validTransactions.push(transaction);
+            }
+            sanitizedReport.reportList.transactions = validTransactions;
+        }
+    }
+    
+    return sanitizedReport;
+}
+
+/**
+ * Filter out orphaned expenses from report before QBO export
+ * @param {Object} report 
+ * @param {Boolean} isForQBO
+ * @returns {Object|Array}
+ */
+function removeOrphanedExpenses(report, isForQBO = false) {
+    if (!report) {
+        return report;
+    }
+    
+    // Check for orphaned expenses and remove them
+    if (report.transactions && report.transactions.length > 0) {
+        const cleanTransactions = [];
+        for (let i = report.transactions.length - 1; i >= 0; i--) {
+            const transaction = report.transactions[i];
+            // Skip transactions that can't be accessed (ghost expenses)
+            if (transaction && transaction.merchant && transaction.merchant.includes('orphaned')) {
+                continue;
+            }
+            if (transaction && transaction.error && transaction.error === 'Hmm... it\'s not here') {
+                continue;
+            }
+            cleanTransactions.unshift(transaction);
+        }
+        if (report.transactions) {
+            report.transactions = cleanTransactions;
+        }
+    }
+    
+    return report;
+}
+
+export {removeOrphanedExpenses};
\ No newline at end of file
```