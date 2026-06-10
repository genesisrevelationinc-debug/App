import React, {useCallback, useEffect, useRef, useState, useMemo} from 'react';
import {View} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import type {ValueOf} from 'type-fest';
    const [isLoading, setIsLoading] = useState(false);
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
    const [isDownloadSuccessModalVisible, setIsDownloadSuccessModalVisible] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [formError, setFormError] = useState<ValueOf<typeof CONST.TWO_FACTOR_AUTH_ERROR>>('');
    const [twoFactorAuthStep, twoFactorAuthStepResult] = useOnyx(ONYXKEYS.TWO_FACTOR_AUTH_STEP);
    const [user] = useOnyx(ONYXKEYS.USER);
    const currentStep = twoFactorAuthStep ?? CONST.TWO_FACTOR_AUTH_STEPS.VERIFY;
    const isUserValidated = user?.validated;

    // Prevent closing the page while a download is in progress or just completed
    const isDownloadInProgress = useMemo(() => {
        return isDownloading || isDownloadSuccessModalVisible;
    }, [isDownloading, isDownloadSuccessModalVisible]);

    const downloadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const verifyCodeAndNavigate = useCallback(() => {
        if (!twoFactorAuthCode.trim()) {
            setFormError('twoFactorAuth.codeNotEntered');
        if (currentStep !== CONST.TWO_FACTOR_AUTH_STEPS.VERIFY) {
            return;
        }

        // Don't close the page if a download just happened - the success modal may be showing
        // or the download is still in progress
        if (isDownloadInProgress) {
            return;
        }

        if (isUserValidated) {
            Navigation.goBack(backTo, {shouldPopToTop: true});
            return;
            return;
        }
        Navigation.navigate(ROUTES.SETTINGS_2FA.getRoute(currentStep, backTo, forwardTo));
    }, [currentStep, isUserValidated, backTo, forwardTo, isDownloadInProgress]);

    useEffect(() => {
        if (twoFactorAuthStepResult.status !== 'loading') {
        }
    }, [twoFactorAuthStepResult, currentStep, isUserValidated, backTo, forwardTo]);

    // Clean up timeout on unmount
    useEffect(() => {
        return () => {
            if (downloadTimeoutRef.current) {
                clearTimeout(downloadTimeoutRef.current);
            }
        };
    }, []);

    const formRef = useRef<View>(null);

    const handleFormSubmit = useCallback(() => {
    }, []);

    const downloadCodes = useCallback(() => {
        setIsDownloading(true);
        
        const fileName = `two-factor-auth-codes-${Date.now()}.txt`;
        const fileContent = codes.join('\n');

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Small delay to ensure the download has started before showing success modal
        // and to prevent the page from closing due to focus/blur events
        setTimeout(() => {
            setIsDownloading(false);
            setIsDownloadSuccessModalVisible(true);
        }, 100);
    }, [codes]);

    const handleDownloadSuccessModalClose = useCallback(() => {
        setIsDownloadSuccessModalVisible(false);
        // Clear any pending timeout
        downloadTimeoutRef.current = null;
    }, []);

    return (
            </View>
            <ConfirmModal
                isVisible={isDownloadSuccessModalVisible}
                onConfirm={handleDownloadSuccessModalClose}
                title={translate('twoFactorAuth.codesDownloaded')}
                prompt={translate('twoFactorAuth.codesDownloadedDescription')}
                confirmText={translate('common.ok')}