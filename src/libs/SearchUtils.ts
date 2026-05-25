// Search utilities
import type {OnyxCollection, OnyxEntry} from 'react-native-onyx';
import Onyx from 'react-native-onyx';
import type {ValueOf} from 'type-fest';
    const canSubmit = isExpenseReport && !isReportSubmitted && !isReportClosed && !isReportApproved;

    // Build options based on conditions
    if (canSubmit) {
        options.push({
            text: translate('common.submit'),
            value: CONST.SEARCH.ACTIONS.SUBMIT,