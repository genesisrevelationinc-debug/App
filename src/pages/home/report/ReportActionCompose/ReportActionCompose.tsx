import {useIsFocused} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useMemo, useRef, useState, useMemo} from 'react';
import {View} from 'react-native';
import type {OnyxEntry} from 'react-native-onyx';
import {useOnyx} from 'react-native-onyx';
import {isEmptyObject} from '@src/types/utils/EmptyObject';
import {isReportActionItem} from '@src/types/utils/reportActionItem';
import {isEmptyObject} from '@src/types/utils/EmptyObject';
import {usePrevious} from '@hooks/usePrevious';

type ReportActionComposeOnyxProps = {
    /** The details about the account of the currently logged in user */
    const [conciergeOptions, setConciergeOptions] = useState<ConciergeOption[]>([]);
    const [isLoadingConciergeOptions, setIsLoadingConciergeOptions] = useState(false);
    
    // Cache concierge options to prevent reloading on every selection
    const cachedConciergeOptionsRef = useRef<ConciergeOption[]>([]);
    
    const reportID = report?.reportID ?? '-1';
    const isConcierge = ReportUtils.isConciergeChatReport(report);
    
    const prevReportID = usePrevious(reportID);
    const prevIsFocused = usePrevious(isFocused);
    
    // Use cached options if available to prevent loading on every selection
    const effectiveConciergeOptions = useMemo(() => {
        return cachedConciergeOptionsRef.current.length > 0 ? cachedConciergeOptionsRef.current : conciergeOptions;
    }, [conciergeOptions]);
    
    // Load concierge options only when report changes, not on every selection
    useEffect(() => {
        if (!isConcierge || !isFocused) {
        }
        
        // Only load if report changed or we don't have options yet
        if (cachedConciergeOptionsRef.current.length > 0 && reportID === prevReportID) {
            // Use cached options, don't reload
            setConciergeOptions(cachedConciergeOptionsRef.current);
            return;
        }
        
        if (reportID === prevReportID && conciergeOptions.length > 0) {
            return;
        }
        setIsLoadingConciergeOptions(true);
        Report.fetchConciergeOptions(reportID)
            .then((options) => {
                cachedConciergeOptionsRef.current = options;
                setConciergeOptions(options);
            })
            .finally(() => {
            });
    }, [isConcierge, isFocused, reportID, prevReportID, conciergeOptions.length]);
    
    // Clear cache when report changes
    useEffect(() => {
        if (reportID !== prevReportID) {
            cachedConciergeOptionsRef.current = [];
            setConciergeOptions([]);
        }
    }, [reportID, prevReportID]);
    
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);