/**
 * ReportActionItemMessage is a bit of a "god component" for displaying the messages in a report. It
 * handles a lot of logic and covers a few cases:
 * 1. It renders the chat bubble / message content
 * 2. It renders the HTML for the message content
 * 3. It renders the marker for a message that is a historical message (a message that is not the
 *    current user's most recent message sent to the report)
 */
import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styles from '../styles/styles';
import * as Report from '../libs/actions/Report';
import withLocalize from './withLocalize';
import {withNetwork} from '../components/OnyxProvider';
import compose from '../libs/compose';
import reportActionPropTypes from '../pages/home/report/reportActionPropTypes';

const propTypes = {
    /** All the data of the report action */
    action: PropTypes.shape(reportActionPropTypes),

    /** Whether or not the report action is from an existing user in the report. This is re-derivable
     * from the report action's data, but having it in the props helps prevent the need to re-run
     * the derivable data functions every time the component is rendered.
     */
    isHistorical: PropTypes.bool,
};

const defaultProps = {
    action: {},
    isHistorical: false,
};

const ReportActionItemMessage = (props) => {
    const hasActionToApplyTo = !_.isEmpty(props.action);
    const message = hasActionToApplyTo
        ? props.action.message
        : undefined;
    const messageText = message ? message.map(m => m.text).join(' ') : '';
    const isSplit = hasActionToApplyTo && props.action.actionName === 'split';

    // When isHistorical is true, we put a " (historical message)" after the message
    // This is to indicate that the message is not the user's most recent message sent to the report
    const historicalMessage = hasActionToApplyTo && props.isHistorical ? ' (historical message)' : '';
    return (
        <View style={[styles.chatItemMessage, isSplit ? styles.chatItemMessageWithDisplayName : {}]}>
            <View style={styles.chatItemMessageHeader}></View>
            <View style={styles.chatItemMessageBody}>
                {isSplit && (
                    <View style={styles.splitMarker} />
                )}
                <View>{messageText}</View>
                {historicalMessage}
            </View>
        </View>
    );
};

ReportActionItemMessage.propTypes = propTypes;
ReportActionItemMessage.defaultProps = defaultProps;
export default compose(
    withLocalize,
    withNetwork(),
)(ReportActionItemMessage);