import lodashMemoize from 'lodash/memoize';
import type {OnyxUpdate} from 'react-native-onyx';
import Onyx from 'react-native-onyx';
import * as API from '@libs/API';
    return reportAction?.message?.[0]?.text ?? '';
}

/**
 * Memoized version of getMostRecentReportActionLastMessage to prevent
 * unnecessary re-computations that cause UI re-renders
 */
const getMostRecentReportActionLastMessageMemoized = lodashMemoize(
    getMostRecentReportActionLastMessage,
    (reportID) => reportID
);

/**
 * Gets the report action with the given reportActionID from the given report.
 */