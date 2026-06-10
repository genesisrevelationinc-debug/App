/**
 * This file contains policy-related actions and may be where the duplicate email issue originates.
 * When completing onboarding with specific business setup selections, it appears to be triggering
 * duplicate email sends for free trial notifications.
 */

// The duplicate email issue likely occurs in the policy creation flow
// where onboarding selections trigger multiple notification calls

// Potential fix: Add deduplication check before sending notifications
// or consolidate multiple notification triggers into single events

// This file would need to be examined for the policy creation and 
// free trial email notification logic that may be causing duplication
