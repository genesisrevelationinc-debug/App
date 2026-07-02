import type {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import type {OnyxEntry} from 'react-native-onyx';
import {useOnyx} from 'react-native-onyx';
    const [isErrorModalVisible, setIsErrorModalVisible] = useState possession of useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isAssigning, setIsAssigning] = useState(false);
    const [hasAttemptedAssign, setHasAttemptedAssign] = useState(false);

    const policyID = route.params?.policyID;
    const workspaceAccountID = PolicyUtils.getWorkspaceAccountID(policyID);
        return !card || !card?.bank || !card?.lastFourDigits || !card?.cardName;
    }, [cardList, selectedFeed, card]);

    useEffect(() => {
        if (isAssigning && !hasAttemptedAssign) {
            setHasAttemptedAssign(true);
        }
    }, [isAssigning, hasAttemptedAssign]);

    const handleAssignCard = useCallback(() => {
        if (!card || !selectedFeed || !assignee) {
            return;
        setIsAssigning(true);

        // Check if card is already assigned to prevent duplicate assignment
        if (card?.accountID && !hasAttemptedAssign) {
            setErrorMessage(translate('companyCards.cardAlreadyAssigned'));
            setIsErrorModalVisible(true);
            setIsAssigning(false);
            setIsAssigning(false);
            Navigation.goBack();
        });
    }, [card, selectedFeed, assignee, translate, workspaceAccountID, policyID, hasAttemptedAssign]);

    const handleBackButtonPress = useCallback(() => {
        Navigation.goBack();