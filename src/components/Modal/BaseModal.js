import {useEffect, useCallback} from 'react';
import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {View, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
        }
    }, [modalStyle, ...props]);

    // Handle the case where modal might not close properly after swipe back
    useEffect(() => {
        if (isVisible) {
            const handleHardwareBack = () => {
                // Ensure modal can be dismissed properly
                if (onClose) {
                    return onClose();
                }
                return undefined;
            };
            
            // Add additional cleanup for swipe back scenarios on iOS
            let backHandler;
            if (isSmallScreenWidth) {
                backHandler = () => handleHardwareBack();
            }
        }
    }, [isVisible, onClose, isSmallScreenWidth]);

    useImperativeHandle(ref, () => ({
        getModalElement: () => modal,
        close: () => close(),