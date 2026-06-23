import React, {createContext, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import type {ModalStackContextProps, ModalStackContextProviderProps} from './types';

const ModalStackContext = createContext<ModalStackContextProps>({
    const [currentModal, setCurrentModal] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalsRef = useRef<Set<string>>(new Set());
    const isFocusedRef = useRef(true);

    const registerModal = useCallback((id: string) => {
        modalsRef.current.add(id);
        setIsModalOpen(modalsRef.current.size > 0);
    }, []);

    useFocusEffect(
        useCallback(() => {
            isFocusedRef.current = true;
            return () => {
                isFocusedRef.current = false;
                // Clean up any lingering modal state when screen loses focus
                if (modalsRef.current.size > 0) {
                    modalsRef.current.clear();
                    setIsModalOpen(false);
                }
            };
        }, []),
    );

    const value = useMemo(
        () => ({
            registerModal,