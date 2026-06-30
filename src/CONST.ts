// ... existing code ...

const API_ERROR = {
    APPROVER_ACCOUNT_NOT_FOUND: 'The approver account could not be found. A workspace admin must update the approver for this category or tag.',
} as const;

// ... existing code ...

const CONST = {
    // ... existing constants ...
    API_ERROR,
    // ... existing constants ...
} as const;

export default CONST;