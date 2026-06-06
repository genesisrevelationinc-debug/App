import React, {useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import type {ValueOf} from 'type-fest';
import Button from '@components/Button';
import type {ListItem, SelectionListHandle} from '@components/SelectionList/types';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import KeyboardShortcut from '@libs/KeyboardShortcut';
import type {Currency} from '@src/CONST';
import type ONYXKEYS from '@src/ONYXKEYS';

        [currencies, searchValue, selectedCurrency, translate],
    );

    useEffect(() => {
        const unsubscribe = KeyboardShortcut.subscribe(
            'Enter',
            () => {
                if (!searchValue && !selectedCurrency) {
                    return;
                }
                onConfirm();
            },
            {isInputFocused: true},
        );

        return unsubscribe;
    }, [onConfirm, searchValue, selectedCurrency]);

    return (
        <View style={[styles.flex1, styles.w100]}>
            <SelectionList<CurrencyListItem>