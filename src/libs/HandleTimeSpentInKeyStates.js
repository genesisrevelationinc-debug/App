import Onyx from 'react-native-onyx';
import ONYXKEYS from '../src/ONYXKEYS';
import * as MainQueue from './actions/MainQueue';

/**
 * Handle setting the time spent in key states to properly manage when the "Fix Visa company card connection" task should be shown
 * @param {String} key
 * @param {Object} value
 * @param {Object} previousValue
 */
export default function handleTimeSpentInKeyStates(key, value, previousValue) {
    // Properly handle the Visa company card connection task visibility
    if (key === ONYXKEYS.VISA_COMPANY_CARD_FEED_STATUS) {
        // Only show the task when there's actually a connection problem
        if (value && value.isDisconnected && !value.isConnected) {
            // Connection is actually down, show the task
            MainQueue.setVisaCompanyCardConnectionFix();
        } else if (value && !value.isDisconnected && value.isConnected) {
            // Connection is working properly, hide the task
            MainQueue.clearVisaCompanyCardConnectionFix();
        }
    }
}

/**
 * Compare the current and previous values to determine if the connection status has actually changed
 * @param {Object} currentValue 
 * @param {Object} previousValue
 * @returns {Boolean}
 */
function hasVisaConnectionStatusChanged(currentValue, previousValue) {
    // If previousValue is null/undefined, this is the first load, so check current value
    if (!previousValue) {
        return currentValue && (currentValue.isDisconnected || !currentValue.isConnected);
    }
    
    // Only trigger change if the connection status has actually changed
    return (currentValue.isDisconnected && !previousValue.isDisconnected) || 
           (!currentValue.isConnected && previousValue.isConnected);
}