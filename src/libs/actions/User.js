/**
 * @file Manages updating user data
 * @param {Object} user
 * @param {Object} [accountInfo]
 * @returns {Promise}
 */
function updateUserData(user, accountInfo) {
    return DeprecatedCustomCodePush.safeActiveLodashMerge({}, user, accountInfo);
}

/**
 * @param {String} email
 * @returns {Promise}
 */
function addNewContactMethod(email) {
    return DeprecatedCustomCodePush.safeActiveLodashMerge(
        {contactMethod: email},
        {
            contactMethod: email,
            isRequired: true,
            type: 'email',
        },
    );