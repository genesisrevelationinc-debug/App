import React from 'react';
import {View} from 'react-native';
import Text from '@components/Text';
import type {SearchColumnType} from '@libs/SearchUtils';
import useThemeStyles from '@hooks/useThemeStyles';
import type {SearchTransactionAction} from '@libs/SearchParser';

type SearchRowProps = {
    /** The item to render */
    item: SearchTransactionAction;
    columnType?: SearchColumnType;
};

function SearchRow({item}: SearchRowProps) {
    const styles = useThemeStyles();

    return (
        <View style={[styles.flex1, styles.alignItemsStart]}>
            <Text style={styles.textLabel}>{item.formattedAmount}</Text>
        </View>
    );