import React, {useState, useEffect, useRef, useCallback} from 'react';
import {View} from 'react-native';
import TextInput from '../../../components/TextInput';

const MoneyRequestAmountPage = (props) => {
    const [amount, setAmount] = useState('');
    const amountInputRef = useRef(null);
    const [shouldFocus, setShouldFocus] = useState(true);
    
    // Fix for the amount input field losing focus issue
    // Store the focus state and restore it when needed
    const handleAmountChange = useCallback((value) => {
        setAmount(value);
    }, []);
    
    // Ensure the input maintains focus during re-renders
    useEffect(() => {
        if (shouldFocus && amountInputRef.current) {
            // Small delay to ensure DOM is ready
            const focusTimeout = setTimeout(() => {
                if (amountInputRef.current && amountInputRef.current.focus) {
                    amountInputRef.current.focus();
                }
            }, 100);
            
            return () => clearTimeout(focusTimeout);
        }
    }, [shouldFocus]);
    
    // Handle when the component loses focus unexpectedly
    const handleBlur = useCallback(() => {
        // Don't set shouldFocus to false here as it might cause issues
        // Instead, we'll try to maintain focus when appropriate
    }, []);
    
    // Handle when the component gains focus
    const handleFocus = useCallback(() => {
        setShouldFocus(true);
    }, []);
    
    return (
        <View style={styles.pageWrapper}>
            <View style={styles.content}>
                <TextInput
                    ref={amountInputRef}
                    inputID="amount"
                    label="Amount"
                    value={amount}
                    onChangeText={handleAmountChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    autoFocus
                    // Key fix: prevent the input from losing focus due to parent re-renders
                    key="amount-input"
                    keyboardType="decimal-pad"
                />
            </View>
        </View>
    );
};

const styles = {
    pageWrapper: {
        flex: 1,
        padding: 20,
    },
    content: {
        flex: 1,
    },
};

export default MoneyRequestAmountPage;