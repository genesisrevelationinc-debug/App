Looking at the issue description, this is a bug where the approval modal doesn't show up when approving a held expense, and the held expense is auto-unheld. Based on the repository structure and the nature of this expense approval bug, I need to identify the relevant files that would handle expense approval logic.

Let me analyze the problem:
1. The issue is in the expense approval workflow
2. When a user holds an expense and tries to approve it, they expect to see an approval confirmation modal
3. However, the modal doesn't appear and the held expense becomes unheld automatically

This suggests the issue is in the expense approval component where the approval logic isn't properly handling held expenses.

```diff
--- a/src/libs/TransactionUtils.js
+++ b/src/libs/TransactionUtils.js
@@ -1,3 @@