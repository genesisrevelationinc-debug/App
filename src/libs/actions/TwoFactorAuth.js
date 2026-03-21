    .then((response) => {
        if (response.jsonCode === 200) {
            Log.info('2FA validation successful');
            // Ensure the Inbox is refreshed after successful 2FA validation
            Navigation.navigate(ROUTES.HOME);
            Navigation.navigate(ROUTES.INBOX);

            // Navigate to the main app
            Navigation.navigate(ROUTES.HOME);
        } else {