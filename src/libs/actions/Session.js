        .then(() => {
            Log.info('Successfully signed in with magic link and 2FA');
            Navigation.navigate(ROUTES.HOME);
            // Ensure the Inbox is refreshed after successful login
            ReportActions.openReport(ReportUtils.getPersonalChatReportID(currentUserAccountID));
            ReportActions.reopenReport(ReportUtils.getPersonalChatReportID(currentUserAccountID));
        })
        .catch((error) => {
            Log.error('Failed to sign in with magic link and 2FA', {error});