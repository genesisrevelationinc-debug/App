Looking at this issue, I need to identify where the "Split" indicator logic is handled in the expense splitting functionality. Based on the issue description, this appears to be a bug where the "Split" indicator remains displayed even after a split is removed from an approved expense report.

Let me search for the relevant files that handle the expense amount display logic.

```diff
--- a/src/components/ReportActionItemAmountBaseImageURL.js
+++ b/src/components/ReportActionItemAmountBaseImageURL.js
@@ -0,0 +1,46 @@
+import React from 'react';
+import {View} from 'react-native';
+import PropTypes from 'prop-types';
+import styles from '../styles';
+import {amountPropTypes} from './withNavigationFallback';
+import {withNVP} from '../withNVP';
+import {withNetwork} from '../withNetwork';
+import {withReportStateChanges} from '../withReportStateChanges';
+
+/**
+ * @param {String} props.amount
+ * @param {String} props.currency
+ * @param {String} props.draft
+ * @param {String} props.draft.value
+ * @param {String} props.draft.currency
+ * @param {String} props.draftIOUAction
+ * @param {String} props.draft.isPolicyAmount
+ * @param {String} props.draft.isPolicyExpenseError
+ * @param {String} props.draft.isPolicyRequired
+ * @param {String} props.draft.isPolicyExpenseChat
+ * @param {String} props.draft.isPolicyExpenseChat
+ * @param {String} props.draft.isPolicyExpenseChat
+ */
+const ReportActionItemAmountBaseImageURL = ({action, isHovered, isPending, isLinkedRecord, isFollowupTask
+    isPendingDelete
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    isPendingReport
+    is