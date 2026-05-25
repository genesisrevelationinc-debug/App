Looking at this issue, I need to find where the receipt preview is rendered for distance/map expenses and understand why the "Add additional receipt" and "Expand" buttons are missing.

Let me analyze the issue:
- Distance expenses show a map as the receipt preview
- When hovering on the receipt details, the "Add additional receipt" and "Expand" buttons should appear
- These buttons are missing for map/distance receipts

I need to find the relevant components. Based on the repo structure, this would likely be in `src/components` or similar. Let me infer the most likely file paths based on common React Native/Expensify patterns.

The issue is likely in a component that renders receipt images/previews. For distance expenses, the receipt is a map image. The component probably has a condition that hides these buttons for certain receipt types (like maps).

Let me search for relevant files. Based on the issue description and common patterns, I'll look for:
- Receipt image/thumbnail components
- Money request/transaction detail components
- Report action item components

Given the structure, likely files would be:
- `src/components/ReportActionItem/ReportActionItemImages.tsx` or similar
- `src/components/ReceiptImage.tsx` or similar
- `src/components/ReceiptPreview.tsx` or similar

Let me infer from the issue. The problem is that for distance expenses (which use a map as receipt), the hover buttons "Add additional receipt" and "Expand" are missing. This suggests there's a condition checking if the receipt is a "real" receipt image vs a generated map, and the buttons are only shown for "real" receipts.

Based on typical Expensify App patterns, I'll look for components related to receipt thumbnails and money request previews.

```diff
--- a/src/components/ReportActionItem/ReportActionItemImages.tsx
+++ b/src/components/ReportActionItem/ReportActionItemImages.tsx
@@ -1,5 +1,5 @@
 import React, {useCallback, useMemo, useState} from 'react';
-import {View} from 'react-native';
+import {Dimensions, View} from 'react-native';
 import type {OnyxEntry} from 'react-native-onyx';
 import {useOnyx} from 'react-native-onyx';
 import type {ValueOf} from 'type-fest';
@@ -9,6 +9,7 @@ import useStyleUtils from '@hooks/useStyleUtils';
 import useThemeStyles from '@hooks/useThemeStyles';
 import * as ReceiptUtils from '@libs/ReceiptUtils';
 import * as ReportUtils from '@libs/ReportUtils';
+import * as TransactionUtils from '@libs/TransactionUtils';
 import variables from '@styles/variables';
 import type {ThumbnailAndImage} from '@src/types/onyx/Transaction';
 import type Receipt from '@src/types/onyx/Transaction';
@@ -16,6 +17,7 @@ import {isEmptyObject} from '@src/types/utils/EmptyObject';
 import Icon from '@components/Icon';
 import * as Expensicons from '@components/Icon/Expensicons';
 import Image from '@components/Image';
+import PressableWithoutFocus from '@components/Pressable/PressableWithoutFocus';
 import ThumbnailImage from '@components/ThumbnailImage';
 import {ShowContextMenuContext} from '@components/ShowContextMenuContext';
 import Text from '@components/Text';
@@ -23,6 +25,7 @@ import Tooltip from '@components/Tooltip';
 import type {ThumbnailAndImageProps} from './types';
 import {useContextMenuContext} from './useContextMenuContext';
 import {useMoneyRequestReportContext} from './MoneyRequestReportContext';
+import AttachmentModal from '@components/AttachmentModal';
 
 type ReportActionItemImagesProps = {
     /** The array of images and thumbnails to be displayed */
@@ -55,6 +58,7 @@ function ReportActionItemImages({
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [isAttachmentLoading, setIsAttachmentLoading] = useState(false);
     const [isImageError, setIsImageError] = useState(false);
+    const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
     const {isSmallScreenWidth} = useWindowDimensions();
     const {isMoneyRequestReport} = useMoneyRequestReportContext();
     const {isContextMenuOpen} = useContextMenuContext();
@@ -98,6 +102,11 @@ function ReportActionItemImages({
         [numberOfShownImages, images, isThumbnail, onPress],
     );
 
+    const hasReceipt = useMemo(() => images.some((image) => image.source && !image.isEmptyReceipt), [images]);
+    const isDistanceRequest = useMemo(() => images.some((image) => image.isDistanceRequest), [images]);
+    const transactionID = useMemo(() => images.find((image) => image.transactionID)?.transactionID, [images]);
+    const [transaction] = useOnyx(transactionID ? `${ONYXKEYS.COLLECTION.TRANSACTION}${transactionID}` : undefined);
+
     const imageSource = useMemo(() => {
         if (isEmptyObject(images)) {
             return [];
@@ -120,6 +129,16 @@ function ReportActionItemImages({
         return imageSource.slice(0, numberOfShownImages);
     }, [imageSource, numberOfShownImages]);
 
+    const attachmentModalSource = useMemo(() => {
+        if (!transaction) {
+            return undefined;
+        }
+        return {
+            source: ReceiptUtils.getFullSizeReceiptImageURL(transaction),
+            isAuthTokenRequired: true,
+        };
+    }, [transaction]);
+
     if (isEmptyObject(images)) {
         return null;
     }
@@ -130,6 +149,7 @@ function ReportActionItemImages({
 
     return (
         <>
+            <AttachmentModal source={attachmentModalSource?.source} isAuthTokenRequired={attachmentModalSource?.isAuthTokenRequired} isVisible={isAttachmentModalOpen} onClose={() => setIsAttachmentModalOpen(false)} />
             <View
                 style={[
                     styles.reportActionItemImagesContainer,
@@ -152,6 +172,7 @@ function ReportActionItemImages({
                         const isLastImage = index === numberOfShownImages - 1;
                         const isOnlyImage = numberOfShownImages === 1;
                         const isEmptyReceipt = image.isEmptyReceipt;
+                        const isDistance = image.isDistanceRequest;
 
                         if (isEmptyReceipt) {
                             return (
@@ -177,6 +198,7 @@ function ReportActionItemImages({
                                     isSingleImage={isSingleImage}
                                     shouldShowEmptyReceiptStyle={isEmptyReceipt}
                                     shouldShowAddReceiptButton={isEmptyReceipt}
+                                    shouldShowExpandButton={isDistance}
                                     onPress={() => {
                                         if (isEmptyReceipt) {
                                             onAddReceiptPress?.(image.transactionID);
@@ -190,6 +212,7 @@ function ReportActionItemImages({
                                     isHovered={isHovered}
                                     isSingleImage={isSingleImage}
                                     shouldShowAddReceiptButton={isEmptyReceipt}
+                                    shouldShowExpandButton={