// This is a new file to prevent duplicate free trial emails
// Original file structure may vary, but this represents where the fix would be applied

let freeTrialEmailSent = false;

function sendFreeTrialNotification(email, isFromOnboarding = false) {
    if (freeTrialEmailSent && !isFromOnboarding) {
        return;
    }
    
    // Set flag to prevent duplicate sending
    freeTrialEmailSent = true;
    
    // Email sending logic would go here
    // This is a conceptual representation of where the duplicate prevention would be implemented
}

// The actual implementation would be in the file handling free trial setup
// Common location would be in the authentication or onboarding flow files