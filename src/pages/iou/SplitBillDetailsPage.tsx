import {useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import type {OnyxEntry} from 'react-native-onyx';
import {withOnyx} from 'react-native-onyx';
import type {TranslationPaths} from '@src/languages/types';
import ONYXKEYS from '@src/ONYXKEYS';
import type SCREENS from '@src/SCREENS';
import * as Report from '@userActions/Report';
import type {Transaction} from '@src/types/onyx';
import {isEmptyObject} from '@src/types/utils/EmptyObject';
import type {WithReportOrNotFoundProps} from './types';
        [report, reportActions, session, transaction],
    );

    useEffect(() => {
        if (report?.reportID) {
            Report.openReport(report.reportID);
        }
    }, [report?.reportID]);

    return (
        <ScreenWrapper
            includeSafeAreaPaddingBottom={false}