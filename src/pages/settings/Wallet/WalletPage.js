import React from 'react';
import {View} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import _ from 'underscore';
import lodashGet from 'lodash/get';
import HeaderWithBackButton from '../../../components/HeaderWithBackButton';
import Navigation from '../../../libs/Navigation/Navigation';
import ROUTES from '../../../ROUTES';
import * as Wallet from '../../../libs/actions/Wallet';
import withLocalize, {withLocalizePropTypes} from '../../../components/withLocalize';
import compose from '../../../libs/compose';
import ONYXKEYS from '../../../ONYXKEYS';
import * as ReportUtils from '../../../libs/ReportUtils';
import * as PaymentMethods from '../../../libs/actions/PaymentMethods';
import WalletEmptyBG from '../../../../assets/images/wallet-empty-bg.png';
import * as Policy from '../../../libs/actions/Policy';
import * as PolicyUtils from '../../../libs/PolicyUtils';
import ONYXKEYS from '../../../ONYXKEYS';
import withPolicy from '../../../components/withPolicy';

const propTypes = {
    ...withLocalizePropTypes,
    /** Wallet balance transfer props */
    walletTransfer: walletTransferPropTypes,

    /** The policy object for the current user */
    policy: PropTypes.shape({
        /** The ID of the policy */
        id: PropTypes.string,
    }),

    /** List of betas available to current user */
    betas: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
    userWallet: {},
    policy: {},
    walletTransfer: {},
    betas: [],
};
        this.renderCurrentWalletInfo = this.renderCurrentWalletInfo.bind(this);
        this.renderAddPaymentMethodButton = this.renderAddPaymentMethodButton.bind(this);
        this.navigateToTransferBalancePage = this.navigateToTransferBalancePage.bind(this);
        this.renderListOptions = this.renderListOptions.bind(this);
    }

    componentDidMount() {
            return;
        }

        // Don't show share option if workspace has no other members
        const hasOtherMembers = PolicyUtils.hasPolicyOtherMembers(this.props.policy);
        const shouldShowShareButton = hasOtherMembers;

        const menuItems = [
            {
                title: this.props.translate('common.transferBalance'),
                icon: Expensicons.Transfer,
                action: () => {
                    this.navigateToTransferBalancePage();
                },
                ...(!shouldShowShareButton ? [] : [{
                    title: this.props.translate('common.share'),
                    icon: Expensicons.Share,
                    action: () => {/* Share action */},
                }]),
            },
        ];

        );
    }

    render() {
        return (
            <ScreenWrapper>
                <HeaderWithBackButton
                    />
                )}
                <View style={[styles.flex1, styles.mb5]}>
                    {this.renderListOptions()}
                </View>
            </ScreenWrapper>
        );
}

export default compose(
    withLocalize,
    withOnyx({
        userWallet: {
            key: ONYXKEYS.USER_WALLET,
        },
        walletTransfer: {
            key: ONYXKEYS.WALLET_TRANSFER,
        },
        betas: {
            key: ONYXKEYS.BETAS,
        },
    }),
    withPolicy,
)(WalletPage);