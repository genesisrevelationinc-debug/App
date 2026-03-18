    if (!reportID) {
        return;
    }
    // Ensure the report is marked as read
    markReportAsRead(reportID);
    // Fetch the report actions to ensure the UI is updated
    fetchActions(reportID);
    Navigation.navigate(ROUTES.REPORT_WITH_ID.getRoute(reportID));
}