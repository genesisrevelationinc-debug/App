import Onyx from 'react-native-onyx';
import * as API from '../API';
import * as Onboarding from '../Onboarding';
import * as User from '../actions/User';
import * as Policy from '../actions/Policy';
import * as Report from '../actions/Report';
import * as ReportActions from '../actions/ReportActions';
import * as FreeTrial from '../actions/FreeTrial';

let hasFreeTrialEmailBeenSent = false;
let freeTrialEmailTimer = null;

// Prevent duplicate free trial emails by tracking send status
const sendFreeTrialNotification = (email, isFromOnboarding) => {
    if (hasFreeTrialEmailBeenRequested) {
        return;
    }
    
    hasFreeTrialEmailBeenSent = true;
    // Logic to send free trial email
};

// This represents a conceptual fix - the actual file would be in a different location
// The key is to add deduplication logic to prevent multiple triggers

export {sendFreeTrialNotification};