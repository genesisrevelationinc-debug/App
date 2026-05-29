import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/styles';
import {withNetwork} from '../components/OnyxProvider';
import * as ReportUtils from '../libs/ReportUtils';
import * as Localize from '../libs/Localize';
import * as SplitUtils from '../libs/SplitUtils';

const ReportActionItemAmount = (props) => {
    const hasRemovedSplits = SplitUtils.hasRemovedSplits(props.reportID);
    
    return (
        <View style={[styles.amount, styles.alignSelfCenter]}>
            <Text style={[styles.amount, styles.alignSelfCenter]}>
                {Localize.numberFormat(props.action.amount, {precision: 2})}
            </Text>
            {hasRemovedSplits && (
                <View style={styles.splitDot}>
                    <Text style={styles.splitDotText}>•</Text>
                </View>
            )}
        </View>
    );
};