import React, {useCallback, useEffect, useState} from 'react';
import {Keyboard, View} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import type {ValueOf} from 'type-fest';
import ConfirmModal from '@components/ConfirmModal';
import useNetwork from '@hooks/useNetwork';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import KeyboardShortcut from '@libs/KeyboardShortcut';
import Navigation from '@libs/Navigation/Navigation';
import * as PolicyUtils from '@libs/PolicyUtils';
import * as ReportUtils from '@libs/ReportUtils';
        }
    }, [isOffline, isSubmitting, isVsb, createWorkspace]);

    useEffect(() => {
        const unsubscribe = KeyboardShortcut.subscribe(
            'Enter',
            () => {
                if (!isCurrencyModalOpen) {
                    return;
                }
                Keyboard.dismiss();
                setIsCurrencyModalOpen(false);
            },
            {isInputFocused: true},
        );

        return unsubscribe;
    }, [isCurrencyModalOpen]);

    const navigateToWorkspace = useCallback(() => {
        if (!activePolicyID) {
            return;