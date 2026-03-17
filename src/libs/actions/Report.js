    Onyx.merge(ONYXKEYS.COLLECTION.REPORT + reportID, {isTestDriveCompleted: true});
    API.write('CompleteTestDrive', {reportID});

    // Auto-complete the concierge task in the Concierge chat
    const conciergeChatReport = getAllReports().find(report => report.participantAccountIDs.length === 1 && report.participantAccountIDs.includes(CONCIERGE_ACCOUNT_ID));
    if (conciergeChatReport) {
        const conciergeTaskReportActionID = conciergeChatReport.reportActionIDs.find(actionID => {
            const action = getAllReportActions(conciergeChatReport.reportID)[actionID];
            return action && action.originalMessage && action.originalMessage.type === 'ADD_CONCIERGE_TASK' && action.originalMessage.taskLink === 'test-drive';
        });
        conciergeTaskReportActionID && completeReportAction(conciergeChatReport.reportID, conciergeTaskReportActionID);
    }
}

function addComment(reportID, commentText, clientCreatedTime, reportActionID = '', fileIds = [], whisperedToAccountIDs = [], isPinned = false) {