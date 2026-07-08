import type {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import type {OnyxEntry} from 'react-native-onyx';
import {useOnyx} from 'react-native-onyx';
    const [personalDetails] = useOnyx(ONYXKEYS.PERSONAL_DETAILS_LIST);
    const [session] = useOnyx(ONYXKEYS.SESSION);
    const [allPolicies] = useOnyx(ONYXKEYS.COLLECTION.POLICY);
    const [isOffline] = useOnyx(ONYXKEYS.NETWORK, {selector: (network) => network?.isOffline});

    const policy = usePolicy(policyID);
    const [isLoading, setIsLoading] = useState(false);
    const [isUnapproveModalVisible, setIsUnapproveModalVisible] = useState(false);
    const [isTurnOffModalVisible, setIsTurnOffModalVisible] = useState(false);

    // Refresh policy when coming back online to ensure approver data is up to date
    useEffect(() => {
        if (isOffline || !policyID) {
            return;
        }

        // When coming back online, refresh the policy to get the latest approver data
        Policy.openWorkspaceWorkflowsPage(policyID);
    }, [isOffline, policyID]);

    const toggleUnapproveModal = useCallback(() => {
        setIsUnapproveModalVisible((prev) => !prev);
    }, []);