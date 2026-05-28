import type {RouteProp} from '@react-navigation/native';
import {useRoute, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {ActivityIndicator, InteractionManager, View} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import * as Expensicons from '@components/Icon/Expensicons';
import MenuItem from '@components/MenuItem';
import MenuItemWithTopDescription from '@components/MenuItemWithTopDescription';
import ScreenWrapper from '@components/ScreenWrapper';
import ScrollView from '@components/ScrollView';
import useLocalize from '@hooks/useLocalize';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import * as CardUtils from '@libs/CardUtils';
import * as PolicyUtils from '@libs/PolicyUtils';
import * as CurrencyUtils from '@libs/CurrencyUtils';
import * as DeviceUtils from '@libs/DeviceUtils';
import getBankAccountRoute from '@libs/getBankAccountRoute';
import * as PaymentUtils from '@libs/PaymentUtils';
import * as PersonalDetailsUtils from '@libs/PersonalDetailsUtils';
import * as UserUtils from '@libs/UserUtils';
import type {PlatformStackNavigationProp} from '@navigation/PlatformStackNavigation';
import type {SettingsNavigatorParamList} from '@navigation/types';
import type {PaymentMethod} from '@pages/settings/Wallet/PaymentMethodList';
import PaymentMethodList from '@pages/settings/Wallet/PaymentMethodList';
import * as BankAccounts from '@userActions/BankAccounts';
import * as PaymentMethods from '@userActions/PaymentMethods';
import * as Wallet from '@userActions/Wallet';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';
import type SCREENS from '@src/SCREENS';
import type {AnchorAlignment, Domain} from '../types';
import WalletEmptyState from './WalletEmptyState';


type WalletPageProps = {
    /** Listen for window resize event on web layout at mobile breakpoint */
    shouldListenForResize?: boolean;
    const theme = useTheme();
    const styles = useThemeStyles();
    const {translate} = useLocalize();
    const navigation = useNavigation<PlatformStackNavigationProp<SettingsNavigatorParamList>>();
    const [bankAccountList] = useOnyx(ONYXKEYS.BANK_ACCOUNT_LIST);
    const [cardList] = useOnyx(ONYXKEYS.CARD_LIST);
    const [cardListLoadStatus] = useOnyx(ONYXKEYS.CARD_LIST_LOAD_STATUS);
    const [isLoadingPaymentMethods] = useOnyx(ONYXKEYS.IS_LOADING_PAYMENT_METHODS, {initWithStoredValues: false});
    const [userWallet] = useOnyx(ONYXKEYS.USER_WALLET);
    const [walletTerms] = useOnyx(ONYXKEYS.WALLET_TERMS);
    const [policies] = useOnyx(ONYXKEYS.COLLECTION.POLICY);
    const [isUserDataImported] = useOnyx(ONYXKEYS.IS_USER_DATA_IMPORTED);
    const [isActingAsDelegate] = useOnyx(ONYXKEYS.ACCOUNT, {selector: (account) => account?.isActingAsDelegate});
    const [privatePersonalDetails] = useOnyx(ONYXKEYS.PRIVATE_PERSONAL_DETAILS);
        [shouldShowLoadingSpinner, theme, translate],
    );

    const getBankAccountMenuItems = useCallback((bankAccountID: number, bankAccount: BankAccount) => {
        const policyID = bankAccount.policyID;
        const policy = policyID ? policies?.[policyID] : undefined;
        const hasWorkspaceMembers = policy ? PolicyUtils.getPolicyEmployeeList(policy).length > 0 : false;
        
        return hasWorkspaceMembers;
    }, [policies]);

    const getPaymentMethodButtonWidth = useCallback(
        (isPaymentMethodActive: boolean) => (isSmallScreenWidth || !isPaymentMethodActive ? styles.w100 : styles.tonativew100),
        [isSmallScreenWidth, styles],
                                    bankAccountList={bankAccountList}
                                    shouldShowEmptyListState={shouldShowEmptyListState}
                                    shouldShowLoadingSpinner={shouldShowLoadingSpinner}
                                    getBankAccountMenuItems={getBankAccountMenuItems}
                                />
                            </View>
                        </KYCWall>