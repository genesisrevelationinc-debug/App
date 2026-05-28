import type {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import type {OnyxEntry} from 'react-native-onyx';
import {withOnyx} from 'react-native-onyx';
import Button from '@components/Button';
import type SCREENS from '@src/SCREENS';
import type {BankAccountList, CardList, FundList, LoginList, WalletTransfer} from '@src/types/onyx';
import {isEmptyObject} from '@src/types/utils/EmptyObject';
import * as PolicyUtils from '@src/libs/PolicyUtils';

type BaseWalletPageOnyxProps = {
    /** Wallet transfer propTypes for currently active transfer */

    /** The user's wallet terms */
    walletTerms: OnyxEntry<WalletTerms>;

    /** The user's policy members */
    policyMembers: OnyxEntry<Record<string, PolicyMembers>>;
};

type BaseWalletPageProps = BaseWalletPageOnyxProps &
    userWallet,
    walletTransfer,
    walletTerms,
    policyMembers,
}: BaseWalletPageProps) {
    const {translate} = useLocalize();
    const {isOffline} = useNetwork();
    const [isNoDelegateAccessMenuVisible, setIsNoDelegateAccessMenuVisible] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const [policies] = useOnyx(ONYXKEYS.COLLECTION.POLICY);

    const hasWorkspaceMembers = useMemo(() => {
        if (!policyMembers || !policies) {
            return false;
        }
        return Object.keys(policies).some((policyID) => {
            const policy = policies[policyID];
            if (!policy || policy.type !== CONST.POLICY.TYPE.TEAM) {
                return false;
            }
            const members = policyMembers[policyID]?.members ?? {};
            return Object.keys(members).length > 1; // More than just the current user
        });
    }, [policyMembers, policies]);

    const hasBankAccount = !isEmptyObject(bankAccountList) || !isEmptyObject(fundList);

    const getSelectedBankAccountID = (): number => {
                                icon={Expensicons.Transfer}
                                onPress={() => setIsMenuVisible(false)}
                            />
                            {hasWorkspaceMembers && <MenuItem
                                title={translate('common.share')}
                                icon={Expensicons.Share}
                                onPress={() => {
                                    setIsMenuVisible(false);
                                    Navigation.navigate(ROUTES.SETTINGS_WALLET_TRANSFER_BALANCE);
                                }}
                            />}
                        </PopoverMenu>
                    )}
                    {isNoDelegateAccessMenuVisible && (
        key: ONYXKEYS.WALLET_TERMS,
        initWithStoredValues: false,
    },
    policyMembers: {
        key: ONYXKEYS.COLLECTION.POLICY_MEMBERS,
    },
})(BaseWalletPage);