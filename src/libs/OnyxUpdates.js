    if (!reportID || !actions) {
        return;
    }
    // Ensure the report actions are updated in Onyx
    Onyx.merge(ONYXKEYS.COLLECTION.REPORT_ACTIONS, {[reportID]: actions});
    // Refresh the report to ensure the UI is updated
    Report.refreshReport(reportID);
}