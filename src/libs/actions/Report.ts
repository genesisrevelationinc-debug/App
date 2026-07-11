function clearReportDraft(reportID: string) {
    const draftKey = `${ONYXKEYS.COLLECTION.REPORT_DRAFT}${reportID}`;
    Onyx.set(draftKey, '');
}

function saveReportDraft(reportID: string, draft: string) {
    const draftKey = `${ONYXKEYS.COLLECTION.REPORT_DRAFT}${reportID}`;
    Onyx.merge(draftKey, draft);
}