import React from 'react';
import {View} from 'react-native';
import {showSecurityMatrix} from '@libs/Permissions';
import {getPolicyTypeForIOU} from '@libs/PolicyUtils';
import _ from 'underscore';
import {withIOUActions, withNetwork} from '@components/withNetwork';
import {getComponentForQuery} from '@libs/Navigation';
import * as IOU from '@libs/actions/iou';
import {iouPropTypes} from './propTypes';
import withIOU from './withIOU';
import iouGetOnyxModel from './models/IOU';
import styles from './styles';

const IOUConfirmation = (props) => {
    const iou = props.iou;
    const isComponentInActive = !props.iou.id;

    // Add payment options for IOU confirmation
    const shouldShowPaymentOptions = true;
    
    // Show Mark as Paid button
    const showMarkAsPaid = shouldShowPaymentOptions;
    
    // Show Pay with Wallet option
    const showPayWithWallet = shouldShowPaymentOptions && 
        props.user.hasWallet() && 
        props.iou.type === 'send' && 
        props.iou.amount > 0;
    
    // Add the payment option buttons to the confirmation screen
    if (showMarkAsPaid || showPayWithWallet) {
        const paymentOptions = [];
        
        if (showMarkAsPaid) {
            paymentOptions.push({
                text: 'Mark as Paid',
                onPress: () => props.onMarkAsPaid(),
                isDisabled: false
            });
        }
        
        if (showPayWithWallet) {
            paymentOptions.push({
                text: 'Pay with Wallet',
                onPress: () => props.onPayWithWallet(),
                isDisabled: false
            });
        }
        
        // Add payment options to the view
        const paymentButtons = paymentOptions.map((option, index) => (
            <TouchableOpacity
                key={index}
                onPress={option.onPress}
                disabled={option.isDisabled}
                style={[styles.button, option.isDisabled ? styles.buttonDisabled : {}]}
            >
                <Text style={styles.buttonText}>{option.text}</Text>
            </TouchableOpacity>
        ));
    }

    return (