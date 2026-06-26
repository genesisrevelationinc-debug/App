import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native';
import type {ValueOf} from 'type-fest';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
            <View style={[styles.flexRow, styles.alignItemsCenter, styles.gap2]}>
                <Icon src={Expensicons.Robot} />
                <View style={[styles.flex1, styles.justifyContentCenter]}>
                    <Text style={[styles.textStrong, styles.textNormal]} numberOfLines={1} ellipsizeMode="tail">
                        {agent?.name ?? translate('workspace.rules.agent.defaultAgent')}
                    </Text>
                </View>
                <Icon src={Expensicons.ArrowRight} fill={theme.icon} />
            </View>