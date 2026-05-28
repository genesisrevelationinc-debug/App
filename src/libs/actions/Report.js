import Onyx from 'react-native-onyx';
import lodashGet from 'lodash/get';
import Str from 'expensify-common/lib/str';
import moment from 'moment';
import ONYXKEYS from '../../ONYXKEYS';
import * as Validation from '../Validation';
import * as Welcome from './Welcome';
import * as PersonalDetailsUtils from '../PersonalDetailsUtils';
import * as ReportUtils from '../ReportUtils';
import Log from '../Log';
import * as ReportActionsUtils from '../ReportActionsUtils';
import * as CollectionUtils from '../CollectionUtils';
    });
}

/**
 * Fetch chat reports by IDs to ensure Concierge messages are properly synced
 * 
 * @param {Array} reportIDs
 */
function fetchChatReportsByIDs(reportIDs) {
    const promises = [];
    _.each(reportIDs, (reportID) => {
        // Ensure we fetch the latest report data to prevent "Concierge is thinking..." from disappearing
        const reportPromise = API.GetReport({
            reportID,
        }).then((response) => {
            if (response.report) {
                Onyx.merge(`${ONYXKEYS.COLLECTION.REPORT}${reportID}`, response.report);
            }
        });
        promises.push(reportPromise);
    });
}

/**
 * Add an action item to a report
 *
 * @param {String} reportAction.message
 * @param {Object} reportAction
 */
 
function updateLastReadActionID(reportID, lastReadActionID) {
    Onyx.merge(`${ONYXKEYS.COLLECTION.REPORT}${reportID}`, {
        lastReadActionID,
    });
}

/**
 * Ensure Concierge chat history is properly maintained when messages are sent via search
 *
 * @param {String} reportID
 * @param {Boolean} shouldMarkAsRead
 */
function showConciergeHistory(reportID, shouldMarkAsRead = true) {
    if (!reportID) {
        return;
    }
    
    // Force refresh the report to ensure "Concierge is thinking..." state is maintained
    fetchChatReportsByIDs([reportID]);
}

/**
 * Updates the last read action ID and updates the optimistic report ID
 *
 * @param {String} reportID
 * @param {String} lastReadTime
 */
 
function subscribeToReportTypingEvents(reportID) {
    if (!reportID) {
        return;
    subscribeToReportChannel(reportID);
}

export {addActions, fetchChatReportsByIDs, showConciergeHistory};
