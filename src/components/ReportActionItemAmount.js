import React from 'react';
import {View, Text} from 'react-native';
import _ from 'underscore';
import PropTypes from 'prop-types';
import styles from '../styles/styles';
import {withNetwork} from '../components/OnyxProvider';
import * as Localize from '../libs/Localize';
import * as ReportUtils from '../libs/ReportUtils';

/**
 * Show the amount with a split indicator if the expense has splits
 */
const ReportActionItemAmount = (props) => {
    const hasSplits = ReportUtils.hasRemovedSplitAmounts(props.reportID, props.action);
    
    return (
        <View style={[styles.amount, styles.alignSelfCenter]}>
            <Text style={[styles.amount, styles.alignSelfCenter]}>
                {Localize.numberFormat(props.action.amount, {precision: 2})}
            </Text>
            {hasSplits && (
                <View style={styles.splitDot}>
                    <Text style={styles.splitDotText}>•</Text>
                </View>
            )}
        </View>
    );
};