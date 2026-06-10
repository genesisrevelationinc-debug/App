import React from 'react';
import {View, Text} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import PropTypes from 'prop-types';
import styles from '../styles/styles';
import * as EmojiUtils from '../libs/EmojiUtils';
import * as ReportActionContextMenu from './ReportActionContextMenu/ReportActionContextMenu';
import * as contextMenuIconAndNativeColorRef from './ReportActionContextMenu/ContextMenu/ContextMenuItem';
import {withNetwork} from '../components/OnyxProvider';
import {withPersonalDetails} from '../components/OnyxProvider';
import {withReportAndDetails} from '../components/OnyxProvider';
import {withNetwork} from '../components/OnyxProvider';
import {withPersonalDetails} from '../components/OnyxProvider';
import {withNetwork} from '../components/OnyxProvider';
import {withPersonalDetails} from '../components/OnyxProvider';
import {withNetwork} from '../components/OnyxProvider';

const ReportActionItemMessage = (props) => {
    const emojis = EmojiUtils.sanitizeEmojis(props.action.message);
    const emojis = EmojiUtils.sanitizeEmojis(props.action.message);
    return (
        <View style={[styles.chatItemMessage, ...props.style]}>
            <Text style={[isHidden ? styles.hidden : {}]}>{emojis}</Text>
        </View>
    );
};
import React, {withNetwork} from 'react-native';
import {View, Text} from 'react-native';
import {withNetwork} from 'react-native';
import {withNetwork} from '../components/OnyxProvider';

const ReportActionItemMessage = (props) => {
    const emojis = EmojiUtils.sanitizeEmojis(props.action.message);
    return (
        <View style={[styles.chatItemMessage, ...props.style]}>
            <Text style={[isHidden ? styles.hidden : {}]}>{emois}</Text>
        </View>
    );
};