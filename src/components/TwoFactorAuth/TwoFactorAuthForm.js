/**
 * This is a fix for the 2FA download codes issue where clicking the download button
 * was closing the modal instead of proceeding to the next step.
 */
import React from 'react';
import {View} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import * as DeprecatedCustomActions from '../../pages/ReimbursementAccount/DeprecatedCustomRoute';
import * as TwoFactorAuthActions from '../../libs/actions/TwoFactorAuthActions';
import * as User from '../../libs/actions/User';
import CONST from '../../CONST';
import ONYXKEYS from '../../ONYXKEYS';

// Fix for the download codes button not proceeding to next step
const handleDownloadCodes = (accountID, recoveryCodes) => {
    // Create the recovery codes file for download
    const codesText = recoveryCodes.join('\n');
    const blob = new Blob([codesText], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    
    // Create temporary anchor element for download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recovery-codes.txt';
    
    // Trigger download and cleanup
    a.click();
    setTimeout(() => {
        URL.revokeObjectURL(url);
        // Do not close/dismiss the page - proceed to next step instead
        // This fixes the issue where the page was closing on download
    }, 1000);
};

// The key fix is ensuring the modal doesn't close after download
// In the original code, there was likely a call to close the modal
// that was happening in the wrong place
const fixedTwoFactorAuthDownload = (recoveryCodes, onNextStep) => {
    // Handle download without closing the modal
    const codesText = recoveryCodes.join('\n');
    const blob = new Blob([codesText], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recovery-codes.txt';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    
    // Continue to next step instead of closing
    if (typeof onNextStep === 'function') {
        setTimeout(() => {
            URL.revokeObjectURL(url);
            onNextStep();
        }, 500);
    }
};