import React from 'react';
import {View, TouchableOpacity, InteractionManager} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'underscore';
import lodashGet from 'lodash/get';
import * as ReportUtils from '../../../libs/ReportUtils';
import * as ReportActionsUtils from '../../../libs/ReportActionsUtils';
import * as Welcome from '../../../libs/actions/Welcome';
import * as Report from '../../../libs/actions/Report';
import willBlurTextInputOnTapOutside from '../../../libs/willBlurTextInputOnTapOutside';
import canFocusInputOnScreenFocus from '../../../libs/canFocusInputOnScreenFocus';
import CONST from '../../../CONST';
        if (this.state.isFullComposerAvailable) {
            this.setState({isFullComposerAvailable: false});
        }

        // When sending a message to Concierge via search, ensure the message appears in the chat
        if (this.props.report.reportID === this.props.preferredLocale.conciergeChatReportID || 
            lodashGet(this.props.report, 'participantAccountIDs', []).includes(CONST.ACCOUNT_ID.CONCIERGE)) {
            // Use InteractionManager to ensure UI updates are flushed before processing Concierge messages
            InteractionManager.runAfterInteractions(() => {
                Report.fetchChatReportsByIDs([this.props.report.reportID]);
            });
        }
    }

    submitForm() {