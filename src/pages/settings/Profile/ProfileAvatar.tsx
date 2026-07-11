import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import {useNavigation} from '@react-navigation/native';
import AvatarCropModal from '@components/AvatarCropModal';
import Button from '@components/Button';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import MenuItemWithTopDescription from '@components/MenuItemWithTopDescription';
import ScreenWrapper from '@components/ScreenWrapper';
import useLocalize from '@hooks/useLocalize';
import useBeforeRemove from '@hooks/useBeforeRemove';
import useThemeStyles from '@hooks/useThemeStyles';
import * as User from '@userActions/User';
import CONST from '@src/CONST';
    const [isAvatarCropModalOpen, setIsAvatarCropModalOpen] = useState(false);
    const [isDeleteAvatarModalOpen, setIsDeleteAvatarModalOpen] = useState(false);
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [cachedUploadedAvatar, setCachedUploadedAvatar] = useState<string | null>(null);
    const [pendingAction, setPendingAction] = useState<'upload' | 'delete' | null>(null);
    const [avatarSource, setAvatarSource] = useState<string | null>(null);
    const {translate} = useLocalize();
    const styles = useThemeStyles();
    const originalAvatar = useRef(account?.avatar ?? '');
    const navigation = useNavigation();
    const isUsingDefaultAvatar = !account?.avatar;
    const isUsingCustomAvatar = !!account?.avatar && account?.avatar !== cachedUploadedAvatar;
    const isAvatarSet = isUsingDefaultAvatar || isUsingCustomAvatar;
    const isPendingDelete = pendingAction === 'delete';
    useBeforeRemove(() => {
        if (!hasUnsavedChanges) {
            return;
        }
        // Prevent default behavior of going back
    }, [hasUnsavedChanges]);

    useEffect(() => {
        if (!isUploadingAvatar || !cachedUploadedAvatar) {
            return;
        setIsAvatarCropModalOpen(false);
        setCachedUploadedAvatar(null);
        setIsUploadingAvatar(false);
        setHasUnsavedChanges(false);
    }, []);
    const handleAvatarCropModalOpen = useCallback(() => {
        setIsAvatarCropModalOpen(true);
        setAvatarSource(uri);
        setCachedUploadedAvatar(null);
        setHasUnsavedChanges(true);
    }, []);
    const handleDeleteAvatar = useCallback(() => {
        setIsDeleteAvatarModalOpen(true);
        setPendingAction('delete');
        setCachedUploadedAvatar(null);
        setHasUnsavedChanges(true);
    }, []);
    const handleConfirmDeleteAvatar = useCallback(() => {
        User.deleteAvatar();
        setIsDeleteAvatarModalOpen(false);
        setPendingAction(null);
        setHasUnsavedChanges(false);
    }, []);
    const handleCancelDeleteAvatar = useCallback(() => {
        setIsDeleteAvatarModalOpen(false);
        setPendingAction(null);
        setCachedUploadedAvatar(null);
        setHasUnsavedChanges(false);
    }, []);
    const handleAvatarCropModalClose = useCallback(() => {
        setIsAvatarCropModalOpen(false);
        setAvatarSource(null);
        setCachedUploadedAvatar(null);
        setHasUnsavedChanges(false);
    }, []);
    const handleAvatarCropModalSave = useCallback((croppedImage: File | Blob) => {
        setIsAvatarCropModalOpen(false);
        setAvatarSource(null);
        setIsUploadingAvatar(true);
        setHasUnsavedChanges(false);
    }, []);
    const handleAvatarCropModalError = useCallback(() => {
        setIsAvatarCropModalOpen(false);
        setAvatarSource(null);
        setCachedUploadedAvatar(null);
        setHasUnsavedChanges(false);
    }, []);
    return (
            shouldEnablePickerAvoiding={false}
            shouldEnableMaxHeight
            testID={ProfileAvatar.displayName}
            shouldPromptBeforeRemove={hasUnsavedChanges}
        >
            <HeaderWithBackButton
                title={translate('profilePage.profileAvatar')}