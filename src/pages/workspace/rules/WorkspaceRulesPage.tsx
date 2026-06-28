import type {TextStyle} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {View} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import useLocalize from '@hooks/useLocalize';
import useNetwork from '@hooks/useNetwork';
import useThemeStyles from '@hooks/useThemeStyles';
import useStyleUtils from '@hooks/useStyleUtils';
import * as PolicyUtils from '@libs/PolicyUtils';
import * as ReportUtils from '@libs/ReportUtils';
import Navigation from '@navigation/Navigation';
    const styles = useThemeStyles();
    const {translate} = useLocalize();
    const {isOffline} = useNetwork();
    const {combineStyles} = useStyleUtils();
    const [isDeleteRuleModalVisible, setIsDeleteRuleModalVisible] = useState(false);
    const [isDisableRuleModalVisible, setIsDisableRuleModalVisible] = useState(false);
    const [isDuplicateNameModalVisible, setIsDuplicateNameModalVisible] = useState(false);
                                                    <Text
                                                        numberOfLines={1}
                                                        ellipsizeMode="tail"
                                                        style={combineStyles<TextStyle>([
                                                            styles.textStrong,
                                                            styles.flex1,
                                                            styles.mr2,
                                                        ])}
                                                    >
                                                        {item.name}
                                                    </Text>