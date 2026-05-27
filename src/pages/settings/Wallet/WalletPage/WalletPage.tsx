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
import type {WalletPageOnyxProps, WalletPageProps} from '@pages/settings/Wallet/WalletPage/types';
import * as PaymentMethods from '@userActions/PaymentMethods';
import {openPersonalBankAccountSetupView, openWorkspaceMembersPage} from '@userActions/Report';
import * as PaymentMethods from '@userActions/PaymentMethods';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';
import type {BankAccountList, CardList, Card as CardType, UserWallet} from '@src/types/onyx';
import type {PaymentMethod} from '@src/types/onyx/PaymentMethods';
import {isEmptyObject} from '@src/types/utils/EmptyObject';
import type {Policy} from '@src/types/onyx';
import AddBankAccount from './AddBankAccount';
import AddPaymentMethodMenu from './AddPaymentMethodMenu';
import BaseWalletPage from './BaseWalletPage';
    const [shouldShowEmptyListError, setShouldShowEmptyListError] = useState(false);
    const [isUserWalletEmpty, setIsUserWalletEmpty] = useState(false);
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [policies] = useOnyx(ONYXKEYS.COLLECTION.POLICY);
    const [allPolicyMembers] = useOnyx(ONYXKEYS.COLLECTION.POLICY_MEMBERS);
    const [allPersonalDetails] = useOnyx(ONYXKEYS.PERSONAL_DETAILS);

    const [isWalletEnabled, setIsWalletEnabled] = useState(false);

        return paymentMethod;
    }, [bankAccountList, cardList, fundList, isLoadingCurrency, isUserWalletEmpty, translate, theme, isOffline]);

    const hasWorkspaceMembers = useMemo(() => {
        if (!policies) {
            return false;
        }
        const activePolicies = Object.values(policies).filter((policy): policy is Policy => !!policy && !policy.pendingAction);
        if (activePolicies.length === 0) {
            return false;
        }
        return activePolicies.some((policy) => {
            const policyMembers = allPolicyMembers?.[`${ONYXKEYS.COLLECTION.POLICY_MEMBERS}${policy.id}`];
            if (!policyMembers) {
                return false;
            }
            const memberCount = Object.keys(policyMembers).filter((key) => key !== 'errors' && key !== 'pendingAction').length;
            return memberCount > 1;
        });
    }, [policies, allPolicyMembers]);

    const filteredPaymentMethods = useMemo(() => {
        if (shouldShowEmptyListError) {
            return [];
                                                    shouldShowMenuIcon
                                                    popoverMenuRef={paymentMethodItemRef}
                                                    onPress={(item) => onPressPaymentMethod(item)}
                                                    shouldShowShareButton={isBusinessAccount && hasWorkspaceMembers}
                                                    shouldShowMakeDefaultButton={!isBusinessAccount}
                                                    style={[styles.mb4]}
                                                />