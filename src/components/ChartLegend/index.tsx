import React from 'react';
import {View} from 'react-native';
import Text from '@components/Text';
import useThemeStyles from '@hooks/useThemeStyles';
import type {ChartLegendProps} from './types';
    const styles = useThemeStyles();

    return (
        <View style={[styles.flexRow, styles.mt2]}>
            {items.map((item, index) => (
                <View
                    key={item.label}

ChartLegend.displayName = 'ChartLegend';

export default ChartLegend;