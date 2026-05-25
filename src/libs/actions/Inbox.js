import {InboxReportAction} from '../components/ReportActionItem';

/**
 * Adds a global bank account signer info prompt to the user's inbox
 *
 * @param {String} accountID
 * @param {String} reportID
 * @returns {Object}
 */
function createGlobalBankAccountPromptInboxTask(accountID, reportID) {
    return {
        type: 'GlobalBankAccountSignerInfo',
        accountID,
        reportID,
        reportAction: {
            ...InboxReportAction,
            actionName: 'GlobalBankAccountSignerInfo',
            message: [
                {
                    text: 'Please enter signer information for your global bank account',
                    accountID,
                    reportID,
                },
            ],
        },
    };
}

export {createGlobalBankAccountPromptInboxTask};