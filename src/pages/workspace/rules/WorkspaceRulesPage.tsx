import React, {useCallback, useMemo, useState} from 'react';
import {View, Text} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import type {ValueOf} from 'type-fest';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
const getRuleKey = (rule: ValueOf<typeof CONST.POLICY.RULES>): SettingsOptionKey => `${rule}Rule`;

function WorkspaceRulesPage({route}: WorkspaceRulesPageProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();
    const {shouldUseNarrowLayout} = useResponsiveLayout();
    const [isLoading, setIsLoading] = useState(false);
    const [policy] = useOnyx(`${ONYXKEYS.COLLECTION.POLICY}${route.params.policyID}`);
    const [personalDetails scalings] = useOnyx(ONYXKEYS.PERSONAL_DETAILS_LIST);
    const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);

    const policyRules = policy?.rules;
    const hasEnabledRule = Object.values(CONST.POLICY.RULES).some((rule) => policyRules?.[rule]);
                        description={translate('workspace.rules.agentRules.description')}
                        onPress={() => Navigation.navigate(ROUTES.WORKSPACE_AGENT_RULES.getRoute(route.params.policyID))}
                        shouldShowRightIcon
                        brickRoadIndicator={
                            hasAgentRuleErrors ? CONST.BRICK_ROAD_INDICATOR_STATUS.ERROR : undefined
                        }
                    />
                </Section>
            )}
                    <MenuItem
                        title={translate('workspace.rules.agentRules.agentRule')}
                        description={agentRuleName}
                        descriptionNumberOfLines={2}
                        descriptionStyle={styles.workspaceRulesAgentRuleDescription}
                        rightComponent={
                            <Text style={styles.workspaceRulesAgentRuleDescriptionText}>{agentRuleName}</Text>
                        }
                    />
                </Section>
            )}