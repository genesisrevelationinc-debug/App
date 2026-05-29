import Onyx from 'react-native-onyx';
import lodashGet from 'lodash/get';
import * as API from '../API';
import ONYXKEYS from '../../ONYXKEYS';
        .then((response) => {
            if (response.jsonCode !== 200) {
                return;
            }

            // Prevent duplicate free trial emails by checking if already sent
            const policy = lodashGet(response, 'policy');
            if (policy && policy.freeTrialStartedEmailSent) {
                return;
            }

            // Send free trial started email
            API.write('SendFreeTrialStartedEmail', {
                policyID: response.policyID,