import React, {View} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import withWindowDimensions, {windowDimensionsPropTypes} from '../components/withWindowDimensions';
import withNetwork from '../components/withNetwork';
import withNavigationFocus from '../components/withNavigationFocus';
import withLocalize from '../components/withLocalize';
import withPersonalDetails from '../components/withPersonalDetails';
import withWindowDimensions from '../components/withWindowDimensions';
import * as ReceiptUtils from '../libs/ReceiptUtils';
import * as Expensicons from '../components/Icon/Expensicons';
import * as Illustrations from '../components/Icon/Illustrations';
import * as OptionsList from '../components/OptionsList';
import * as ReceiptPagePropTypes from './ReceiptPagePropTypes';
import * from '../components/Receipt';
import * as MapView from '../components/MapView';
import * as MapView from '../components/MapView';
import * as ReceiptImage from '../components/ReceiptImage';
import * as ReceiptDrop from '../components/ReceiptDrop';
import * as Receipt from '../components/Receipt';
import * * from '../components/Receipt';

const propTypes = {
    receipt: PropTypes.shape({
        receiptID: PropTypes.number,
        source: PropTypes.string,
        state: PropTypes.string,
    }).isRequired,
    isLocalCurrency: PropTypes.bool,
    ...windowDimensionsPropTypes,
};

const ReceiptPage = (props) => {
    const {translate} = props;
    
    const getReceipt = () => {
        if (!props.receipt) {
            return;
        }
        
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <ReceiptComponent 
                        source={props.re