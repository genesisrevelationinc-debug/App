import React, {useCallback, useMemo, useRef, useState} from 'react';
import {InteractionManager, View, StyleSheet} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import type {OnyxEntry} from 'react-native-onyx';
import type {ValueOf} from 'type-fest';
import useThemeStyles from '@hooks/useThemeStyles';
import {clearWorkspaceFlow} from '@libs/actions/Policy/Policy';
import {clearErrors} from '@libs/actions/Policy/Policy';
import {getPolicyOwnerDisplayName} from '@libs/PolicyUtils';
import {isPolicyAdmin as isPolicyAdminPolicyUtils, getPolicyName, shouldShowPolicy as shouldShowPolicyUtils, isPolicyOwner as isPolicyOwnerUtils} from '@libs/PolicyUtils';
import {getBrickRoadForPolicy} from '@libs/PolicyUtils';
import {isArchivedReport, isChatThread, isMoneyRequestReport as isMoneyRequestReportUtils, isThreadFirstChat} from '@libs/ReportUtils';
import type {JoinWorkspaceResolution} from '@src/types/onyx/Policy';
import type {Errors, PendingAction} from '@src/types/onyx/OnyxCommon';
import {isEmptyObject} from '@src/types/utils';
import Text from '@components/Text';

type WorkspacesListRowProps = {
    /** Item policy id */
    const [isJoinRequestPending] = useOnyx(`${ONYXKEYS.COLLECTION.POLICY_JOIN_REQUEST_PENDING}${policyID}`, {initialValue: false});
    const isJoinRequestPendingRef = useRef(isJoinRequestPending);
    const [isPolicyAdmin] = useOnyx(`${ONYXKEYS.COLLECTION.POLICY}${policyID}`, {selector: (p) => p?.role === 'admin'});
    const [policy] = useOnyx(`${ONYXKEYS.COLLECTION.POLICY}${policyID}`);

    const isJoinRequestPendingValue = isJoinRequestPendingRef.current;

        return null;
    }, [isSelected, isHovered, isSmallScreenWidth, shouldShowSelectButtonAsButton, shouldShowSelectButtonAsCheckbox, shouldShowSelectButtonAsToggle, styles, theme, translate]);

    const ownerDisplayName = getPolicyOwnerDisplayName(policy);

    return (
        <View
            ref={ref}
                            />
                        )}
                    </View>
                    {!!ownerDisplayName && (
                        <Text style={[styles.textMicroSupporting, styles.mt1]}>
                            {ownerDisplayName}
                        </Text>
                    )}
                </View>
            </PressableWithFeedback>
            {!!selectButton && <View style={[styles.ml3, isSmallScreenWidth && styles.w100]}>{selectButton}</View>}