import type {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import type {OnyxEntry} from 'react-native-onyx';
import {useOnyx} from 'react-native-onyx';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import * as Expensicons from '@components/Icon/Expensicons';
import MenuItem from '@components/MenuItem';
import MenuItemWithTopDescription from '@components/MenuItemWithTopDescription';
import ScreenWrapper from '@components/ScreenWrapper';
import ScrollView from '@components/ScrollView';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import * as PolicyActions from '@libs/actions/Policy/Policy';
import Navigation from '@libs/Navigation/Navigation';
import type {SettingsNavigatorParamList} from '@libs/Navigation/types';
import * as PolicyUtils from '@libs/PolicyUtils';
import type {Policy as PolicyType} from '@src/types/onyx';
import type {Rule} from '@src/types/onyx/Policy';
import type {WithPolicyAndFullscreenLoadingProps} from '@pages/workspace/withPolicyAndFullscreenLoading';
import type {WithPolicyProps} from '@pages/workspace/withPolicy';
import withPolicyAndFullscreenLoading from '@pages/workspace/withPolicyAndFullscreenLoading';
import type SCREENS from '@src/SCREENS';
import type {TranslationPaths} from '@src/languages/types';
import WorkspaceRulesMenuSection from './WorkspaceRulesMenuSection';
import type {RuleListItem} from './types';
import {getRuleTranslationKey} from './utils';
import CONST from '@src/CONST';

type WorkspaceRulesPageProps = WithPolicyAndFullscreenLoadingProps & StackScreenProps<SettingsNavigatorParamList, typeof SCREENS.WORKSPACE.RULES>;

                        description={translate('workspace.rules.agentRules.description')}
                        onPress={() => {}}
                        shouldShowRightIcon
                        numberOfLinesTitle={1}
                    />
                    {agentRules.map((rule) => (
                        <MenuItem
                            onPress={() => Navigation.navigate(ROUTES.WORKSPACE_RULES_AGENT_RULE.getRoute(policyID, rule.id))}
                            shouldShowRightIcon
                            wrapperStyle={styles.sectionMenuItem}
                            titleStyle={styles.textEllipsis}
                        />
                    ))}
                </WorkspaceRulesMenuSection>