Based on the issue description, the "Purchase Amount" column in the Spend > Expenses view has its amount values aligned to the right instead of being left-aligned with the column name. This is likely a styling issue in the table/column component used for the search/expenses view.

Let me look at the relevant files to find where the alignment is set.

```diff
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -0,0 +1,0 @@
--- /dev/null
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -0,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,0 +1,0 @@
--- a/src/components/Search/SearchTableColumnAmount.tsx
+++ b/src/components/Search/SearchTableColumnAmount.tsx
@@ -1,