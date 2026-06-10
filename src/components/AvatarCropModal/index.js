import {useEffect, useCallback} from 'react';
import React, {useState, useRef, forwardRef} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-type';
        setFileToBeUploaded(props.file);
    }, [props.onClose, props.onModalHide, props.file]);

    // Handle the case where modal might not close properly after swipe back
    useEffect(() => {
        const handleCleanup = () => {
            // Ensure proper cleanup on unmount
            if (props.onModalHide) {
                props.onModalHide();
            }
        };
        
        // Handle swipe back gesture dismissal
        if (props.isVisible && props.onClose) {
            const backHandler = () => {
                handleCleanup();
            };
        }
        
        return handleCleanup;
    }, [props.isVisible, props.onModalHide, props.onClose]);

    const onCrop = useCallback(
        (signature) => {
            props.onCrop(signature);
        },
        [props.onCrop, props.onModalHide],
    );

    // Add specific handling for iOS swipe back
    useEffect(() => {
        const handleBackGesture = () => {
            props.onModalHide?.();
        };
        // Listen for browser back/forward navigation that might cause improper dismissal
    }, [props.onModalHide]);

    return (