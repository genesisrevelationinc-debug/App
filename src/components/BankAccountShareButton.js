import React from 'react';
import {withOnyx} from 'react-native-onyx';
import PropTypes from 'prop-types';
import lodashGet from 'lodash/get';
import CONST from '../CONST';
import styles from '../styles/styles';
import withLocalize, {withLocalizePropTypes} from './withLocalize';
import compose from '../libs/compose';
import ONYXKEYS from '../ONYXKEYS';
import * as PolicyUtils from '../libs/PolicyUtils';

const propTypes = {
    /** Bank account data */
    bankAccount: PropTypes.shape({
        /** ID of the bank account */
        bankAccountID: PropTypes.number,
    }),
    
    /** List of user policies */
    policies: PropTypes.objectOf(PropTypes.shape({
        /** ID of the policy */
        id: PropTypes.string,
    })),
    
    ...withLocalizePropTypes,
};

const defaultProps = {
    bankAccount: {},
    policies: {},
};

const BankAccountShareButton = (props) => {
    // Check if there are any workspace members besides the current user
    const hasWorkspaceMembers = PolicyUtils.hasWorkspaceMembersBesidesCurrentUser(props.policies);
    
    if (!hasWorkspaceMembers) {
        return null;
    }
    
    const handleShare = () => {
        // Share functionality
    };
    
    return (
        <MenuItem
            title={props.translate('common.share')}
            icon={Expensicons.Share}
            onPress={handleShare}
        />
    );
};

BankAccountShareButton.propTypes = propTypes;
BankAccountShareButton.defaultProps = defaultProps;

export default compose(
    withLocalize,
    withOnyx({
        policies: {
            key: ONYXKEYS.COLLECTION.POLICY,
        },
    }),
)(BankAccountShareButton);