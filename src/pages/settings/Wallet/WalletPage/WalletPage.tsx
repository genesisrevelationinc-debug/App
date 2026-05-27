import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import type {OnyxEntry} from 'react-native-onyx';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import * as Expensicons from '@components/Icon/Expensicons';
import useNetwork from '@hooks/useNetwork';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import * as PolicyUtils from '@libs/PolicyUtils';
import * as CardUtils from '@libs/CardUtils';
import * as CurrencyUtils from '@libs/CurrencyUtils';
import Navigation from '@libs/Navigation/Navigation';
import * as PersonalDetailsUtils from '@libs/PersonalDetailsUtils';
import * as UserUtils from '@libs/UserUtils';
import Wallet from '@libs/actions/Wallet';
import type {TranslationPaths} from '@src/languages/types';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';
import type {Route} from '@src/ROUTES';
    const [shouldShowLoadingSpinner, setShouldShowLoadingSpinner] = useState(false);
    const [paymentMethodPressed, setPaymentMethodPressed] = useState<PaymentMethod | undefined>();
    const [contentRef, setContentRef] = useState<View | null>(null);
    const [policies] = useOnyx(ONYXKEYS.COLLECTION.POLICY, {
        selector: PolicyUtils.getActivePolicies,
    });

    const isActingAsDelegate = !!account?.delegatedAccess?.delegate;

        [translate, theme, isOffline, isActingAsDelegate, paymentMethodPressed, account?.delegatedAccess?.delegate],
    );

    const hasWorkspaceMembers = useMemo(() => {
        const activePolicies = Object.values(policies ?? {}).filter(Boolean);
        return activePolicies.some((policy) => policy.employeeList && Object.keys(policy.employeeList).length > 1);
    }, [policies]);

    const makeDefaultPaymentMethod = useCallback(
        (defaultBankAccountID: number, defaultFundID: number) => {
            if (defaultBankAccountID) {
                                                    shouldShowMakeDefaultButton={!isDefault && !isEmptyObject(bankAccountList) && Object.keys(bankAccountList).length > 1}
                                                    shouldShowDeleteButton={!isEmptyObject(bankAccountList) && Object.keys(bankAccountList).length > 1}
                                                    shouldShowDefaultLabel={isDefault}
                                                    shouldShowShareButton={isBusinessAccount && hasWorkspaceMembers}
                                                    iconFill={theme.icon}
                                                    onPress={() => {
                                                        if (isEmptyObject(bankAccountList)) {