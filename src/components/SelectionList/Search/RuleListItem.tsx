import React from 'react';
import {View, Text} from 'react-native';
import type {RuleListItemProps} from './types';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import useThemeStyles from '@hooks/useThemeStyles';
import type {Rule} from '@src/types/onyx';
import {getRuleDescription, getRuleName, getRuleType} from '@pages/workspace/rules/utils';
import Text from '@components/Text';

function RuleListItem({
    item,
                <View style={[styles.flex1, styles.justifyContentCenter]}>
                    <View style={[styles.flexRow, styles.alignItemsCenter, styles.gap2]}>
                        <Icon src={getRuleIcon(item)} />
                        <Text 
                            numberOfLines={1} 
                            style={[styles.textStrong, styles.flex1]}
                        >
                            {getRuleName(item)}
                        </Text>
                    </View>
                    <Text style={[styles.textLabel, styles.mt1]}>{getRuleDescription(item)}</Text>
                </View>