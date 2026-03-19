    Onyx.merge(ONYXKEYS.COLLECTION.REPORT, {[reportID]: {stateNum: stateNum + 1}});
    Onyx.merge(ONYXKEYS.COLLECTION.REPORT_ACTIONS, {[`${reportID}:-1`]: {actionName: CONST.REPORT.ACTIONS.DELETE, actorAccountID, created}});

    // Move the workspace chat to the bottom of the LHN
    Onyx.merge(ONYXKEYS.COLLECTION.REPORT, {[reportID]: {isPinned: false}});
    Onyx.merge(ONYXKEYS.COLLECTION.REPORT, {[reportID]: {isArchivedRoom: true}});
    Onyx.merge(ONYXKEYS.COLLECTION.REPORT, {[reportID]: {reportName: `${reportName} (archived)`}});

    // Remove the workspace from the list of workspaces
    Onyx.merge(ONYXKEYS.WORKSPACES, {[workspaceID]: null});
}