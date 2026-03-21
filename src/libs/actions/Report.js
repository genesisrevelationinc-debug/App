    Onyx.set(`${ONYXKEYS.COLLECTION.REPORT}${reportID}`, {isLoadingInitialReportActions: true});

    API.read('GetReport', {reportID})
        .finally(() => {
            Onyx.set(`${ONYXKEYS.COLLECTION.REPORT}${reportID}`, {isLoadingInitialReportActions: false});
        })
        .then((response) => {
            if (response.jsonCode === 200) {
                Onyx.merge(`${ONYXKEYS.COLLECTION.REPORT}${reportID}`, response.report);