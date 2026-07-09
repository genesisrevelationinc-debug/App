Based on the issue description, this is about unread DMs from managed customers not surfacing in the LHN (Left Hand Navigation). The issue mentions that initial messages appear correctly but subsequent unread replies don't surface or move the chat in LHN.

Let me examine the relevant files to understand the LHN logic and find where managed customer messages might be filtered out.

```diff
--- a/src/libs/OptionsListUtils.ts
+++ b/src/libs/OptionsListUtils.ts
@@ -1,4 +1,4 @@
-import type {OnyxCollection, OnyxEntry} from 'react-native-onyx';
+import type {OnyxCollection, OnyxEntry, OnyxKey} from 'react-native-onyx';
 import Onyx from 'react-native-onyx';
 import type {ValueOf} from 'type-fest';
 import CONST from '@src/CONST';
@@ -8,6 +8,7 @@
 import type {PersonalDetails, PersonalDetailsList, Policy, PolicyCategories, PolicyMembers, PolicyTagList, PolicyTags, Report, ReportAction, ReportActions, ReportNameValuePairs, Transaction, TransactionViolation} from '@src/types/onyx';
 import type {Participant} from '@src/types/onyx/Report';
 import type {Icon} from '@src/types/onyx/OnyxCommon';
+import type {PolicyEmployeeList} from '@src/types/onyx';
 import DateUtils from './DateUtils';
 import localeCompare from './Localize/LocaleCompare';
 import * as Localize from './Localize';
@@ -18,6 +19,7 @@
 import * as ReportActionsUtils from './ReportActionsUtils';
 import * as ReportUtils from './ReportUtils';
 import * as TransactionUtils from './TransactionUtils';
+import * as PolicyUtils from './PolicyUtils';
 import * as UserUtils from './UserUtils';
 
 type Options = {
@@ -47,6 +49,7 @@
     recentReports: OnyxCollection<Report>;
     personalDetails: OnyxEntry<PersonalDetailsList>;
     preferredLocale: OnyxEntry<string>;
+    policyEmployeeLists: OnyxCollection<PolicyEmployeeList>;
     priorityMode: OnyxEntry<ValueOf<typeof CONST.PRIORITY_MODE>>;
     betas: OnyxEntry<Beta[]>;
     policies: OnyxCollection<Policy>;
@@ -72,6 +75,7 @@
     recentReports: [],
     personalDetails: {},
     preferredLocale: CONST.LOCALES.DEFAULT,
+    policyEmployeeLists: {},
     priorityMode: CONST.PRIORITY_MODE.DEFAULT,
     betas: [],
     policies: {},
@@ -96,6 +100,7 @@
     recentReports: OnyxCollection<Report>;
     personalDetails: OnyxEntry<PersonalDetailsList>;
     preferredLocale: OnyxEntry<string>;
+    policyEmployeeLists: OnyxCollection<PolicyEmployeeList>;
     priorityMode: OnyxEntry<ValueOf<typeof CONST.PRIORITY_MODE>>;
     betas: OnyxEntry<Beta[]>;
     policies: OnyxCollection<Policy>;
@@ -120,6 +125,7 @@
     recentReports: [],
     personalDetails: {},
     preferredLocale: CONST.LOCALES.DEFAULT,
+    policyEmployeeLists: {},
     priorityMode: CONST.PRIORITY_MODE.DEFAULT,
     betas: [],
     policies: {},
@@ -144,6 +150,7 @@
     recentReports: OnyxCollection<Report>;
     personalDetails: OnyxEntry<PersonalDetailsList>;
     preferredLocale: OnyxEntry<string>;
+    policyEmployeeLists: OnyxCollection<PolicyEmployeeList>;
     priorityMode: OnyxEntry<ValueOf<typeof CONST.PRIORITY_MODE>>;
     betas: OnyxEntry<Beta[]>;
     policies: OnyxCollection<Policy>;
@@ -168,6 +175,7 @@
     recentReports: [],
     personalDetails: {},
     preferredLocale: CONST.LOCALES.DEFAULT,
+    policyEmployeeLists: {},
     priorityMode: CONST.PRIORITY_MODE.DEFAULT,
     betas: [],
     policies: {},
@@ -192,6 +200,7 @@
     recentReports: OnyxCollection<Report>;
     personalDetails: OnyxEntry<PersonalDetailsList>;
     preferredLocale: OnyxEntry<string>;
+    policyEmployeeLists: OnyxCollection<PolicyEmployeeList>;
     priorityMode: OnyxEntry<ValueOf<typeof CONST.PRIORITY_MODE>>;
     betas: OnyxEntry<Beta[]>;
     policies: OnyxCollection<Policy>;
@@ -216,6 +225,7 @@
     recentReports: [],
     personalDetails: {},
     preferredLocale: CONST.LOCALES.DEFAULT,
+    policyEmployeeLists: {},
     priorityMode: CONST.PRIORITY_MODE.DEFAULT,
     betas: [],
     policies: {},
@@ -240,6 +250,7 @@
     recentReports: OnyxCollection<Report>;
     personalDetails: OnyxEntry<PersonalDetailsList>;
     preferredLocale: OnyxEntry<string>;
+    policyEmployeeLists: OnyxCollection<PolicyEmployeeList>;
     priorityMode: OnyxEntry<ValueOf<typeof CONST.PRIORITY_MODE>>;
     betas: OnyxEntry<Beta[]>;
     policies: OnyxCollection<Policy>;
@@ -264,6 +275,7 @@
     recentReports: [],
     personalDetails: {},
     preferredLocale: CONST.LOCALES.DEFAULT,
+    policyEmployeeLists: {},
     priorityMode: CONST.PRIORITY_MODE.DEFAULT,
     betas: [],
     policies: {},
@@ -288,6 +300,7 @@
     recentReports: OnyxCollection<Report>;
     personalDetails: OnyxEntry<PersonalDetailsList>;
     preferredLocale: OnyxEntry<string>;
+    policyEmployeeLists: OnyxCollection<PolicyEmployeeList>;
     priorityMode: OnyxEntry<ValueOf<typeof CONST.PRIORITY_MODE>>;
     betas: OnyxEntry<Beta[]>;
     policies: OnyxCollection<Policy>;
@@ -312,6 +325,7 @@
     recentReports: [],
     personalDetails: {},
     preferredLocale: CONST.LOCALES.DEFAULT,
+    policyEmployeeLists: {},
     priorityMode: CONST.PRIORITY_MODE.DEFAULT,
     betas: [],
     policies: {},
@@ -336,6 +350,7 @@
     recentReports: OnyxCollection<Report>;
     personalDetails: OnyxEntry<PersonalDetailsList>;
     preferredLocale: OnyxEntry<string>;
+    policyEmployeeLists: OnyxCollection<PolicyEmployeeList>;
     priorityMode: OnyxEntry<ValueOf<typeof CONST.PRIORITY_MODE>>;
     betas: OnyxEntry<Beta[]>;
     policies: OnyxCollection<Policy>;
@@ -360,6 +375,7 @@
     recentReports: [],
     personalDetails: {},
     preferredLocale: CONST.LOCALES.DEFAULT,
+    policyEmployeeLists: {},
     priorityMode: CONST.PRIORITY_MODE