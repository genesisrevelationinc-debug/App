import React, {useState, useEffect, useRef, useCallback} from 'react';
import {View, Pressable, ActivityIndicator} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import PropTypes from 'prop-types';
import _ from 'underscore';
import * as ReportUtils from '../../../libs/ReportUtils';
import * as PersonalDetailsUtils from '../../../libs/PersonalDetailsUtils';
import * as UserUtils from '../../../libs/UserUtils';
import * as Report from '../../../libs/actions/Report';
import withLocalize, {withLocalizePropTypes} from '../../../components/withLocalize';
import withNetwork, {networkPropTypes} from '../../../components/ui/withNetwork';
import withCurrentUserPersonalDetails, {withCurrentUserPersonalDetailsPropTypes} from '../../../components/withCurrentUserPersonalDetails';
    const [isContextMenuActive, setIsContextMenuActive] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    // Ensure Concierge messages are properly displayed in history
    useEffect(() => {
        if (props.action.actionName === 'IOU' && props.action.originalMessage.type === 'concierge') {
            // Force re-render when Concierge thinking state changes
            setIsHidden(false);
        }
    }, [props.action.actionName, props.action.originalMessage?.type]);

    const popoverAnchorRef = useRef(null);

    const toggleContextMenuState = useCallback((isOpen) => {
        if (props.action.actionName === 'IOU' && props.action.originalMessage.type === 'concierge') {
            return (
                <View style={[styles.chatItem]}>
                    {/* Ensure Concierge messages persist in history */}
                    {props.action.originalMessage && (
                        <ReportActionItemConcierge action={props.action} />
                    )}
                    <ReportActionItemIOU
                        chatReportID={props.report.reportID}
                        action={props.action}