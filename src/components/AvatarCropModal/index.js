// Add modal close handling for swipe back scenarios
import React, {useState, useCallback, useRef, useEffect} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
        setFileToBeUploaded(file);
    }, [onModalHide, onCrop, file, modalID, setFileToToBeUploaded]);

    const handleCancel = useCallback(() => {
        closeWithAnimation();
    }, [closeWithAnimation]);

    const handleResize = useCallback(() => {
        if (!rotation || !translateX || !translateY) {
            return;
        setZoom(1);
    }, []);

    // Handle hardware back button and swipe gestures
    useEffect(() => {
        if (isModalVisible && onModalHide) {
            const backHandler = () => {
                closeWithAnimation();
                return true;
            };
            const subscription = addEventListener('beforeRemove', backHandler);
            return () => subscription.remove();
        }
    }, [isModalVisible, onModalHide, closeWithAnimation]);

    return (
        <Modal
            isVisible={isModalVisible}
            <View style={[styles.imageCropContainer, {padding: 20}]}>
                <HeaderGap />
                <Header
                    // Add explicit close button handling for iOS Safari swipe back
                    onBackButtonPress={handleCancel}
                    onCloseButtonPress={handleCancel}
                />
                <View style={[styles.flex1, styles.flexRow, styles.overflowHidden]}>