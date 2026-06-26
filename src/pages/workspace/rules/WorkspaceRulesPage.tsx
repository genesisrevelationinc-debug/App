import React, {useCallback, useMemo, useState} from 'react';
import {View, Text} from 'react-native';
import type {ValueOf} from 'type-fest';
import {useOnyx} from 'react-native-onyx';
import type {OnyxEntry} from 'react-native-onyx';
import type {WorkspaceRulesPageProps} from './types';
import {getRuleDescription, getRuleName, getRuleType} from './utils';
import type {RuleType} from './types';
import Text from '@components/Text';

function WorkspaceRulesPage({route}: WorkspaceRulesPageProps) {
    const styles = useThemeStyles();
                                    <View style={[styles.flex1, styles.justifyContentCenter]}>
                                        <View style={[styles.flexRow, styles.alignItemsCenter, styles.gap2]}>
                                            <Icon src={getRuleIcon(rule)} />
                                            <Text 
                                                numberOfLines={1} 
                                                style={[styles.textStrong, styles.flex1]}
                                            >
                                                {getRuleName(rule)}
                                            </Text>
                                        </View>
                                        <Text style={[styles.textLabel, styles.mt1]}>{getRuleDescription(rule)}</Text>
                                    </View>