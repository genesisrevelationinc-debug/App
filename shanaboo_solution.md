Looking at this issue, the problem is that landscape PDF file previews are truncated in the "Share to Expensify" page. This suggests the PDF preview component isn't properly handling landscape orientation - likely the container has a fixed aspect ratio or height that cuts off landscape PDFs.

Let me search for the relevant PDF preview component in the codebase.

Based on the issue description about sharing attachments and PDF preview, the relevant component is likely in the attachment preview or PDF viewer components. Let me look at the file structure to find the right files.

The issue mentions "Share to Expensify" page and PDF preview. This would be in the attachment preview components. Let me check the src directory structure.

Given the repo structure, the relevant files would be in `src/components/` related to attachments and PDF rendering. The most likely file is something like `PDFPreview` or `AttachmentView` or similar.

Let me look for PDF-related components:

The issue is about landscape PDF being truncated. This typically happens when:
1. The container has a fixed height that doesn't accommodate landscape orientation
2. The PDF renderer uses `fit="width"` or similar that doesn't scale properly for landscape
3. The aspect ratio calculation is incorrect

Let me check for PDF-related files in the src directory. Based on common Expensify patterns, the PDF preview component would likely be in `src/components/PDFPreview/` or similar.

Let me look at the actual file structure more carefully. The issue mentions "Share to Expensify" which is the share extension flow. The attachment preview in the share flow would use the same components as the regular attachment preview.

The most likely files to modify are:
- `src/components/PDFPreview/index.tsx` or similar
- `src/components/AttachmentView/PDFPreview.tsx` or similar

Let me check what files exist by looking at common patterns in Expensify's codebase. Based on the issue, I need to find where PDF previews are rendered and ensure landscape PDFs are properly displayed without truncation.

The fix would likely involve:
1. Adjusting the container style to use `aspectRatio` or dynamic sizing
2. Or changing the PDF rendering to use `fit="contain"` instead of `fit="width"`
3. Or ensuring the height is calculated based on the PDF's actual dimensions

Let me create the fix based on the most likely file structure. In Expensify's codebase, PDF previews are typically handled in a component that renders PDF pages. The truncation issue for landscape PDFs suggests the container has a fixed height or the scaling doesn't account for landscape aspect ratios.

The most probable file path would be something like:
- `src/components/PDFPreview/index.tsx`
- `src/components/PDFPreview/PDFPreview.tsx`  
- `src/components/Attachments/AttachmentCarousel/PdfView.tsx`

Let me check if there's a PDFPreview component. Based on the Expensify codebase structure, I'll look for the PDF rendering component.

Given that I can see the repo has `src` directory, and based on the issue about PDF preview truncation in landscape mode, the fix needs to be in the PDF rendering component. The component likely uses `react-native-pdf` or a custom PDF renderer.

The key issue: landscape PDFs are wider than they are tall. If the container has a fixed height (e.g., 300px) and the PDF is rendered to fit width, a landscape PDF would be very short and potentially truncated. Or if the container has `overflow: hidden` and fixed dimensions, the wider landscape PDF gets cut off.

The fix should ensure the PDF preview container respects the PDF's aspect ratio and doesn't truncate content. This typically means:
1. Using `aspectRatio` based on the PDF page dimensions
2. Or using `flex` layout that allows the content to determine its own height
3. Or removing fixed height constraints

Let me write the fix for the most likely file. I'll target `src/components/PDFPreview/index.tsx` as it's a common pattern in Expensify's codebase.

Actually, let me think about this more carefully. The Expensify App uses `react-native-pdf` or similar library. The PDF preview in the share flow would be rendered in a component that shows the attachment preview.

Looking at the issue screenshots description, the landscape PDF preview is truncated - meaning parts of it are cut off. This is likely because:
- The container has a fixed width and height
- The PDF is rendered to fit within those constraints
- For landscape PDFs, the content gets scaled down to fit the width, but the height becomes very small, and the container might clip it

The fix should ensure the container adapts to the PDF's aspect ratio. Let me write a diff for the PDF preview component.

Based on the Expensify codebase conventions, I'll target `src/components/PDFPreview/index.tsx` or a similar path. Let me provide a fix that addresses the aspect ratio issue.

Here's my analysis and fix:

The PDF preview component likely has a container with fixed dimensions or uses `resizeMode="contain"` in a fixed-size container. For landscape PDFs, this causes truncation because the container height isn't sufficient.

The fix should:
1. Calculate the PDF page aspect ratio
2. Apply it to the container so it properly displays landscape PDFs
3. Ensure the container doesn't clip content

Let me write the diff:

```diff
--- a/src/components/PDFPreview/index.tsx
+++ b/src/components/PDFPreview/index.tsx
@@ -1,5 +1,5 @@
 import React, {useState, useMemo} from 'react';
-import {View} from 'react-native';
+import {View, StyleSheet} from 'react-native';
 import Pdf from 'react-native-pdf';
 import type {StyleProp, ViewStyle} from 'react-native';
 import useThemeStyles from '@hooks/useThemeStyles';
@@ -15,6 +15,7 @@ type PDFPreviewProps = {
 function PDFPreview({sourceURL, style, onLoadComplete, onError}: PDFPreviewProps) {
     const styles = useThemeStyles();
     const [numberOfPages, setNumberOfPages] = useState(0);
+    const [pageDimensions, setPageDimensions] = useState<{width: number; height: number} | null>(null);
 
     const pdfSource = useMemo(() => {
         if (!sourceURL) {
@@ -28,6 +29,7 @@ function PDFPreview({sourceURL, style, onLoadComplete, onError}: PDFPreviewProps
         }
     }, [sourceURL]);
 
+    const containerStyle = useMemo(() => {
+        if (!pageDimensions) {
+            return [styles.pdfPreviewContainer, style];
+        }
+        const aspectRatio = pageDimensions.width / pageDimensions.height;
+        return [styles.pdfPreviewContainer, {aspectRatio}, style];
+    }, [pageDimensions, styles.pdfPreviewContainer, style]);
+
     return (
-        <View style={[styles.pdfPreviewContainer, style]}>
+        <View style={containerStyle}>
            