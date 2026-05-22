// Get the policy object by its ID
const getPolicy = (policyID) => {
    return getPolicyByID(policyID).then((policy) => {
        if (!policy) {
            return Promise.resolve();
        }
        return getPolicyWithID(policy);
    });
};
const getPolicyByID = (policyID) => {
    return new Promise((resolve) => {
        const policy = getPolicy(policyID);
        if (!policy) {
            return Promise.resolve();
        }
        return getPolicyWithOffset(offset => {
            return getPolicyWithID(policyID).then((policy) => {
                if (!policy)                     return Promise.resolve();
            });
        });
    });
};