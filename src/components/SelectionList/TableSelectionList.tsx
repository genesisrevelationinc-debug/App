import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import type {FlatList, ViewToken} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {Edge} from 'react-native-safe-area-context';
import type {ValueOf} from 'type-fest';
import Checkbox from '@components/Checkbox';
    const flattenedData = useMemo(() => flattenSections(sections, sectionByIndex), [sections, sectionByIndex]);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [isInitialSection, setIsInitialSection] = useState(true);
    const insets = useSafeAreaInsets();

    const [selectionMode] = useOnyx(ONYXKEYS.MOBILE_SELECTION_MODE);
    const isMobileSelectionModeActive = !!selectionMode?.isEnabled;
            <View style={[styles.flex1, styles.flexColumn, styles.gap2]}>
                <View style={[styles.flexRow, styles.gap2, styles.justifyContentBetween, styles.alignItemsCenter, styles.ph5, styles.pv2]}>
                    <View style={[styles.flexRow, styles.gap2, styles.alignItemsCenter, styles.flex1]}>
                        {!insets.top && <Checkbox
                            accessibilityLabel={translate('common.select')}
                            disabled={flattenedData.length === 0}
                            onPress={toggleAllItems}
                            onLongPressRow={undefined}
                            isMobileSelectionModeActive={isMobileSelectionModeActive}
                            isInitialSection={isInitialSection}
                        />}
                        <Text style={[styles.textStrong, styles.textLabelSupporting]}>{translate('common.name')}</Text>
                    </View>
                    <Text style={[styles.textStrong, styles.textLabelSupporting, styles.flex1, styles.textAlignRight]}>{translate('common.action')}</Text>