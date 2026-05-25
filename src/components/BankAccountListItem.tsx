import React from 'react';
import {View} from 'react-native';
import Text from './Text';
import Icon from './Icon';
import * as Expensicons from './Icon/Expensicons';
import themeColors from '../styles/themes/default';
import CONST from '../CONST';
import useLocalize from '../hooks/useLocalize';

type BankAccountListItemProps = {
    bankAccount: {
        bankAccountID: number;
        accountNumber?: string;
        bankName?: string;
        state?: string;
    };
    onPress?: () => void;
};

function BankAccountListItem({bankAccount, onPress}: BankAccountListItemProps) {
    const {translate} = useLocalize();
    
    const getStatusLabel = (state: string) => {
        switch (state) {
            case CONST.BANK_ACCOUNT.STATE.VERIFIED:
                return translate('bankAccount.status.active');
            case CONST.BANK_ACCOUNT.STATE.SETUP:
                return translate('bankAccount.status.incomplete');
            case CONST.BANK_ACCOUNT.STATE.PENDING:
                return translate('bankAccount.status.pending');
            case CONST.BANK_ACCOUNT.STATE.VERIFYING:
                return translate('bankAccount.status.verifying');
            case CONST.BANK_ACCOUNT.STATE.LOCKED:
                return translate('bankAccount.status.locked');
            default:
                return state;
        }
    };
    
    const getDescription = (state: string) => {
        switch (state) {
            case CONST.BANK_ACCOUNT.STATE.SETUP:
                return translate('bankAccount.description.incomplete');
            case CONST.BANK_ACCOUNT.STATE.PENDING:
                return translate('bankAccount.description.pending');
            case CONST.BANK_ACCOUNT.STATE.VERIFYING:
                return translate('bankAccount.description.verifying');
            case CONST.BANK_ACCOUNT.STATE.LOCKED:
                return translate('bankAccount.description.locked');
            default:
                return '';
        }
    };
    
    const getButtonText = (state: string) => {
        switch (state) {
            case CONST.BANK_ACCOUNT.STATE.SETUP:
                return translate('bankAccount.button.finish');
            case CONST.BANK_ACCOUNT.STATE.PENDING:
                return translate('bankAccount.button.confirm');
            case CONST.BANK_ACCOUNT.STATE.LOCKED:
                return translate('bankAccount.button.unlock');
            default:
                return '';
        }
    };
    
    const state = bankAccount.state ?? '';
    const statusLabel = getStatusLabel(state);
    const description = getDescription(state);
    const buttonText = getButtonText(state);
    const hasRBR = state === CONST.BANK_ACCOUNT.STATE.SETUP || 
                   state === CONST.BANK_ACCOUNT.STATE.PENDING || 
                   state === CONST.BANK_ACCOUNT.STATE.LOCKED;
    
    return (
        <View>
            <Text>{bankAccount.bankName}</Text>
            <Text>{bankAccount.accountNumber}</Text>
            <Text>{statusLabel}</Text>
            {description ? <Text>{description}</Text> : null}
            {hasRBR ? (
                <View>
                    <Icon src={Expensicons.DotIndicator} fill={themeColors.danger} />
                    <Text>{description}</Text>
                    {buttonText ? <Text>{buttonText}</Text> : null}
                </View>
            ) : null}
        </View>
    );
}

export default BankAccountListItem;