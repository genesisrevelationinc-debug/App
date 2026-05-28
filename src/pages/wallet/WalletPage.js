import React, {useCallback} from 'react';
import {View} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import lodashGet from 'lodash/get';
import PropTypes from 'prop-types';
import {withOnyx} from 'react-native-onyx';
import _ from 'underscore';
import * as BankAccounts from '../../libs/actions/BankAccounts';
import * as PaymentMethods from '../../libs/actions/PaymentMethods';
import * as Expensicons from '../../components/Icon/Expensicons';
import ONYXKEYS from '../../ONYXKEYS';
import themeColors from '../../styles/themes/default';
import variables from '../../styles/variables';
import styles from '../../styles/styles';
    /** The bank account attached to this card */
    bankAccount: PropTypes.shape({
        /** The bank account type */
        /** The policy ID associated with this bank account */
        policyID: PropTypes.string,

        /** The bank account ID */
        type: PropTypes.string,
    }),

    bankAccount: {},
    userWallet: {},
    cardList: {},
    policies: {},

};

function WalletPage(props) {
                            key: `bankAccount-${bankAccount.bankAccountID}`,
                            bankAccount: bankAccount,
                            onMenuHide: () => setIsMenuVisible(false),
                            policyID: lodashGet(bankAccount, 'policyID', ''),
                        }}
                    />
                )}
        key: ONYXKEYS.USER_WALLET,
    },
    cardList: {
        key: ONYXKEYS.COLLECTION.CARD_LIST,
    },
    policies: {
        key: ONYXKEYS.COLLECTION.POLICY,
    },
})(WalletPage);