import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import type {OnyxEntry} from 'react-native-onyx';
import {useOnyx} from 'react-native-onyx';
    const [receiptFile, setReceiptFile] = useState<Receipt | undefined>();
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [didSplitErrorAppear, setDidSplitErrorAppear] = useState(false);
    const [isMerchantModalVisible, setIsMerchantModalVisible] = useState(false);

    const isSplitBill = iouType === CONST.IOU.TYPE.SPLIT;
    const isTrackExpense = iouType === CONST.IOU.TYPE.TRACK;
        return !isValidSplit || (isMerchantRequired && !iouMerchant);
    }, [isSplitBill, isValidSplit, isMerchantRequired, iouMerchant]);

    // Re-validate split when returning from merchant modal
    useEffect(() => {
        if (!isMerchantModalVisible) {
            return;
        }
        setIsMerchantModalVisible(false);
        if (isSplitBill && !isValidSplit) {
            setDidSplitErrorAppear(true);
            setFormError('iou.error.invalidSplit');
        }
    }, [isMerchantModalVisible, isSplitBill, isValidSplit]);

    const shouldShowReadOnlySplits = useMemo(() => {
        if (!isSplitBill) {
            return false;
                                    Navigation.navigate(ROUTES.MONEY_REQUEST_STEP_MERCHANT.getRoute(action, iouType, transactionID, reportID, {backTo: currentRoute}));
                                    return;
                                }
                                setIsMerchantModalVisible(true);
                                Navigation.navigate(ROUTES.MONEY_REQUEST_STEP_MERCHANT.getRoute(action, iouType, transactionID, reportID, {backTo: currentRoute}));
                            }}
                            style={[styles.moneyRequestMenuItem, !isMerchantEmpty && styles.mt2]}