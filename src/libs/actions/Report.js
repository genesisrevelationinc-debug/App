        .then((response) => {
            const reportID = response.reportID;
            Onyx.merge(ONYXKEYS.COLLECTION.REPORT, {[reportID]: response});
            // Navigate to the newly created report
            Navigation.navigate(ROUTES.REPORT_WITH_ID.getRoute(reportID));
            // Fetch the report actions to ensure the UI is updated
            ReportActions.fetchActions(reportID);
        })
        .catch((error) => {
            Log.error('Failed to create chat report', {error});