import React, {useCallback, useMemo, useState} from 'react';
import {View, Text} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import type {ValueOf} from 'type-fest';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import type {PendingAction} from '@src/types/onyx/OnyxCommon';
import type {Approver, ApproverObject}ptor} from '@src/types/onyx/Policy';
import type {ApproverRule, CategoryRule, TagRule} from '@src/types/onyx/Rules';
import TextWithEllipsis from '@components/TextWithEllipsis';
import WorkspaceRulesMenuItem from './WorkspaceRulesMenuItem';

type WorkspaceRulesSection = {
                        <MenuItem
                            title={translate('workspace.rules.agentRules.agentRule', {name: agentRule.name})}
                            onPress={() => Navigation.navigate(ROUTES.WORKSPACE_RULES_AGENT_RULE.getRoute(policyID, agentRule.id))}
                            description={
                                <TextWithEllipsis text={agentRule.bot} style={styles.textMicroSupporting}>
                                    {agentRule.bot}
                                </TextWithEllipsis>
                            }
                            shouldShowRightIcon
                        />
                    ))}