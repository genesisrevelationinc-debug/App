const BANK_ACCOUNT_STATUS = {
    ACTIVE: 'active',
    INCOMPLETE: 'incomplete',
    PENDING: 'pending',
    VERIFYING: 'verifying',
    LOCKED: 'locked',
} as const;

type BankAccountStatus = (typeof BANK_ACCOUNT_STATUS)[keyof typeof BANK_ACCOUNT_STATUS];

const CARD_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
} as const;

type CardStatus = (typeof CARD_STATUS)[keyof typeof CARD_STATUS];

const BANK_ACCOUNT_STATUS_MESSAGES: Record<BankAccountStatus, string> = {
    [BANK_ACCOUNT_STATUS.ACTIVE]: '',
    [BANK_ACCOUNT_STATUS.INCOMPLETE]: 'Finish adding bank account',
    [BANK_ACCOUNT_STATUS.PENDING]: 'Please confirm test transactions',
    [BANK_ACCOUNT_STATUS.VERIFYING]: "We're reviewing your documentation",
    [BANK_ACCOUNT_STATUS.LOCKED]: 'This account requires attention',
};

const BANK_ACCOUNT_STATUS_BUTTONS: Record<BankAccountStatus, string | null> = {
    [BANK_ACCOUNT_STATUS.ACTIVE]: null,
    [BANK_ACCOUNT_STATUS.INCOMPLETE]: 'Finish',
    [BANK_ACCOUNT_STATUS.PENDING]: 'Confirm',
    [BANK_ACCOUNT_STATUS.VERIFYING]: null,
    [BANK_ACCOUNT_STATUS.LOCKED]: 'Unlock',
};

const CARD_INACTIVE_MESSAGES = {
    DIRECT_FEED_EMPLOYEE: 'Please ask an admin to fix this connection',
    DIRECT_FEED_ADMIN: 'Please fix this connection in Company Cards',
    PERSONAL_CARD: 'Please fix this connection',
} as const;

export default {
    BANK_ACCOUNT_STATUS,
    BANK_ACCOUNT_STATUS_MESSAGES,
    BANK_ACCOUNT_STATUS_BUTTONS,
    CARD_INACTIVE_MESSAGES,
};