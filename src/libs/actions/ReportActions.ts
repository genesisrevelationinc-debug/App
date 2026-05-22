import Onyx from 'react-native-onyx';
import type {OnyxUpdate} from 'react-native-onyx';
import * as OnyxUpdates from '@libs/actions/OnyxUpdates';
import ONYXKEYS from '@src/ONYXKEYS';
import type {ReportAction} from '@src/types/onyx/ReportAction';
import type {EmptyObject} from '@src/types/utils/EmptyObject';
import {isEmptyObject} from '@src/types/utils/EmptyObject';
import * as ReportUtils from '@libs/ReportUtils';

type ReportActionData = {
    reportAction: ReportAction;
    reportID: string,
    reportAction: ReportAction,
    reportActions: ReportActions,
    previousReportID?: string,
): OnyxUpdate[] {
    const optimisticReportActions = {
        [reportAction.reportActionID]: reportAction,

    const onyxData: OnyxUpdate[] = [
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: `${ONYXKEYS.COLLECTION.REPORT_ACTIONS}${reportID}`,
            value: optimisticReportActions,
        },
    ];

    // If this action was previously in a different report, remove it from the old report
    if (previousReportID && previousReportID !== reportID) {
        onyxData.push({
            onyxMethod: Onyx.METHOD.MERGE,
            key: `${ONYXKEYS.COLLECTION.REPORT_ACTIONS}${previousReportID}`,
            value: {
                [reportAction.reportActionID]: null,
            },
        });
    }

    return onyxData;
}

function buildOptimisticAddCommentReportAction(
    reportID: string,
    comment: string,
    reportAction: ReportAction,
    reportActions: ReportActions,
): OnyxUpdate[] {
    const optimisticReportActions = {
        [reportAction.reportActionID]: reportAction,
    };

    const onyxData: OnyxUpdate[] = [
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: `${ONYXKEYS.COLLECTION.REPORT_ACTIONS}${reportID}`,
            value: optimisticReportActions,