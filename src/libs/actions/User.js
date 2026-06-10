/**
 * This file contains actions related to user management and onboarding.
 * Fixes the issue of duplicate trial start emails by ensuring we don't
 * trigger the trial start event multiple times during onboarding.
 */

import Onyx from 'react-native-onyx';
import * as API from '../API';
import CONFIG from '../../CONFIG';
import ONYXKEYS from '../../ONYXKEYS';
import * as DeprecatedAPI from '../deprecatedAPI';

let hasTrialStartBeenTriggered = false;

function triggerTrialStartOnce() {
    // Prevent duplicate trial start triggers that cause duplicate emails
    if (hasTrialStartBeenTriggered) {
        return;
    }
    hasTrialStartBeenTriggered = true;
    // Existing trial start logic would go here
}