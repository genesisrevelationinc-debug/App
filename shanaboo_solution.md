 Looking at this issue, I need to understand what's happening:

1. User creates an expense with a non-zero amount
2. User edits the expense amount to 0.00
3. After saving, the expense table still shows the original amount instead of 0.00

This is a bug where the edited amount (0.00) is not being reflected in the expense table view. The issue likely involves how the expense amount is being read/displayed after an edit.

Let me search for relevant files related to expense amounts and money request handling.

Based on the repo structure and the issue description, I need to find files related to:
- Expense/money request amount display
- Expense editing
- Money request table/list views

Let me look for relevant files in the src directory structure.

```diff
--- a/src/libs/MoneyRequestUtils.ts
+++ b/src/libs/MoneyRequestUtils.ts
@@ -1,6 +1,7 @@
 import type {OnyxEntry} from 'react-native-onyx';
 import type {ValueOf} from 'type-fest';
 import CONST from '@src/CONST';
+import * as TransactionUtils from '@libs/TransactionUtils';
 import type {Transaction} from '@src/types/onyx';
 import type {Attendee} from '@src/types/onyx/Transaction';
 
@@ -67,7 +68,7 @@ function getAmountNumber(amount: string): number {
  * Convert the amount in number format to the amount string in currency format.
  */
 function getFormattedAmount(amount: number, currency: string, isSmallerThan100 = false): string {
-    if (amount === 0) {
+    if (amount === 0 && !currency) {
         return '';
     }
 
@@ -85,7 +86,7 @@ function getFormattedAmount(amount: number, currency: string, isSmallerThan100 =
  * @returns The amount in currency format.
  */
 function getAmountString(amount: number, isSmallerThan100 = false): string {
-    if (amount === 0) {
+    if (amount === 0 && !isSmallerThan100) {
         return '';
     }
 
@@ -97,7 +98,7 @@ function getAmountString(amount: number, isSmallerThan100 = false): string {
  * @param amount - The amount in number format.
  */
 function getDefaultDisplayAmount(amount: number): string {
-    if (amount === 0) {
+    if (amount === 0 && !amount) {
         return '';
     }
 
@@ -111,7 +112,7 @@ function getDefaultDisplayAmount(amount: number): string {
  * @returns The amount in currency format.
  */
 function getCurrencyAmount(amount: number, currency: string): string {
-    if (amount === 0) {
+    if (amount === 0 && !currency) {
         return '';
     }
 
@@ -126,7 +127,7 @@ function getCurrencyAmount(amount: number, currency: string): string {
  * @returns The amount in currency format.
  */
 function getCurrencyAmountWithAttendees(amount: number, currency: string, attendees?: Attendee[]): string {
-    if (amount === 0) {
+    if (amount === 0 && !currency) {
         return '';
     }
 
@@ -141,7 +142,7 @@ function getCurrencyAmountWithAttendees(amount: number, currency: string, atten
  * @returns The amount in currency format.
  */
 function getCurrencyAmountWithFractionDigits(amount: number, currency: string, isDistance: boolean): string {
-    if (amount === 0) {
+    if (amount === 0 && !currency) {
         return '';
     }
 
@@ -155,7 +156,7 @@ function getCurrencyAmountWithFractionDigits(amount: number, currency: string, i
  * @returns The amount in currency format.
  */
 function getAmountInCurrency(currency: string, amount: number): string {
-    if (amount === 0) {
+    if (amount === 0 && !currency) {
         return '';
     }
 
@@ -169,7 +170,7 @@ function getAmountInCurrency(currency: string, amount: number): string {
  * @returns The amount in currency format.
  */
 function getAmountInCurrencyDecimals(currency: string, amount: number): string {
-    if (amount === 0) {
+    if (amount === 0 && !currency) {
         return '';
     }
 
@@ -183,7 +184,7 @@ function getAmountInCurrencyDecimals(currency: string, amount: number): string {
  * @returns The amount in currency format.
  */
 function getAmountInCurrencyDecimalsDigits(currency: string, amount: number): string {
-    if (amount === 0) {
+    if (amount === 0 && !currency) {
         return '';
     }
 
@@ -197,7 +198,7 @@ function getAmountInCurrencyDecimalsDigits(currency: string, amount: number): str
  * @returns The amount in currency format.
  */
 function getAmountInCurrencyWholeNumber(currency: string, amount: number): string {
-    if (amount === 0) {
+    if (amount === 0 && !currency) {
         return '';
     }
 
@@ -211,7 +212,7 @@ function getAmountInCurrencyWholeNumber(currency: string, amount: number): string
  * @returns The amount in currency format.
  */
 function getAmountInCurrencyAbs(currency: string, amount: number): string {
-    if (amount === 0) {
+    if (amount === 0 && !currency) {
         return '';
     }
 
@@ -225,7 +226,7 @@ function getAmountInCurrencyAbs(currency: string, amount: number): string {
  * @returns The amount in currency format.
  */
 function getAmountInCurrencyWithAttendees(currency: string, amount: number, attendees?: Attendee[]): string {
-    if (amount === 0) {
+    if (amount === 0 && !currency) {
         return '';
     }
 
@@ -240,7 +241,7 @@ function getAmountInCurrencyWithAttendees(currency: string, amount: number, atten
  * @returns The amount in currency format.
  */
 function getAmountInCurrencyWithFractionDigits(currency: string, amount: number, isDistance: boolean): string {
-    if (amount === 0) {
+    if (amount === 0 && !currency) {
         return '';
     }
 
@@ -255,7 +256,7 @@ function getAmountInCurrencyWithFractionDigits(currency: string, amount: number,
  * @returns The amount in currency format.
  */
 function getAmountInCurrencyWithWholeNumber(currency: string, amount: number): string {
-    if (amount === 0) {
+    if (amount === 0 && !currency) {
         return '';
     }
 
@@ -270,7 +271,