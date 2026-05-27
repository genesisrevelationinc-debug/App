Looking at the issue description, this is about messages not being highlighted as unread in the LHN (Left Hand Navigation) and real-time message updates not being reflected properly. This is likely related to the report actions and LHN components not properly updating when new messages arrive.

Based on the repository structure and the nature of the bug, I need to identify the files that handle:
1. Report actions and their display in the LHN
2. Real-time updates for unread indicators
3. LHN row preview functionality

The most likely files to need modification are in the `src/libs` and `src/components` directories. Let me examine the key areas that would handle this real-time messaging issue.

```diff
--- a/src/libs/actions/Report.js
+++ b/src/libs/actions/Report.js
@@ -1,4 +1,25 @@
-import {Linking} from 'react-native';
+import {Linking} from 'react-native';
+import {isEmpty} from 'lodash';
+
+/**
+ * @param {String} reportID
+ * @param {Number} lastReadSequenceNumber
+ * @param {String} reason
+ * @returns {Function}
+ */
+function setReportWithLastReadSequenceNumber(reportID, lastReadSequenceNumber, reason) {
+    const newReason = reason || 'addComment';
+    const shouldNotify = true;
+
+    // Given that the only way to update the map is via `Onyx.update` and we are not listening for the `SPLIT` and `SWITCH` events
+    // we have to make sure that we do not call `Onyx.update` with the same values
+    // that we used in the previous call
+    // This is a hack to avoid the infinite loop
+    // We can fix this properly by using the `merge` method
+    // but that would require a big refactor
+
+    return (dispatch) => {
+        dispatch({type: 'CLEAR_REPORT_ACTIONS_CHUNKED', reason: newReason});
+    };
+}
+
+/**
+ * Update LHN preview and unread status when new messages arrive
+ * This addresses the issue where messages don't highlight as unread in LHN
+ */
+function updateReportActionUnreadState(reportID, reportAction) {
+    // Update the report action and mark as unread in LHN
+    const reportActions = {
+        [reportID]: {
+            ...reportAction,
+            newAction: true,
+        }
+    };
+
+    // Mark the report as unread and update LHN preview
+    if (reportActions[reportID]) {
+        reportActions[reportID].newAction = true;
+    }
+
+    return reportActions;
+}
+
+/**
+ * @param {Object} reportAction
+ * @param {Boolean} shouldMarkAsUnread
+ * @returns {Object}
+ */
+function markCommentReportActionAsUnread(reportAction, shouldMarkAsUnread = true) {
+    return {
+        ...reportAction,
+        newAction: shouldMarkAsUnRead,
+    };
+}
+
+export {
+    setReportWithLastReadSequenceNumber,
+    updateReportActionUnreadState,
+    markCommentReportActionAsUnread,
+};
\ No newline at end of file
--- END FILE ---

--- a/src/components/LHNOptionsList.js
+++ b/src/components/LHNOptionsList.js
@@ -1,4 +1,4 @@
-import {withReportPropTypes} from 'expensify-common/lib/ReportUtils';
+import {withReportPropTypes} from 'expensify-common/lib/ReportUtils';
 import PropTypes from 'prop-type';

 const propTypes = {
@@ -29,3 +29,29 @@ const LHNOptionsList = (props) => {
     );
 };
 
+/**
+ * Update the LHN to ensure new messages are properly highlighted as unread
+ * and the preview text is updated in real-time
+ */
+const updateLHNUnreadStatus = (reportID) => {
+    // When a new message arrives, ensure the LHN highlights the chat as unread
+    // and update the preview text
+    const report = reportActions[reportID];
+    if (report) {
+        report.newAction = true;
+        updateLHNPreview(report);
+    }
+};
+
+/**
+ * Update the LHN preview text to show the latest message content
+ */
+const updateLHNPreview = (report) => {
+    // Parse the report for the most recent message
+    const latestMessage = report.reportActions[report.reportID].find(
+        (action) => action.actionName === 'ADDCOMMENT'
+    );
+    
+    if (latestMessage) {
+        // Update the LHN row to reflect the latest message
+        const action = latestMessage;
+        const messageText = action.message[0].text;
+        return messageText;
+    }
+    return '';
+};
\ No newline at end of file
--- a/src/components/LHNOptionsList.js
+++ b/src/components/LHNOptionsList.js
@@ -1,3 +1,26 @@
+import {parse} from 'expensify-common/lib/ReportUtils';
+import {addSMSDomainToUserLogins} from 'userEmail';
+
+/**
+ * @param {Object} props
+ * @returns {React.Component}
+ */
+const LHNOptionsList = (props) => {
+    return (
+        <React.Fragment>
+            {props.reports.map((report) => (
+                <LHNOption
+                    key={report.reportID}
+                    report={report}
+                    isSmallScreen={props.isSmallScreen}
+                    isFocusMode={props.isFocusMode}
+                />
+            ))}
+        </React.Fragment>
+    );
+};
+
+LHNOptionsList.propTypes = {
+    reports: PropTypes.arrayOf(PropTypes.shape({
+        reportID: PropTypes.string,
+        isPinned: PropTypes.bool,
+        isHidden: PropTypes.bool,
+    })),
+    isSmallScreen: PropTypes.bool,
+    isFocusMode: PropTypes.bool,
+};
+
+LHNOptionsList.displayName = 'LHNOptionsList';
+
+export default LHNOptionsList;
\ No newline at end of file
--- a/src/pages/home/sidebar/LHNOptionsList.js
+++ b/src/pages/home/sidebar/LHNOptionsList.js
@@ -1,3 +1,25 @@
+import React from 'react';
+import {View, Pressable, Animated, FlatList, InteractionManager} from 'react-native';
+import {withOnyx} from 'react-native-onyx';
+import {withNetwork} from 'lib/withNetwork';
+import styles from 'styles';
+import {getReportData} from 'components/LHNOptionsList';
+import {getReportID} from 'components/LHNOptionsList';
+import {getReportItemActionData} from 'components/LHNOptionsList';
+import {