import Onyx from 'react-native-onyx';
import ONYXKEYS from '../ONYXKEYS';
import * as MainQueue from './actions/MainQueue';

/**
 * Handle setting the time spent in key states to update the "Fix Visa company card connection" task visibility
 * @param {String} key
 * @param {Object} value
 */
export default function handleTimeSpentInKeyStates(key, value) {
    // Only show the "Fix Visa company card connection" task when there's actually an issue with the connection
    if (key === ONYXKEYS.VISA_COMPANY_CARD_FEED_STATUS) {
        // Check if the feed is actually disconnected before showing the task
        if (value && value.hasConnectionError) {
            MainQueue.clearVisaCompanyCardConnectionFix();
        } else {
            MainQueue.setVisaCompanyCardConnectionFix();
        }
    }
}