import React, {useEffect, useRef, useState} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import * as Session from '../../libs/actions/Session';
import * as ReportUtils from '../../libs/ReportUtils';
import * as StyleUtils from '../../styles/StyleUtils';
import * as UserUtils from '../../libs/UserUtils';
    useEffect(() => {
        if (!props.isLoadingInitialReportActions && !props.isCreatingReportAction) {
            setRefreshing(false);
            // Ensure the inbox is refreshed after login
            if (props.isFirstLoad) {
                Session.fetchAllReports();
            }
        }
    }, [props.isLoadingInitialReportActions, props.isCreatingReportAction, props.isFirstLoad]);
