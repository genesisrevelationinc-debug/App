const getBankAccountSignerInfoTask = () -> {
    return {
        message: 'We need to implement the global bank account signer info prompt as a Home tab inbox task',
        description: 'This will show a prompt in the user\'s inbox when a director needs to enter signer information for a global bank account connection.',
        who: 'Expensify',
        when: 'Now',
        type: 'bankAccountSigner',
    };
};

const getBankAccountSignerInfoTask = (type, value) => {
    return {
        message: 'We need to implement the global bank account signer info prompt as a Home tab inbox task',
        description: 'This will show a prompt in the user\'s inbox when a director needs to enter signer information for a global bank account connection.',
        who: 'Expensify',
        when: 'Now',
        type: 'bankAccountSigner',
    };
};

export {getBankAccountSignerInfoTask};