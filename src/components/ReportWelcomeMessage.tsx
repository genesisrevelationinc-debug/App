import React from 'react';
import {View} from 'react-native';
import type {OnyxEntry} from 'react-native-onyx';
import {useOnyx} from 'react-native-onyx';
import type {ValueOf} from 'type-fest';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import * as ReportUtils from '@libs/ReportUtils';
import type {TranslationPaths} from '@src/languages/types';
import ONYXKEYS from '@src/ONYXKEYS';
import type {ReportActions} from '@src/types/onyx';
import type Report from '@src/types/onyx/Report';
import type {Message} from '@src/types/onyx/ReportAction';
import {isEmptyObject} from '@src/types/utils/EmptyObject';
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const [reportActions] = useOnyx(`${ONYXKEYS.COLLECTION.REPORT_ACTIONS}${report?.reportID ?? '-1'}`, {
        canBeMissing: true,
    });

    const welcomeMessage = ReportUtils.getReportWelcomeMessage(report, policy);
    const isPolicyExpenseChat = ReportUtils.isPolicyExpenseChat(report);
    const isChatRoom = ReportUtils.isChatRoom(report);
    const isSystemChat = ReportUtils.isSystemChat(report);
    const isDefaultRoom = ReportUtils.isDefaultRoom(report);
    const isConciergeChat = ReportUtils.isConciergeChat(report);
    const hasReportActions = !isEmptyObject(reportActions) && Object.keys(reportActions).length > 0;
    const shouldShowWelcomeMessage = !isEmptyObject(welcomeMessage) && !isArchivedRoom && (!isConciergeChat || !hasReportActions);

    const roomWelcomeMessage = ReportUtils.getRoomWelcomeMessage(report, isUserPolicyAdmin);
