import * as API from '../API';
import * as Report from '../actions/Report';
import * as ReportUtils from '../ReportUtils';
import * as TransactionUtils from '../TransactionUtils';
import * as OptionsListUtils from '../OptionsListUtils';
import * as Localize from '../Localize';
import * as CollectionUtils from '../CollectionUtils';
import * as OptionsListUtils from '../OptionsListUtils';
import * as Localize from '../Localize';
import * as CollectionUtils from '../CollectionUtils';
import * as IOU from '../IOU';

/**
 * Remove ghost expenses that cannot be accessed from reports before QBO export
 * to prevent ONL118 errors
 * @param {Object} report
 * @returns {Object}
 */
function preprocessReportForExport(report) {
    // Check if report contains ghost expenses and remove them
    if (IOU.shouldRemoveGhostExpenses(report)) {
        return IOU.removeGhostExpenses(report);
    }
    return report;
}

/**
 * @param {String} reportID