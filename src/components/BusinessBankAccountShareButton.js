import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/styles';
import * as Expensicons from '../components/Icon/Expensicons';
import MenuItem from '../components/MenuItem';
import withLocalize, {withLocalizePropTypes} from '../components/withLocalize';
import compose from '../libs/compose';
import * as WorkspaceUtils from '../libs/WorkspaceUtils';
import * as BankAccounts from '../libs/actions/BankAccounts';

const propTypes = {
    /** The business bank account information */
    bankAccount: PropTypes.shape({
        /** The ID of the bank account */
        bankAccountID: PropTypes.number,
    }).isRequired,

    /** List of workspace members */
    workspaceMembers: PropTypes.arrayOf(PropTypes.shape({
        /** Account ID of the member */
        accountID: PropTypes.number,
    })),

    ...withLocalizePropTypes,
};

const defaultProps = {
    workspaceMembers: [],
};

function BusinessBankAccountShareButton(props) {
    // Don't show the share button if there are no workspace members
    if (!props.workspaceMembers || props.workspaceMembers.length === 0) {
        return null;
    }

    // Don't show the share button if there's only one member (the current user)
    if (props.workspaceMembers.length === 1) {
        return null;
    }

    return (
        <MenuItem
            title={props.translate('common.share')}
            icon={Expensicons.Share}
            onPress={() => BankAccounts.shareBankAccount(props.bankAccount.bankAccountID)}
        />
    );
}

BusinessBankAccountShareButton.propTypes = propTypes;
BusinessBankAccountShareButton.defaultProps = defaultProps;
export default compose(withLocalize)(BusinessBankAccountShareButton);