import React, {useRef, useEffect, useCallback, useMemo} from 'react';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';
import {View, InteractionManager} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'underscore';
    const prevReportActionsRef = useRef(reportActions);
    const prevReportRef = useRef(props.report);
    const prevIsSmallScreenWidthRef = useRef(isSmallScreenWidth);
    const lastActionRef = useRef(null);

    const isFocused = useIsFocused();
    const isReportFullyVisible = isFocused && !props.isComposerFullSize;
        }
    }, [props.report, prevReportRef, isFocused, isAtBottom, isReportFullyVisible]);

    // Scroll to bottom when a new action is added
    useFocusEffect(
        useCallback(() => {
            // Check if a new action was added
            const currentActions = ReportActionsUtils.getSortedReportActionsForDisplay(props.report.reportID);
            if (currentActions.length > 0) {
                const lastAction = currentActions[currentActions.length - 1];
                if (lastActionRef.current && lastActionRef.current !== lastAction.reportActionID) {
                    scrollToBottom();
                }
                lastActionRef.current = lastAction ? lastAction.reportActionID : null;
            }
        }, [props.report.reportID, scrollToBottom])
    );

    useEffect(() => {
        const prevReport = prevReportRef.current;
        const prevReportActions = prevReportActionsRef.current;

        // When the user moves their focus to the Composer, we want to check if the report is fully visible
        // If the report is fully visible, we want to scroll the list to the bottom
        const currentActions = ReportActionsUtils.getSortedReportActionsForDisplay(props.report.reportID);
        let shouldScrollToBottom = false;

        // Always scroll to bottom for new actions, regardless of paid expense status
        if (currentActions.length > 0) {
            const lastAction = currentActions[currentActions.length - 1];
            if (lastActionRef.current !== (lastAction ? lastAction.reportActionID : null)) {
                shouldScrollToBottom = true;
                lastActionRef.current = lastAction ? lastAction.reportActionID : null;
            }
        }

        if (!isReportFullyVisible || !isAtBottom) {
            return;
        }
            return;
        }

        // Always scroll to bottom for new actions, even with paid expenses
        if (shouldShowLoader && !shouldScrollToBottom) {
            return;
        }


        scrollToBottom();
    }, [props.report, prevReportRef, isAtBottom, isReportFullyVisible, prevIsSmallScreenWidthRef, shouldShowLoader, scrollToBottom]);