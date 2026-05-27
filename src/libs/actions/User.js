import Onyx from 'react-native-onyx';
import lodashGet from 'lodash/get';
import * as API from '../API';
import * as DeprecatedAPI from '../deprecatedAPI';
import * as Pusher from '../Pusher/pusher';
import * as Welcome from './Welcome';
import * as PersonalDetails from './PersonalDetails';

// Onyx keys
import ONYXKEYS from '../../ONYXKEYS';

let currentUserEmail = '';
let session = {};
Onyx.connect({
    key: ONYXKEYS.SESSION,
        session = val;
    },
});
Onyx.connect({
    key: ONYXKEYS.SESSION,
    callback: (val) => currentUserEmail = lodashGet(val, 'email', ''),
});

/**
 * Sets the initial user's currency to USD, so we can add the user to the beta
    });
}

// Track recently sent free trial emails to prevent duplicates
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
 * Fetches the user's private personal details
 *
 */
function sendFreeTrialStartedEmail() {
    // Check if we should send the email to prevent duplicates
    const shouldSend = shouldSendFreeTrialEmail(currentUserEmail);
    if (!shouldSend) {
        console.debug('[User] Skipping duplicate free trial email for', currentUserEmail);
        return;
    }

    console.debug('[User] Sending free trial started email for', currentUserEmail);
    
    API.write('SendFreeTrialStartedEmail', {
        email: currentUserEmail,
    });