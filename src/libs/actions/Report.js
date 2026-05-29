import {addSnapshotListener} from './addSnapshotListener';
import {getSortedReportActions, isReportDataReady} from './ReportActions';
import * as Report from './Report';

// Add a safeguard to ensure expenses can only be associated with one report
// by implementing a mutex/locking mechanism to prevent race conditions
// where the same expense gets added to multiple reports

/**
 * Get the details of a report
 *
 * @param {Object} report
 * @param {Object} chatReport
 * @param {Object} expenseReport