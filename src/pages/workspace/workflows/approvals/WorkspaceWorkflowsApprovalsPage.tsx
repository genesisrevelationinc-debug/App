import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import type {OnyxEntry} from 'react-native-onyx';
import ConfirmModal from '@components/ConfirmModal';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import MenuItemWithTopDescription from '@components/MenuItemWithTopDescription';
import ScreenWrapper from '@components/ScreenWrapper';
import useLocalize from '@hooks/useLocalize';
import useNetwork from '@hooks/useNetwork';
import useThemeStyles from '@hooks/useThemeStyles';
import Navigation from '@libs/Navigation/Navigation';
import ONYXKEYS from '@src/ONYXKEYS';
import type {Policy, PolicyApprover} from '@src/types/onyx';
import type {Approver} from '@src/types/onyx/ApprovalWorkflow';

function WorkspaceWorkflowsApprovalsPage() {
    const styles = useThemeStyles();
    const {translate} = useLocalize();
    const {isOffline} = useNetwork();
    const [policy] = useOnyx(ONYXKEYS.COLLECTION.POLICY);
    const [approvalWorkflow] = useOnyx(ONYXKEYS.COLLECTION.APPROVAL_WORKFLOW);
    const [approvers] = useOnyx(ONYXKEYS.COLLECTION.APPROVER);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedApprover, setSelectedApprover] = useState<Approver | null>(null);

    const approversList = useMemo(() => {
        if (!approvalWorkflow?.approvers) {
            return [];
        }
        return approvalWorkflow.approvers.map((approverEmail) => {
            const approverData = approvers?.[approverEmail];
            return {
                email: approverEmail,
                displayName: approverData?.displayName ?? approverEmail,
                avatar: approverData?.avatar,
            };
        });
    }, [approvalWorkflow?.approvers, approvers]);

    const navigateToAddApprover = useCallback(() => {
        Navigation.navigate('workspace/workflows/approvals/add');
    }, []);

    const openDeleteModal = useCallback((approver: Approver) => {
        setSelectedApprover(approver);
        setIsDeleteModalVisible(true);
    }, []);

    const closeDeleteModal = useCallback(() => {
        setIsDeleteModalVisible(false);
        setSelectedApprover(null);
    }, []);

    const deleteApprover = useCallback(() => {
        if (!selectedApprover) {
            return;
        }
        // Delete approver logic here
        closeDeleteModal();
    }, [selectedApprover, closeDeleteModal]);

    return (
        <ScreenWrapper
            includeSafeAreaPaddingBottom={false}
            testID={WorkspaceWorkflowsApprovalsPage.displayName}
        >
            <HeaderWithBackButton
                title={translate('workflowsPage.approvals')}
                onBackButtonPress={Navigation.goBack}
            />
            <View style={styles.flex1}>
                {approversList.map((approver) => (
                    <MenuItemWithTopDescription
                        key={approver.email}
                        title={approver.displayName}
                        description={translate('workflowsPage.approver')}
                        onPress={() => openDeleteModal(approver)}
                        shouldShowRightIcon
                    />
                ))}
                <MenuItemWithTopDescription
                    title={translate('workflowsPage.addApprover')}
                    onPress={navigateToAddApprover}
                    shouldShowRightIcon
                />
            </View>
            <ConfirmModal
                isVisible={isDeleteModalVisible}
                onConfirm={deleteApprover}
                onCancel={closeDeleteModal}
                title={translate('workflowsPage.removeApprover')}
                prompt={translate('workflowsPage.removeApproverPrompt')}
                confirmText={translate('common.remove')}
                cancelText={translate('common.cancel')}
            />
        </ScreenWrapper>
    );
}

WorkspaceWorkflowsApprovalsPage.displayName = 'WorkspaceWorkflowsApprovalsPage';
export default WorkspaceWorkflowsApprovalsPage;