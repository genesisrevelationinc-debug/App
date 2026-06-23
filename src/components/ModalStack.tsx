import React from 'react';
import {useEffect} from 'react';
import {View} from 'react-native';
import type {ModalStackProps} from './types';

    if (!props.isVisible) {
        return null;
    }

    useEffect(() => {
        const handlePopState = () => {
            if (props.onClose) {
                props.onClose();
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [props.onClose]);

    return (
        <View style={props.style}>
            {props.children}