// Add deduplication logic for email sending
import _ from 'underscore';

// Track if we already sent this email to prevent duplicates
const sentEmails = new Set();
const emailTypes = new Set();
// Add the user to prevent duplicate emails
function addUserToSentList(emailType) {
    // Check if user already received this email
    if (sentEmails.has(emailType)) {
        return;
    }
    sentEmails.add(emailType);
}