import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import {useIsFocused} from '@react-navigation/native';
import type {ValueOf} from 'type-fest';
import ApproverSelector from '@components/ApproverSelector';
import Button from '@components/Button';
    const [isOffline] = useOnyx(ONYXKEYS.NETWORK, {selector: (network) => network?.isOffline ?? false});
    const [session] = useOnyx(ONYXKEYS.SESSION);
    const [approvalWorkflow] = useOnyx(`${ONYXKEYS.COLLECTION.WORKSPACE_APPROVAL_WORKFLOW}${route.params.workspaceID}`);
    const isFocused = useIsFocused();

    const [selectedApprover, setSelectedApprover] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    // Refetch approver data when the page comes into focus to handle offline updates
    useEffect(() => {
        if (isFocused && approvalWorkflow) {
            setSelectedApprover(approvalWorkflow.approver);
        }
    }, [isFocused, approvalWorkflow]);

    useEffect(() => {
        if (approvalWorkflow?.approver) {
            setSelectedApprover(approvalWorkflow.approver);