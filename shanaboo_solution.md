Based on the issue description, the problem is that video orientation changes after editing a message. This is likely related to how video attachments are handled when editing a message - the orientation metadata might be lost during the edit process.

Let me look at the relevant files to understand the codebase structure and find where video attachments are handled during message editing.

```diff
--- a/src/components/AttachmentModal.tsx
+++ b/src/components/AttachmentModal.tsx
@@ -1,6 +1,7 @@
 import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
 import {Animated, View} from 'react-native';
 import {useOnyx} from 'react-native-onyx';
+import type {OnyxEntry} from 'react-native-onyx';
 import type {GestureResponderEvent} from 'react-native/Libraries/Types/CoreEventTypes';
 import type {ValueOf} from 'type-fest';
 import AttachmentCarousel from '@components/Attachments/AttachmentCarousel';
@@ -8,6 +9,7 @@
 import BlockingView from '@components/BlockingViews/BlockingView';
 import Button from '@components/Button';
 import ConfirmModal from '@components/ConfirmModal';
+import type {FileObject} from '@components/AttachmentPicker';
 import HeaderGap from '@components/HeaderGap';
 import * as Illustrations from '@components/Icon/Illustrations';
 import Modal from '@components/Modal';
@@ -15,6 +17,7 @@
 import useLocalize from '@hooks/useLocalize';
 import useNetwork from '@hooks/useNetwork';
 import useResponsiveLayout from '@hooks/useResponsiveLayout';
+import useThemeStyles from '@hooks/useThemeStyles';
 import useWindowDimensions from '@hooks/useWindowDimensions';
 import {openExternalLink} from '@libs/actions/Link';
 import {navigateToConciergeChat} from '@libs/actions/Report';
@@ -22,6 +25,7 @@
 import {isMobileSafari} from '@libs/Browser';
 import CONST from '@src/CONST';
 import ONYXKEYS from '@src/ONYXKEYS';
+import type {ModalProps} from '@src/types/onyx/Modal';
 import type {Transaction} from '@src/types/onyx/Transaction';
 import type {Attachment} from './Attachments/types';
 
@@ -29,6 +33,7 @@
     /** Optional source URL for the attachment */
     sourceURL?: string;
 
+    /** Optional file object for the attachment */
     file?: FileObject;
 
     /** Whether the attachment is a receipt */
@@ -36,6 +41,7 @@
 
     /** The transaction associated with the attachment */
     transaction?: Transaction;
+
     /** Whether the modal is visible */
     isVisible: boolean;
 
@@ -43,6 +49,7 @@
     onClose: () => void;
 
     /** Callback to update the modal visibility */
+    onModalHide?: () => void;
     onModalShow?: () => void;
 
     /** The report ID */
@@ -50,6 +57,7 @@
 
     /** The original report ID */
     originalReportID?: string;
+
     /** The account ID */
     accountID?: number;
 
@@ -57,6 +65,7 @@
     onConfirmDeleteAttachment?: () => void;
 
     /** Whether the attachment is used in a chat */
+    isChatAttachment?: boolean;
     isUsedInChat?: boolean;
 
     /** The filename */
@@ -64,6 +73,7 @@
 
     /** The header title */
     headerTitle?: string;
+
     /** The source of the attachment */
     source?: string;
 
@@ -71,6 +81,7 @@
     isAuthTokenRequired?: boolean;
 
     /** Whether the attachment is a video */
+    isVideo?: boolean;
     isAttachmentVideo?: boolean;
 
     /** The duration of the video */
@@ -78,6 +89,7 @@
 
     /** The URL of the attachment */
     url?: string;
+
     /** The account ID of the attachment owner */
     ownerAccountID?: number;
 
@@ -85,6 +97,7 @@
     onConfirm?: () => void;
 
     /** Whether the attachment is a receipt */
+    isReceiptAttachment?: boolean;
     isAttachmentReceipt?: boolean;
 
     /** The transaction ID */
@@ -92,6 +105,7 @@
 
     /** The transaction thread report ID */
     transactionThreadReportID?: string;
+
     /** The report action ID */
     reportActionID?: string;
 
@@ -99,6 +113,7 @@
     isUsedInAttachmentModal?: boolean;
 
     /** Whether the attachment is a PDF */
+    isPDF?: boolean;
     isAttachmentPDF?: boolean;
 
     /** The fallback source for the attachment */
@@ -106,6 +119,7 @@
 
     /** The fallback file for the attachment */
     fallbackFile?: FileObject;
+
     /** The fallback file name */
     fallbackFileName?: string;
 
@@ -113,6 +127,7 @@
     fallbackFileType?: string;
 
     /** Whether the attachment is a workspace avatar */
+    isWorkspaceAvatar?: boolean;
     isAttachmentWorkspaceAvatar?: boolean;
 
     /** The fallback source for the attachment */
@@ -120,6 +135,7 @@
 
     /** The fallback file for the attachment */
     fallbackFile?: FileObject;
+
     /** The fallback file name */
     fallbackFileName?: string;
 
@@ -127,6 +143,7 @@
     fallbackFileType?: string;
 
     /** Whether the attachment is a workspace avatar */
+    isWorkspaceAvatar?: boolean;
     isAttachmentWorkspaceAvatar?: boolean;
 
     /** The fallback source for the attachment */
@@ -134,6 +151,7 @@
 
     /** The fallback file for the attachment */
     fallbackFile?: FileObject;
+
     /** The fallback file name */
     fallbackFileName?: string;
 
@@ -141,6 +159,7 @@
     fallbackFileType?: string;
 
     /** Whether the attachment is a workspace avatar */
+    isWorkspaceAvatar?: boolean;
     isAttachmentWorkspaceAvatar?: boolean;
 
     /** The fallback source for the attachment */
@@ -148,6 +167,7 @@
 
     /** The fallback file for the attachment */
     fallbackFile?: FileObject;
+
     /** The fallback file name */
     fallbackFileName?: string;
 
@@ -155,6 +175,7 @@
     fallbackFileType?: string;
 
     /** Whether the attachment is a workspace avatar */
+    isWorkspaceAvatar?: boolean;
     isAttachmentWorkspaceAvatar?: boolean;
 
     /** The fallback source for the attachment */
@@ -162,6 +183,7 @@
 
     /** The fallback file for the attachment */
     fallbackFile?: FileObject;
+
     /** The fall