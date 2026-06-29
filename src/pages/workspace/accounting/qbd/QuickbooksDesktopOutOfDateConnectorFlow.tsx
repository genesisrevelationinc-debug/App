import React, {useEffect} from 'react';
import {useOnyx} from 'react-native-onyx';
import FullScreenLoadingIndicator from '@components/FullscreenLoadingIndicator';
import usePrevious from '@hooks/usePrevious';
import Navigation from '@libs/Navigation/Navigation';
import * as QuickbooksDesktop from '@userActions/QuickbooksDesktop';
import ONYXKEYS from '@src/ONYXKEYS';
    const {policyID} = route.params;
    const [policy] = useOnyx(`${ONYXKEYS.COLLECTION.POLICY}${policyID}`);
    const [connectionSyncProgress] = useOnyx(`${ONYXKEYS.COLLECTION.POLICY_CONNECTION_SYNC_PROGRESS}${policyID}`);
    const previousConnectionSyncProgress = usePrevious(connectionSyncProgress);

    useEffect(() => {
        if (!policy) {
        }

        // If the connection is already in progress, we don't want to start it again
        if (previousConnectionSyncProgress?.stageInProgress && previousConnectionSyncProgress.stageInProgress !== 'start') {
            return;
        }

        }

        QuickbooksDesktop.updateQuickbooksDesktopConnectionPolicyID(policyID);
    }, [previousConnectionSyncProgress, policy, policyID]);

    if (!policy) {
        return <FullScreenLoadingIndicator />;