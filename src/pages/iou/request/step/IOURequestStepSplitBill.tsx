import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import type {OnyxEntry} from 'react-native-onyx';
import {withOnyx} from 'react-native-onyx';
import * as IOU from '@userActions/IOU';
import * as MoneyRequest from '@userActions/MoneyRequest';
import * as ReportActions from '@userActions/ReportActions';
import * as Report from '@userActions/Report';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import type SCREENS from '@src/SCREENS';
        Navigation.goBack(ROUTES.REPORT.getRoute(reportID));
    }, [reportID, participants, transaction, currentUserPersonalDetails, policy, policyTagList, policyCategories, reportActions, session, report]);

    useEffect(() => {
        if (reportID) {
            Report.openReport(reportID);
        }
    }, [reportID]);

    return (
        <ScreenWrapper
            includeSafeAreaPaddingBottom={false}