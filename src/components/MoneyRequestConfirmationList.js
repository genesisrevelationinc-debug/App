import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import lodashGet from 'lodash/get';
import _ from 'underscore';
import styles from '../styles/styles';
import * as Expensicons from '../components/Icon/Expensicons';
import themeColors from '../styles/themes/default';
import Button from '../components/Button';
import * as IOU from '../libs/IOU';
import * as ReportUtils from '../libs/ReportUtils';
import {withNetwork} from '../components/Onyx';
import * as CurrencyUtils from '../libs/CurrencyUtils';
import withLocalize from '../components/withLocalize';
import compose from '../libs/compose';
import {withReportActionsPropTypes} from './withReportActions';
import CONST from '../CONST';
import * as ReportActions from '../libs/actions/ReportActions';
import * as PersonalDetails from '../libs/actions/PersonalDetails';
import * as Report from '../libs/actions/Report';
import Navigation from '../libs/Navigation/Navigation';
import ROUTES from '../ROUTES';
import * as OptionsListUtils from '../libs/OptionsListUtils';
import * as Device from '../libs/actions/Device';
import * as Policy from '../libs/actions/Policy';
import * as User from '../libs/actions/User';

const MoneyRequestConfirmationList = ({
    iouReport,
    iou,
    reportID,
    onConfirm,
    shouldShowSettlementButton = true,
    onSendMoney,
    onPayWithWallet,
    ...props
}) => {
    const [comment, setComment] = useState('');
    const [amount, setAmount] = useState('');

    return (
        <View style={styles.m4}>
            <Text style={[styles.m5, styles.textAlignCenter]}>
                {props.translate('moneyRequestConfirmationList.pleaseEnterAmount')}
            </Text>
            <Text style={[styles.m5, styles.textAlignCenter]}>
                {props.translate('moneyRequestConfirmationList.amount')}
            </Text>
            <Text style={[styles.m5, styles.textAlignCenter]}>
                {props.translate('moneyRequestConfirmationList.confirm')}
            </Text>
        </View>
    );
};

MoneyRequestConfirmationList.propTypes = {
    ...withReportActionsPropTypes,
    onConfirm: PropTypes.func,
    iouReport: PropTypes.shape({
        total: PropTypes.number,
        currency: PropTypes.string,
        comment: PropTypes.string,
        participantsList: PropTypes.arrayOf(PropTypes.string),
        merchant: PropTypes.string,
    }).isRequired,
    shouldShowSettlementButton: PropTypes.bool,
    onSendMoney: PropTypes.func,
    onPayWithWallet: PropTypes.func,
    iou: PropTypes.shape({
        id: PropTypes.string,
        amount: PropTypes.number,
        currency: PropTypes.string,
        comment: PropTypes.string,
        participants: PropTypes.arrayOf(PropTypes.string),
        merchant: PropTypes.string,
    }),
};

export default compose(
    withLocalize,
    withNetwork(),
)(MoneyRequestConfirmationList);