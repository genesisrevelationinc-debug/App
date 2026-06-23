import React, {useEffect, useRef} from 'react';
import type {ModalProps} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {FullScreen, NewModal} from '@components/Modal/Modal';
import {useModalContext} from '@components/Modal/ModalContext';
import type {ModalContextProps} from '@components/Modal/ModalContext';
    const {isSmallScreenWidth} = useScreenDimensions();
    const {isModalOpen, registerModal, unregisterModal} = useModalContext();
    const modalIdRef = useRef<string | null>(null);
    const isVisibleRef = useRef(false);

    const generateModalId = () => {
        return `modal-${Math.random().toString(36).substring(2, 9)}`;

    useEffect(() => {
        if (isVisible && !modalIdRef.current) {
            isVisibleRef.current = true;
            modalIdRef.current = generateModalId();
            registerModal(modalIdRef.current);
            onModalWillShow();
    }, [isVisible, registerModal, onModalWillShow]);

    useEffect(() => {
        isVisibleRef.current = isVisible;
        if (!isVisible && modalIdRef.current) {
            unregisterModal(modalIdRef.current);
            modalIdRef.current = null;
        }
    }, [isVisible, unregisterModal, onModalHide]);

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                // Cleanup modal registration when screen loses focus
                if (modalIdRef.current) {
                    unregisterModal(modalIdRef.current);
                    modalIdRef.current = null;
                }
                if (isVisibleRef.current) {
                    onModalHide();
                }
            };
        }, [unregisterModal, onModalHide]),
    );

    if (isSmallScreenWidth) {
        return (
            <NewModal