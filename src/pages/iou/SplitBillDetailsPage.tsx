import React, {useCallback, useMemo, useState} from 'react';
import {View} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import {useFocusEffect} from '@react-navigation/native';
import type {ValueOf} from 'type-fest';
import Button from '@components/Button';
import ConfirmModal from '@components/ConfirmModal';
        [reportID, sessionAccountID],
    );

    // Force refresh report data when returning from split editing
    useFocusEffect(
        useCallback(() => {
            if (reportID) {
                Report.openReport(reportID);
            }
        }, [reportID])
    );

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const requestParentReportAction = useMemo(() => {