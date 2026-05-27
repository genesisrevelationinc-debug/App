```diff
--- a/src/libs/actions/ReportActions.ts
+++ b/src/libs/actions/ReportActions.ts
@@ -1,6 +1,7 @@
 import Onyx from 'react-native-onyx';
 import * as ReportActionsUtils from '@libs/ReportActionsUtils';
 import * as ReportUtils from '@libs/ReportUtils';
+import * as Report from './Report';
 import ONYXKEYS from '@src/ONYXKEYS';
 import type {ReportAction, ReportActions} from '@src/types/onyx';
 import type {ReportActionKey} from '@src/types/onyx/ReportAction';
@@ -89,6 +90,9 @@ function clearReportActionErrors(reportID: string, reportAction: ReportAction, 
 function updateLastReadActionID(reportID: string, lastReadActionID: string | undefined) {
     const optimisticReport = {
         lastReadTime: new Date().toISOString(),
+        lastVisibleActionCreated: undefined,
+        lastVisibleActionLastModified: undefined,
+        lastMessageText: undefined,
     };
 
     Onyx.merge(`${ONYXKEYS.COLLECTION.REPORT}${reportID}`, optimisticReport);
@@ -118,6 +122,9 @@ function updateLastReadActionID(reportID: string, lastReadActionID: string | unde
 function markCommentAsUnread(reportID: string, reportActionCreated: string) {
     const optimisticReport = {
         lastReadTime: reportActionCreated,
+        lastVisibleActionCreated: undefined,
+        lastVisibleActionLastModified: undefined,
+        lastMessageText: undefined,
     };
 
     Onyx.merge(`${ONYXKEYS.COLLECTION.REPORT}${reportID}`, optimisticReport);
@@ -145,6 +152,9 @@ function markCommentAsUnread(reportID: string, reportActionCreated: string) {
 function markCommentAsRead(reportID: string) {
     const optimisticReport = {
         lastReadTime: new Date().toISOString(),
+        lastVisibleActionCreated: undefined,
+        lastVisibleActionLastModified: undefined,
+        lastMessageText: undefined,
     };
 
     Onyx.merge(`${ONYXKEYS.COLLECTION.REPORT}${reportID}`, optimisticReport);
@@ -171,6 +179,9 @@ function markCommentAsRead(reportID: string) {
 function readNewestAction(reportID: string, lastReadActionID: string | undefined) {
     const optimisticReport = {
         lastReadTime: new Date().toISOString(),
+        lastVisibleActionCreated: undefined,
+        lastVisibleActionLastModified: undefined,
+        lastMessageText: undefined,
     };
 
     Onyx.merge(`${ONYXKEYS.COLLECTION.REPORT}${reportID}`, optimisticReport);
@@ -196,6 +207,9 @@ function readNewestAction(reportID: string, lastReadActionID: string | undefined)
 function readOldestAction(reportID: string, oldestActionTime: string) {
     const optimisticReport = {
         lastReadTime: oldestActionTime,
+        lastVisibleActionCreated: undefined,
+        lastVisibleActionLastModified: undefined,
+        lastMessageText: undefined,
     };
 
     Onyx.merge(`${ONYXKEYS.COLLECTION.REPORT}${reportID}`, optimisticReport);
@@ -222,6 +236,9 @@ function readOldestAction(reportID: string, oldestActionTime: string) {
 function readNewerAction(reportID: string, newestActionTime: string) {
     const optimisticReport = {
         lastReadTime: newestActionTime,
+        lastVisibleActionCreated: undefined,
+        lastVisibleActionLastModified: undefined,
+        lastMessageText: undefined,
     };
 
     Onyx.merge(`${ONYXKEYS.COLLECTION.REPORT}${reportID}`, optimisticReport);
@@ -247,6 +264,9 @@ function readNewerAction(reportID: string, newestActionTime: string) {
 function readOlderAction(reportID: string, oldestActionTime: string) {
     const optimisticReport = {
         lastReadTime: oldestActionTime,
+        lastVisibleActionCreated: undefined,
+        lastVisibleActionLastModified: undefined,
+        lastMessageText: undefined,
     };
 
     Onyx.merge(`${ONYXKEYS.COLLECTION.REPORT}${reportID}`, optimisticReport);
@@ -272,6 +292,9 @@ function readOlderAction(reportID: string, oldestActionTime: string) {
 function readAction(reportID: string, sequenceNumber: number) {
     const optimisticReport = {
         lastReadTime: new Date().toISOString(),
+        lastVisibleActionCreated: undefined,
+        lastVisibleActionLastModified: undefined,
+        lastMessageText: undefined,
     };
 
     Onyx.merge(`${ONYXKEYS.COLLECTION.REPORT}${reportID}`, optimisticReport);
@@ -296,6 +319,9 @@ function readAction(reportID: string, sequenceNumber: number) {
 function readActionForIOUReport(reportID: string, sequenceNumber: number) {
     const optimisticReport = {
         lastReadTime: new Date().toISOString(),
+        lastVisibleActionCreated: undefined,
+        lastVisibleActionLastModified: undefined,
+        lastMessageText: undefined,
     };
 
     Onyx.merge(`${ONYXKEYS.COLLECTION.REPORT}${reportID}`, optimisticReport);
@@ -319,6 +345,9 @@ function readActionForIOUReport(reportID: string, sequenceNumber: number) {
 function readActionForMoneyRequest(reportID: string, sequenceNumber: number) {
     const optimisticReport = {
         lastReadTime: new Date().toISOString(),
+        lastVisibleActionCreated: undefined,
+        lastVisibleActionLastModified: undefined,
+        lastMessageText: undefined,
     };
 
     Onyx.merge(`${ONYXKEYS.COLLECTION.REPORT}${reportID}`, optimisticReport);
@@ -342,6 +371,9 @@ function readActionForMoneyRequest(reportID: string, sequenceNumber: number) {
 function readActionForTaskReport(reportID: string, sequenceNumber: number) {
     const optimisticReport = {
         lastReadTime: new Date().toISOString(),
+        lastVisibleActionCreated: undefined,
+        lastVisibleActionLastModified: undefined,
+        lastMessageText: undefined,
     };
 
     Onyx.merge(`${ONYXKEYS.COLLECTION.REPORT}${reportID}`, optimisticReport);
@@ -365,6 +397,9 @@ function readActionForTaskReport(reportID: string, sequenceNumber: number) {
 function readActionForInvoiceReport(reportID: string, sequenceNumber: number) {
     const optimisticReport = {
         lastReadTime: new Date().toISOString(),
+        lastVisibleActionCreated: undefined,
+        lastVisibleActionLastModified: undefined,
+        lastMessageText: undefined,
     };
 
     Onyx.merge(`${ONYXKEYS.COLLECTION.REPORT}${reportID}`, optimisticReport);
@@ -388,6 +423,9 @@ function readActionForInvoiceReport(reportID: string, sequenceNumber: number) {
 function readActionForReportPreview