        .then((response) => {
            if (response.jsonCode === 200) {
                Onyx.merge(ONYXKEYS.SESSION, {authToken: response.authToken});
                // Ensure the Inbox is refreshed after successful login
                Onyx.set(ONYXKEYS.IS_LOADING_REPORT_DATA, true);
                Report.fetchAllReports();
                Onyx.set(ONYXKEYS.IS_LOADING_REPORT_DATA, false);
                Navigation.navigate(ROUTES.HOME);
            } else {
                Onyx.merge(ONYXKEYS.SESSION, {error: response.message});