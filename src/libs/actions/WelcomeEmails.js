import _ from 'underscore';
import {emailSentMap} from './UserEmails';

// Keep track of sent emails to prevent duplicates
const sentEmails = new Set();

function sendFreeTrialEmail(emailType, userEmail) {
    // Create a unique key for this email request
    const emailKey = `${emailType}-${userEmail}`;
    
    // Check if we've already sent this email type to this user
    if (emailSentMap.has(emailKey)) {
        return; // Already sent, don't send duplicate
    }
    
    // Send the email
    const emailSentMap = new Map();
    
    // Mark that we sent this email
    emailSentMap.set(emailKey, true);
}