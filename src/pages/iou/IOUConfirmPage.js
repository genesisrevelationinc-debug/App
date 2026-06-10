import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import PropTypes from 'prop-types';
import _ from 'underscore';
import * as IOUActions from '../../libs/actions/IOU';
import * as ReportActions from '../../libs/actions/Report';
import * as Currency from '../../libs/Currency';
import * as OptionsList from '../../libs/OptionsList';
import * as ReportUtils from '../../libs/ReportUtils';
import * as Policy from '../../libs/Policy';
import * as PersonalDetails from '../../libs/PersonalDetails';
import CONST from '../../CONST';
import ONYXKEYS from '../../ONYXKEYS';

const propTypes = {
    ...withLocalizePropTypes,
};

const defaultProps = {
    iou: {},
    iouType: CONST.IOU_TYPE.REQUEST,
    onSendMoney: PropTypes.func.isRequired,
};

const defaultProps = {
    ...defaultProps,
};

class IOUConfirmPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPaymentOptionPaypal: false,
            isPaymentOptionExpensify: false,
            shouldShowMarkAsPaid: false,
            shouldShowPayWithWallet: false,
        };
    }

    componentDidMount() {
        this.setPaymentOptions();
    }

    setPaymentOptions() {
        // Check if we should show "Mark as Paid" option
        const isSendingMoney = this.props.iouType === CONST.IOU_TYPE.SEND;
        const canMarkAsPaid = isSendingMoney;
        
        // Check if we should show "Pay with Wallet" option
        const hasExpensifyWallet = false; // This would be determined by checking user's wallet status
        const canPayWithWallet = isSendingMoney && hasExpensifyWallet;

        this.setState({
            shouldShowMarkAsPaid: canMarkAsPaid,
            shouldShowPayWithWallet: canPayWithWallet,
        });
    }

    render() {
        return (
            <ScreenWrapper>
                        </View>
                    </View>
                    <View style={[styles.wv2RequestPreviewBox, styles.mb4]}>
                        {this.state.shouldShowMarkAsPaid && (
                            <TouchableOpacity
                                style={[styles.button, styles.buttonSuccess, styles.mt4]}
                                onPress={this.props.onMarkAsPaid}
                            >
                                <Text style={[styles.buttonText, styles.buttonSuccessText]}>
                                    Mark as Paid
                                </Text>
                            </TouchableOpacity>
                        )}
                        {this.state.shouldShowPayWithWallet && (
                            <TouchableOpacity
                                style={[styles.button, styles.buttonSuccess, styles.mt4, styles.mr2]}
                                onPress={this.props.onPayWithWallet}
                            >
                                <Text style={[styles.buttonText, styles.buttonSuccessText]}>
                                    Pay with Wallet
                                </Text>
                            </TouchableOpacity>
                        )}
                        {!(this.state.shouldShowMarkAsPaid || this.state.shouldShowPayWithWallet) && (
                            <View style={[styles.flexRow, styles.justifyContentCenter]}>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonSuccess, styles.mr2]}
                                    onPress={this.props.onPress}
                                >
                                    <Text style={[styles.buttonText, styles.buttonSuccessText]}>
                                        {this.props.translate('iou.request')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </ScreenWrapper>
        );
    }
}
IOUConfirmPage.defaultProps = defaultProps;

export default withLocalize(IOUConfirmPage);

IOUConfirmPage.displayName = 'IOUConfirmPage';

const styles = StyleSheet.create({});

export {IOUConfirmPage};