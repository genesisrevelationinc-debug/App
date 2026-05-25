import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import type {StyleProp, ViewStyle} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import DatePicker from '@components/DatePicker';
import FormHelpMessage from '@components/FormHelpMessage';
import Modal from '@components/Modal';
import {setDraftValues} from '@userActions/FormActions';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import CONST from '@src/CONST';
import Accessibility from '@libs/Accessibility';
type DatePickerModalProps = {
    /** Whether the modal is visible */
    horizontal: CONST.MODAL.ANCHOR_ORIGIN_HORIZONTAL.RIGHT,
    vertical: CONST.MODAL.ANCHOR_ORIGIN_VERTICAL.TOP,
};

const popoverDimensions = {
    height: CONST.POPOVER_DATE_MIN_HEIGHT,
    width: CONST.POPOVER_DATE_WIDTH,
};

function DatePickerModal({
    value,
    defaultValue,
    inputID,
    minDate = setYear(new Date(), CONST.CALENDAR_PICKER.MIN_YEAR),
    maxDate = setYear(new Date(), CONST.CALENDAR_PICKER.MAX_YEAR),
    onInputChange,
    onTouched,
    shouldSaveDraft = false,
    formID,
    isVisible,
    onClose,
    anchorPosition,
    anchorAlignment = DEFAULT_ANCHOR_ORIGIN,
    onSelected,
    shouldCloseWhenBrowserNavigationChanged = false,
    shouldPositionFromTop = false,
    forwardedFSClass,
    shouldEnableMonthYearBackdropInNarrowPane = false,
}: DatePickerProps) {
    const [selectedDate, setSelectedDate] = useState(value ?? defaultValue ?? undefined);
    const anchorRef = useRef<View>(null);
    const styles = useThemeStyles();
    const styles = useThemeStyles();
    const {translate} = useLocalize();
    const datePickerRef = useRef<DatePicker>(null);
    const isFocused = useIsFocused();
    const [selectedDate, setSelectedDate] = useState<Date | string>(value ?? new Date());
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        if (shouldSaveDraft && formID) {
    useEffect(() => {
        setSelectedDate(value ?? new Date());
    }, [value]);

    useEffect(() => {
        if (isVisible && isFocused) {
            Accessibility.announceForAccessibility(translate('common.calendarOpened'));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible, isFocused]);
    const handleDateChange = useCallback(
        (date: Date) => {
    }, [formID, inputID, selectedDate, shouldSaveDraft, value]);

    const handleDateSelection = (newValue: string) => {
        onSelected?.(newValue);
        onTouched?.();
        onInputChange?.(newValue);
        setSelectedDate(newValue);
    };

    return (
        <PopoverWithMeasuredContent
            anchorRef={anchorRef}
            isVisible={isVisible}
            onClose={onClose}
            anchorPosition={anchorPosition}
            popoverDimensions={popoverDimensions}
            shouldCloseWhenBrowserNavigationChanged={shouldCloseWhenBrowserNavigationChanged}
            innerContainerStyle={isSmallScreenWidth ? styles.w100 : {width: CONST.POPOVER_DATE_WIDTH}}
            anchorAlignment={anchorAlignment}
            restoreFocusType={CONST.MODAL.RESTORE_FOCUS_TYPE.DELETE}
            shouldSwitchPositionIfOverflow
            shouldReturnFocus={false}
            shouldMeasureAnchorPositionFromTop={shouldPositionFromTop}
            shouldSkipRemeasurement
            forwardedFSClass={forwardedFSClass}
            shouldDisplayBelowModals
        >
            <CalendarPicker
                minDate={minDate}
                maxDate={maxDate}
                value={selectedDate}
                onSelected={handleDateSelection}
                shouldEnableMonthYearBackdropInNarrowPane={shouldEnableMonthYearBackdropInNarrowPane}
            />
        </PopoverWithMeasuredContent>
    );
}

export default DatePickerModal;
