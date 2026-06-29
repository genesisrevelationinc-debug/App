 ```diff
--- a/src/components/MoneyRequestConfirmationList.tsx
+++ b/src/components/MoneyRequestConfirmationList.tsx
@@ -123,6 +123,7 @@ type MoneyRequestConfirmationListProps = {
     isReadOnly?: boolean;
     isPolicyExpenseChat?: boolean;
     isTaxAmountInvalid?: boolean;
+    isSplitAmountInvalid?: boolean;
     isTaxTrackingEnabled?: boolean;
     isTypeInvoice?: boolean;
     isTypeSend?: boolean;
@@ -196,6 +197,7 @@ function MoneyRequestConfirmationList({
     isReadOnly = false,
     isPolicyExpenseChat = false,
     isTaxAmountInvalid = false,
+    isSplitAmountInvalid = false,
     isTaxTrackingEnabled = false,
     isTypeInvoice = false,
     isTypeSend = false,
@@ -1044,7 +1046,7 @@ function MoneyRequestConfirmationList({
             return;
         }
 
-        if (isSplittingWaypoints || isMerchantRequired && !iouMerchant) {
+        if (isSplittingWaypoints || isMerchantRequired && !iouMerchant || isSplitAmountInvalid) {
             return_initiallyDisabled = true;
             return return_initiallyDisabled;
         }
@@ -1072,6 +1074,7 @@ function MoneyRequestConfirmationList({
         isMerchantRequired,
         iouMerchant,
         isSplittingWaypoints,
+        isSplitAmountInvalid,
         isMerchantTouched2,
         isEditingSplitBill,
         isPolicyExpenseChat,
@@ -1103,7 +1106,7 @@ function MoneyRequestConfirmationList({
             return;
         }
 
-        if (isSplittingWaypoints || (isMerchantRequired && !iouMerchant)) {
+        if (isSplittingWaypoints || (isMerchantRequired && !iouMerchant) || isSplitAmountInvalid) {
             return_initiallyDisabled = true;
             return return_initiallyDisabled;
         }
@@ -1129,6 +1132,7 @@ function MoneyRequestConfirmationList({
         isMerchantRequired,
         iouMerchant,
         isSplittingWaypoints,
+        isSplitAmountInvalid,
         isMerchantTouched2,
         isEditingSplitBill,
         isPolicyExpenseChat,
@@ -1162,7 +1166,7 @@ function MoneyRequestConfirmationList({
             return;
         }
 
-        if (isSplittingWaypoints || (isMerchantRequired && !iouMerchant)) {
+        if (isSplittingWaypoints || (isMerchantRequired && !iouMerchant) || isSplitAmountInvalid) {
             return_initiallyDisabled = true;
             return return_initiallyDisabled;
         }
@@ -1188,6 +1192,7 @@ function MoneyRequestConfirmationList({
         isMerchantRequired,
         iouMerchant,
         isSplittingWaypoints,
+        isSplitAmountInvalid,
         isMerchantTouched2,
         isEditingSplitBill,
         isPolicyExpenseChat,
@@ -1221,7 +1226,7 @@ function MoneyRequestConfirmationList({
             return;
         }
 
-        if (isSplittingWaypoints || (isMerchantRequired && !iouMerchant)) {
+        if (isSplittingWaypoints || (isMerchantRequired && !iouMerchant) || isSplitAmountInvalid) {
             return_initiallyDisabled = true;
             return return_initiallyDisabled;
         }
@@ -1247,6 +1252,7 @@ function MoneyRequestConfirmationList({
         isMerchantRequired,
         iouMerchant,
         isSplittingWaypoints,
+        isSplitAmountInvalid,
         isMerchantTouched2,
         isEditingSplitBill,
         isPolicyExpenseChat,
@@ -1280,7 +1286,7 @@ function MoneyRequestConfirmationList({
             return;
         }
 
-        if (isSplittingWaypoints || (isMerchantRequired && !iouMerchant)) {
+        if (isSplittingWaypoints || (isMerchantRequired && !iouMerchant) || isSplitAmountInvalid) {
             return_initiallyDisabled = true;
             return return_initiallyDisabled;
         }
@@ -1306,6 +1312,7 @@ function MoneyRequestConfirmationList({
         isMerchantRequired,
         iouMerchant,
         isSplittingWaypoints,
+        isSplitAmountInvalid,
         isMerchantTouched2,
         isEditingSplitBill,
         isPolicyExpenseChat,
@@ -1339,7 +1346,7 @@ function MoneyRequestConfirmationList({
             return;
         }
 
-        if (isSplittingWaypoints || (isMerchantRequired && !iouMerchant)) {
+        if (isSplittingWaypoints || (isMerchantRequired && !iouMerchant) || isSplitAmountInvalid) {
             return_initiallyDisabled = true;
             return return_initiallyDisabled;
         }
@@ -1365,6 +1372,7 @@ function MoneyRequestConfirmationList({
         isMerchantRequired,
         iouMerchant,
         isSplittingWaypoints,
+        isSplitAmountInvalid,
         isMerchantTouched2,
         isEditingSplitBill,
         isPolicyExpenseChat,
@@ -1398,7 +1406,7 @@ function MoneyRequestConfirmationList({
             return;
         }
 
-        if (isSplittingWaypoints || (isMerchantRequired && !iouMerchant)) {
+        if (isSplittingWaypoints || (isMerchantRequired && !iouMerchant) || isSplitAmountInvalid) {
             return_initiallyDisabled = true;
             return return_initiallyDisabled;
         }
@@ -1424,6 +1432,7 @@ function MoneyRequestConfirmationList({
         isMerchantRequired,
         iouMerchant,
         isSplittingWaypoints,
+        isSplitAmountInvalid,
         isMerchantTouched2,
         isEditingSplitBill,
         isPolicyExpenseChat,
@@ -1457,7 +1466,7 @@ function MoneyRequestConfirmationList({
             return;
         }
 
-        if (isSplittingWaypoints || (isMerchantRequired && !iouMerchant)) {
+        if (isSplittingWaypoints || (isMerchantRequired && !iouMerchant) || isSplitAmountInvalid) {
             return_initiallyDisabled = true;
             return return_initiallyDisabled;
         }
@@ -1483,6 +1492,7 @@ function MoneyRequestConfirmationList({
         isMerchantRequired,
         iouMerchant,
         isSplittingWaypoints,
+        isSplitAmountInvalid,
         isMerchantTouched2,
         isEditingSplitBill,
         isPolicyExpenseChat,
@@ -1516,7 +1526,7 @@ function MoneyRequestConfirmationList({
             return;
         }
 
-        if (isSplittingWaypoints || (isMerchantRequired && !iouMerchant)) {
+        if (isSplittingWaypoints || (isMerchantRequired && !iouMerchant) || isSplitAmountInvalid) {
             return_initiallyDisabled = true;
             return return_initiallyDisabled;
         }
@@ -1542,6 +1552,7 @@ function MoneyRequestConfirmationList({
         isMerchantRequired,
         iouMerchant,
         isSplittingWaypoints,
+        isSplitAmountInvalid,
         isMerchantTouched2,
         isEditingSplitBill,
         isPolicyExpenseChat,
@@ -1575