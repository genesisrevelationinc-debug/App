    if (!report || !report.total || report.total <= 0) {
        Log.warn('Attempted to pay a report with an invalid total', {reportID, total: report.total});
        return;
    } else {

    const paymentDetails = {
        reportID,
    };

    API.write('PayWithACH', paymentDetails);
    }
}

function payElsewhere(reportID) {