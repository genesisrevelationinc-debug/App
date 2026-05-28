// This file handles report actions
import Onyx from 'react-native-onyx';
import type {OnyxUpdate} from 'react-native-onyx';
import type {ValueOf} from 'type-fest';
    OptimisticReportAction,
    OptimisticCreatedReportAction,
    ReportAction,
    ReportActionBase,
} from '@src/types/onyx';
import {isEmptyObject} from '@src/types/utils/IsEmptyObject';
import type {EmptyObject} from '@src/types/utils/EmptyObject';
    shouldReportBeInOptionList,
} from './ReportUtils';
import type {PolicyDataForMerge} from './ReportUtils';
import {updateLastReadActionID} from './Report';

type ReportRouteParams = {
    reportID: string;
    return {reportActions, onyxData};
}

/**
 * Check if a report action is a system message (like "Concierge is thinking...")
 */
function isSystemMessage(action: ReportAction): boolean {
    const messageText = getReportActionMessageText(action);
    return messageText?.includes('Concierge is thinking') ?? false;
}

/**
 * Add a single comment to a report
 */
    Navigation.navigate(ROUTES.REPORT_WITH_ID.getRoute(reportID));
}

/**
 * Navigate to a report and ensure it's properly loaded
 */
function navigateToReport(reportID: string) {
    Navigation.navigate(ROUTES.REPORT_WITH_ID.getRoute(reportID));
}

/**
 * Add a policy report (workspace room) optimistically.
 */
    addComment,
    addAttachment,
    addActionsToReportWithOnyx,
    isSystemMessage,
    navigateToAndOpenReport,
    navigateToAndOpenReportWithReportID,
    navigateToConciergeChatAndReplaceReportID,
    setIsSidebarLoaded,
    openReport,
    readNewestAction,
    navigateToReport,
    openPaymentDetailsPage,
    sendMoneyWithWallet,
    sendMoneyElsewhere,