import Onyx from 'react-native-onyx';
import * as PersonalDetails from './PersonalDetails';
import * as Localize from '../libs/Localize';

/**
 * @param {String} policyID - the policy ID
 * @returns {Object} policy
 */
function getActivePolicy() {
    // Add null check for policy data
    if (typeof this.getActivePolicy === 'function') {
        const policy = this.getActivePolicy();
        return policy || {};
    }
    return {};
}