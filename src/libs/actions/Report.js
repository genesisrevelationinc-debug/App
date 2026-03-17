    const report = allReports[reportID];
    if (!report) {
        Log.warn('Attempted to pay a report that does not exist', {reportID});
        throw new Error('Report does not exist');
    }

    const policy = allPolicies[report.policyID];
        Log.warn('Attempted to pay a report with an invalid policy', {reportID, policyID: report.policyID});
        return;
    }

    if (!policy.reimbursementMethod || policy.reimbursementMethod !== 'ACH') {
        Log.warn('Policy is not configured for ACH reimbursement', {reportID, policyID: report.policyID});
        return;
    }

    const paymentMethod = policy.reimbursementMethod;

    if (paymentMethod === CONST.REIMBURSEMENT_METHOD.ACH) {
            Log.warn('Attempted to pay a report with an invalid payment method', {reportID, paymentMethod});
            return;
        }
        PaymentUtils.payWithACH(reportID).catch(error => Log.error('Failed to pay report with ACH', {reportID, error}));
    } else {
        Log.warn('Unsupported payment method', {reportID, paymentMethod});
    }