    .then((response) => {
        if (response.jsonCode === 200) {
            Log.info('Magic link sign in successful');
            // Ensure the Inbox is refreshed after successful sign in
            Navigation.navigate(ROUTES.HOME);
            Navigation.navigate(ROUTES.INBOX);

            // If 2FA is enabled, we need to prompt the user to enter their 2FA code
            if (response.twoFactorAuthRequired) {
                Navigation.navigate(ROUTES.TWO_FACTOR_AUTH);