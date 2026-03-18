    if (!reportID) {
        return;
    }
    // Fetch the report details to ensure the UI is updated
    API.read('GetReport', {reportID})
        .then((response) => Onyx.merge(ONYXKEYS.COLLECTION.REPORT, {[reportID]: response}));
    // Fetch the report actions to ensure the UI is updated
    ReportActions.fetchActions(reportID);
}