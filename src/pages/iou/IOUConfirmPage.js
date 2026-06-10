import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import lodashGet from 'lodash/get';
import _ from 'underscore';
import {withOnyx} from 'react-native-onyx';
import ONYXKEYS from '../../ONYXKEYS';
import styles from '../../styles/styles';
import Text from '../../components/Text';
import Button from '../../components/Button';
import CONST from '../../CONST';
import * as Expensicons from '../../components/Icon/Expensicons';
import * as IOU from '../../libs/actions/IOU';
import withLocalize, {withLocalizePropTypes} from '../../components/withLocalize';
import compose from '../../libs/compose';
import * as CurrencyUtils from '../../libs/CurrencyUtils';
import Navigation from '../../libs/Navigation/Navigation';
import ROUTES from '../../ROUTES';
import HeaderWithBackButton from '../../components/HeaderWithBackButton';
import ScreenWrapper from '../../components/ScreenWrapper';
import utils from '../../libs/utils';
import * as ReportUtils from '../../libs/ReportUtils';
import * as OptionsListUtils from '../../libs/OptionsListUtils';
import FullPageNotFoundView from '../../components/BlockingViews/FullPageNotFoundView';
import FullScreenLoadingIndicator from '../../components/FullscreenLoadingIndicator';

const propTypes = {
    /** Holds data related to Money Request view state that persists through multiple component mounts */
    iou: PropTypes.shape({
        /** Whether or not the IOU step is loading */
        loading: PropTypes.bool,

        /** Selected currency from IOU model */
        selectedCurrency: PropTypes.shape({
            /** IOU currency tag */
            currency: PropTypes.string,
        }),
    }),

    /** The policyID of the request */
    policyID: PropTypes.string,

    /** The report on which the request is initiated */
    report: PropTypes.shape({
        /** The report ID */
        reportID: PropTypes.string,
    }),

    ...withLocalizePropTypes,
};

const defaultProps = {
    iou: {},
    policyID: '',
    report: {},
};

class IOUConfirmPage extends React.Component {
    constructor(props) {
        super(props);

        this.submit = this.submit.bind(this);
    }

    submit() {
        IOU.createMoneyRequest(this.props.iou);
    }

    render() {
        // If we are creating a request from the global create, we need to add the Mark as Paid and Pay with Wallet options
        const isFromGlobalCreate = !this.props.route.params?.iouReportID;
        const hasExpensifyWallet = true; // This should be determined from user data

        return (
            <ScreenWrapper includeSafeAreaPaddingBottom={false}>
                <HeaderWithBackButton
                    title={this.props.translate('iou.confirm')}
                    onBackButtonPress={() => Navigation.goBack()}
                />
                <View style={[styles.flex1, styles.ph5]}>
                    <Text style={[styles.textAlignCenter, styles.mb2]}>
                        {this.props.translate('iou.description')}
                    </Text>
                    {isFromGlobalCreate && (
                        <View style={[styles.flexRow, styles.justifyContentCenter, styles.mb4]}>
                            <Button
                                medium
                                success
                                text={this.props.translate('iou.markAsPaid')}
                                onPress={() => this.submit()}
                                style={[styles.mr2]}
                            />
                            {hasExpensifyWallet && (
                                <Button
                                    medium
                                    success
                                    text={this.props.translate('iou.payWithWallet')}
                                />
                            )}
                        </View>
                    )}
                </View>
            </ScreenWrapper>
        );
    }
}

IOUConfirmPage.propTypes = propTypes;
IOUConfirmPage.defaultProps = defaultProps;

export default compose(
    withLocalize,
    withOnyx({
        iou: {key: ONYXKEYS.IOU},
    }),
)(IOUConfirmPage);