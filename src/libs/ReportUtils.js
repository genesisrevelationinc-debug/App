    if (!accountID) {
        return '';
    }
    // Ensure the report ID is fetched or created if it doesn't exist
    if (!allReports.find(report => report.participantAccountIDs.length === 1 && report.participantAccountIDs.includes(accountID))) {
        Report.createChatReport([accountID]);
    }
    return allReports.find(report => report.participantAccountIDs.length === 1 && report.participantAccountIDs.includes(accountID))?.reportID || '';
}