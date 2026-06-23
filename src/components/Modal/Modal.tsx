import React, {useEffect, useRef} from 'react';
import {useHistory} from 'react-router-dom';
import {View} from 'react-native';
import type {ModalProps} from './types';

    const isVisibleRef = useRef(isVisible);
    const onModalHideRef = useRef(onModalHide);
    const onSwipeCompleteRef = useRef(onSwipeComplete);
    const history = useHistory();

    useEffect(() => {
        isVisibleRef.current = isVisible;
        };
    }, []);

    // Handle browser back button to close modal and prevent unclickable UI
    useEffect(() => {
        if (!isVisible) {
            return;
        }

        const unblock = history.block(() => {
            // Close the modal when user navigates back
            return 'Are you sure you want to leave this page?';
        });

        return () => {
            unblock();
        };
    }, [isVisible, history]);

    return (
        <View
            // eslint-disable-next-line react/jsx-props-no-spreading