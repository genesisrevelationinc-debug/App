import React, {useCallback, useRef, useEffect} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import styles from '../styles/styles';
import * as CurrencyUtils from '../libs/CurrencyUtils';

const AmountTextInput = (props) => {
    const inputRef = useRef(null);
    const isAmountBeingFormatted = useRef(false);
    
    const handleAmountChange = useCallback((text) => {
        if (isAmountBeingFormatted.current) {
            return;
        }
        
        isAmountBeingFormatted.current = true;
        
        // Format the amount and update parent state
        const unformattedValue = CurrencyUtils.convertToDBAmount(text);
        const formattedValue = CurrencyUtils.convertToDisplayString(unformattedValue);
        
        // Call the parent onChange handler
        props.onAmountChange(formattedValue, unformattedValue);
        
        // Reset the formatting flag after a short delay to allow state updates
        setTimeout(() => {
            isAmountBeingFormatted.current = false;
        }, 0);
    }, [props.onAmountChange]);
    
    // Focus the input when component mounts if it's the initial focus
    useEffect(() => {
        if (props.autoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [props.autoFocus]);
    
    return (
        <View style={props.containerStyles}>
            <TextInput
                ref={inputRef}
                autoFocus={props.autoFocus}
                keyboardType="decimal-pad"
                placeholder="0.00"
                value={props.formattedAmount}
                onChangeText={handleAmountChange}
                onKeyPress={props.onKeyPress}
                style={[styles.iouAmountTextInput, props.inputStyle]}
                maxLength={10}
                autoCorrect={false}
                selection={props.selection}
                ref={(el) => {
                    if (el && props.inputRef) props.inputRef(el);
                }}
            />
        </View>
    );
};

export default AmountTextInput;