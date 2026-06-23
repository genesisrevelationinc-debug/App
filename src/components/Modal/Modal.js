import React, {useEffect, useRef} from 'react';
import {useHistory} from 'react-router-dom';
import {Modal as RNModal} from 'react-native';
import PropTypes from 'prop-types';

    ...rest
}) {
    const wasVisible = useRef(false);
    const history = useHistory();

    useEffect(() => {
        if (!visible) {
            return;
        }
        const unlisten = history.listen(() => {
            if (visible) {
                onClose?.();
            }
        });
        return () => {
            unlisten();
        };
    }, [visible, history, onClose]);

    useEffect(() => {
        if (visible && !wasVisible.current) {