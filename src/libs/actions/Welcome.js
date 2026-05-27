import Onyx from 'react-native-onyx';
import lodashGet from 'lodash/get';
import * as API from '../API';
import * as Report from './Report';
import * as Pusher from '../Pusher/pusher';
import * as User from './User';
import * as ReportActions from './ReportActions';

// Onyx keys
import ONYXKEYS from '../../ONYXKEYS';

let currentUserEmail = '';
Onyx.connect({
    key: ONYXKEYS.SESSION,
    callback: (val) => currentUserEmail = lodashGet(val, 'email', ''),
});

// Track recently sent free trial emails to prevent duplicates in welcome flow too
const recentlySentFreeTrialEmails = new Set();
const FREE_TRIAL_EMAIL_DEBOUNCE_TIME = 5000; // 5 seconds

function shouldSendFreeTrialEmail(email) {
    if (!email) return true;
    const now = Date.now();
    const key = `${email}-${Math.floor(now / FREE_TRIAL_EMAIL_DEBOUNCE_TIME)}`;
    if (recentlySentFreeTrialEmails.has(key)) {
        return false;
    }
    recentlySentFreeTrialEmails.add(key);
    return true;
}

/**
 * Create a new workspace in GQL and associate with the user
 */
function createWorkspace() {
 */
function sendFreeTrialStartedEmail() {
    // Check if we should send the email to prevent duplicates
    const shouldSend = shouldSendFreeTrialEmail(currentUserEmail);
    if (!shouldSend) {
        console.debug('[Welcome] Skipping duplicate free trial email for', currentUserEmail);
        return;
    }

    console.debug('[Welcome] Sending free trial started email for', currentUserEmail);
    API.write('SendFreeTrialStartedEmail', {
        email: currentUserEmail,
    });