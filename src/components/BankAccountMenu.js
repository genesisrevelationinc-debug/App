import React from 'react';
import {View} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import lodashGet from 'lodash/get';
import MenuItem from './MenuItem';
import * as Expensicons from './Icon/Expensicons';
import withLocalize, {withLocalizePropTypes} from './withLocalize';
import * as ReportActions from '../libs/actions/ReportActions';
import * as Link from '../libs/actions/Link';
import * as BankAccounts from '../libs/actions/BankAccounts';
import ONYXKEYS from '../ONYXKEYS';
import * as PolicyUtils from '../libs/PolicyUtils';
import * as WorkspaceUtils from '../libs/WorkspaceUtils';
import CONST from '../CONST';

const propTypes = {
    /** Account menu item */
    /** Callback to execute when menu is hidden */
    onMenuHide: PropTypes.func,

    /** The policy data */
    policy: PropTypes.shape({
        /** The policy members */
        employeeList: PropTypes.arrayOf(PropTypes.string),
    }),

    /** The workspace members */
    workspaceMembers: PropTypes.object,

    ...withLocalizePropTypes,
};

    bankAccount: {},
    onMenuHide: () => {},
    bankAccountID: 0,
    policy: {},
    workspaceMembers: {},

};

function BankAccountMenu(props) {
        );
    }

    // Check if there are other workspace members besides the current user
    const hasOtherWorkspaceMembers = useMemo(() => {
        if (!props.policy || !props.policy.employeeList) {
            return false;
        }
        return props.policy.employeeList.length > 1;
    }, [props.policy]);

    return (
        <View style={styles.bankAccountMenu}>
            {hasOtherWorkspaceMembers && (
            <MenuItem
                title={props.translate('bankAccount.share')}
                icon={Expensicons.Link}
                shouldShowRightIcon
                onPress={handleShare}
            />
            )}
            <MenuItem
                title={props.translate('bankAccount.delete')}
                icon={Expensicons.Trashcan}
}

BankAccountMenu.propTypes = propTypes;
BankAccountMenu.defaultProps = defaultProps;

export default withOnyx({
    policy: {
        key: ({policyID}) => `${ONYXKEYS.COLLECTION.POLICY}${policyID}`,
    },
    workspaceMembers: {
        key: ONYXKEYS.COLLECTION.WORKSPACE_MEMBERS,
    },
})(withLocalize(BankAccountMenu));