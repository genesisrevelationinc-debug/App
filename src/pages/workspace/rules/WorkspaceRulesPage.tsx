import React, {useCallback, useMemo, useState} from 'react';
import {View, Text} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import type {ValueOf} from 'type-fest';
import ConfirmModal from '@components/ConfirmModal';
import * as Expensicons from '@components/Icon/Expensicons';
import MenuItem from '@components/MenuItem';
import MenuItemWithTopDescription from '@components/MenuItemWithTopDescription';
import TextWithTooltip from '@components/TextWithTooltip';
import ScreenWrapper from '@components/ScreenWrapper';
import ScrollView from '@components/ScrollView';
import Text from '@components/Text';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import Navigation from '@navigation/Navigation';
import * as StyleUtils from '@styles/utils';
import type {TranslationPaths} from '@src/languages/types';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';
import type {PolicyFeatureName} from '@src/types/onyx/Policy';
import type IconAsset from '@src/types/utils/IconAsset';
import {isEmptyObject} from '@src/utils';
import CONST from '@src/CONST';
import WorkspacePageWithSections from '../WorkspacePageWithSections';
import type {WorkspaceRulesMenuItem} from './types';
import {getRuleMenuItem, getRulesData, getRulesList, getRulesSections} from './utils';
                                                    description={translate('workspace.rules.agentRules.description', {
                                                        botName: ruleBot?.name ?? '',
                                                    })}
                                                    title={
                                                        <TextWithTooltip
                                                            text={ruleBot?.name ?? ''}
                                                            style={StyleUtils.getTextTruncationStyle()}
                                                            numberOfLines={1}
                                                        >
                                                            {ruleBot?.name ?? ''}
                                                        </TextWithTooltip>
                                                    }
                                                    onPress={() => {
                                                        Navigation.navigate(ROUTES.WORKSPACE_RULES_AGENT_RULE.getRoute(policyID, ruleID));
                                                    }}