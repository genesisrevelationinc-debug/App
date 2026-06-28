import React, {useCallback, useMemo, useState} from 'react';
import {View} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import type {ValueOf} from 'type-fest';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import type {PolicyFeatureName} from '@src/types/onyx/Policy';
import type {Errors} from '@src/types/onyx/OnyxCommon';
import {isEmptyObject} from '@src/types/utils/EmptyObject';
import WorkspacePageWithSections from '../WorkspacePageWithSections';
import type {WorkspaceRulesPageProps} from './types';

                        <View style={[styles.flex1, styles.flexRow, styles.alignItemsCenter, styles.gap2, styles.mr2]}>
                            <Icon src={getRuleIcon(item.type)} height={20} width={20} />
                            <View style={styles.flex1}>
                                <Text numberOfLines={1} style={styles.textStrong}>{item.name}</Text>
                            </View>
                        </View>
                        <Icon src={Expensicons.ArrowRight} height={20} width={20} />