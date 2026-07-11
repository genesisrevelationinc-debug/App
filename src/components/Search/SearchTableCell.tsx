import React from 'react';
import {View} from 'react-native';
import Text from '@components/Text';
import type {SearchColumnType} from '@libs/SearchUtils';
import useThemeStyles from '@hooks/useThemeStyles';

type SearchTableCellProps = {
    value: string;
    /** Whether this is a header cell */
    isHeader?: boolean;
    columnType?: SearchColumnType;
};

function SearchTableCell({value, isHeader = false}: SearchTableCellProps) {
    const styles = useThemeStyles();

    return (
        <View style={[styles.flex1, styles.alignItemsStart]}>
            <Text style={isHeader ? styles.textLabelSupporting : styles.textLabel}>{value}</Text>
        </View>
    );