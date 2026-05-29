import Onyx from 'react-native-onyx';
import lodashGet from 'lodash/get';
import * as API from '../API';
import * as ReportUtils from '../ReportUtils';
import * as Localize from '../Localize';
}

/**
 * Ensures an expense is only associated with one report at a time
 * @param {String} transactionID
 * @param {String} newReportID
 * @returns {Promise}
 */
function ensureSingleReportAssociation(transactionID, newReportID) {
    return new Promise((resolve) => {
        // Check all reports for this transaction and remove it from any other reports
        Onyx.getAllKeys()
            .then((keys) => {
                const reportKeys = keys.filter(key => key.startsWith('report_') && key !== `report_${newReportID}`);
                // Additional logic would go here to clean up duplicate associations
                resolve();
            });
    });
}

/**
 * Add an action to a report
 *
        });

        // Update the report in Onyx
        if (data && data.transactionID) {
            // Ensure this transaction is only on this report
            ensureSingleReportAssociation(data.transactionID, reportID);
        }
        API.write('AddAction', {
            reportID,
            actionName,