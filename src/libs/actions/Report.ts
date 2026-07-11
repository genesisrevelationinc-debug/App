/**
 * Clear the draft for a specific report
 */
function clearReportDraft(reportID: string) {
    const draftKey = `${ONYXKEYS.COLLECTION.REPORT_DRAFT}${reportID}`;
    Onyx.set(draftKey, '');
}

export {
    // ... existing exports
    clearReportDraft,
};