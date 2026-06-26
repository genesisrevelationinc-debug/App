import React, {useCallback, useMemo, useState} from 'react';
import {View, Text} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import type {ValueOf} from 'type-fest';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import type {Rule, RuleType} from './types';
import {isRuleEnabled} from './utils';
import type {RuleCategory, RuleCondition} from './types';
import TextWithEllipsis from '@components/TextWithEllipsis';

type WorkspaceRulesPageProps = StackScreenProps<SettingsNavigatorParamList, typeof SCREENS.WORKSPACE.RULES>;

                        <MenuItem
                            title={translate('workspace.rules.agentRules.title')}
                            description={translate('workspace.rules.agentRules.description')}
                            label={
                                <TextWithEllipsis style={styles.textLabel} text={ruleBotName} />
                            }
                            // eslint-disable-next-line react/no-children-prop
                            children={undefined}
                            onPress={navigateToAgentRules}
                            shouldShowRightIcon
                        />