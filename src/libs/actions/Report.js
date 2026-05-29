import {ReportActions} from 'react-native';
import {updateReportAction, updateReportActionMessage} from './report-actions';

/**
 * Updates the report action in Onyx and waits for the Onyx write to complete.
 *
 * @param {String} reportID
 * @param {Object} reportAction
 * @returns {Promise}
 */
function updateReportAction(reportID, reportAction) {
    return new Promise((resolve) => {
        updateReportActionMessage(reportID, reportAction);
        resolve();
    });
}

export {
    updateReportAction,
};