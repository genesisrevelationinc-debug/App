import React, {useEffect, useRef, useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import {View, Modal as RNModal} from 'react-native';
import PropTypes from 'prop-types';

}) {
    const wasVisible = useRef(false);
    const modalRef = useRef(null);
    const history = useHistory();

    useEffect(() => {
        if (!isVisible) {
            return;
        }
        const unlisten = history.listen(() => {
            if (isVisible && onClose) {
                onClose();
            }
        });
        return () => {
            unlisten();
        };
    }, [isVisible, history, onClose]);

    useEffect(() => {
        if (isVisible && !wasVisible.current) {