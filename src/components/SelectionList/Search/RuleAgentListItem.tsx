import React from 'react';
import {Text, View} from 'react-native';
import type {RuleAgentListItemProps} from '@components/SelectionList/types';
import BaseListItem from '@components/SelectionList/BaseListItem';
import TextWithTooltip from '@components/TextWithTooltip';
            onFocus={onFocus}
        >
            <View style={[styles.flex1, styles.flexRow, styles.alignItemsCenter, styles.justifyContentBetween, styles.userSelectText]}>
                <Text style={styles.flex1} numberOfLines={1}>
                    <TextWithTooltip text={item.text} shouldShowTooltip={showTooltip} />
                </Text>
            </View>
        </BaseListItem>
    );