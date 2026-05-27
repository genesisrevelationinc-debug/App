import {throttle} from 'lodash';
import * as WelcomeEmails from '../libs/actions/WelcomeEmails';

// In memory reference for tracking sent emails
const sentEmails = new Map();

// Function to prevent duplicate email sending
function sendEmailOncePerUser(emailType, userEmail) {
    // Check if we already sent this type of email to this user
    if (sentEmails.has(`${emailType}-${userEmail}`)) {
        return;
    }
    sentEmails.set(`${emailType}-${userEmail}`, true);
}