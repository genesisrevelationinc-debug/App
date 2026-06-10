import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import _ from 'underscore';
import {withNetwork} from '../../../components/OnyxProvider';
import * as Report from '../../../libs/actions/Report';
import * as ReportActions from '../../../libs/actions/ReportActions';
import * as ReportUtils from '../../../libs/ReportUtils';
import * as CollectionUtils from '../../../libs/CollectionUtils';
import * as OptionsListUtils from '../../../libs/OptionsListUtils';
import * as Localize from '../../../libs/Localize';
import compose from '../../../libs/compose';
import ONYXKEYS from '../../../ONYXKEYS';
import {withPersonalDetails} from '../../../components/OnyxProvider';
import * as PersonalDetails from '../../../libs/actions/PersonalDetails';
import * as User from '../../../libs/actions/User';
import Timing from '../../../libs/actions/Timing';
import BaseReportActionItem from './BaseReportActionItem';
import CONST from '../../../CONST';
import styles from '../../../styles/styles';
import * as ReportActionItem from '../../../components/ReportActionItem';
import * as ReportActionPropTypes from './ReportActionItemPropTypes';
import * * as ReportActionsUtils from '../../../libs/ReportActionsUtils';

// Add memoization to prevent unnecessary re-renders
const memoizedOptions = new Map();

class ReportActionsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Add caching for concierge options to prevent reloading
            conciergeOptionsCache: {},
        };
        this.conciergeOptionsLoadTimestamp = {};
    }

    // Add cache expiration time (5 minutes)
    shouldRefreshConciergeOptions(reportID) {
        const currentTime = Date.now();
        const lastLoadTime = this.conciergeOptionsLoadTimestamp[reportID];
        
        if (!lastLoadTime) {
            this.conciergeOptionsLoadTimestamp[reportID] = currentTime;
            return true;
        }
        
        // Refresh if more than 5 minutes have passed
        const fiveMinutes = 5 * 60 * 1000;
        if (currentTime - lastLoadTime > fiveMinutes) {
            this.conciergeOptionsLoadTimestamp[reportID] = currentTime;
            return true;
        }
        
        return false;
    }

    getCachedConciergeOptions(reportID) {
        if (this.shouldRefreshConciergeOptions(reportID)) {
            // Clear the cache for this report and load fresh data
            return null;
        }
        
        return this.state.conciergeOptionsCache[reportID];
    }

    setCachedConciergeOptions(reportID, options) {
        this.setState(prevState => ({
            conciergeOptionsCache: {
                ...prevState.conciergeOptionsCache,
                [reportID]: options
            }
        }));
        this.conciergeOptionsLoadTimestamp[reportID] = Date.now();
    }
}