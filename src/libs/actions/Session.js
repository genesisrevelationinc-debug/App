        .then((response) => {
            if (response.jsonCode === 200) {
                Onyx.merge(ONYXKEYS.SESSION, {authToken: response.authToken});
                // Clear any loading states or messages that might be set
                Onyx.set(ONYXKEYS.IS_LOADING, false);
                Onyx.set(ONYXKEYS.SESSION_ERROR, '');

                Navigation.navigate(ROUTES.HOME);
            } else {
                Onyx.set(ONYXKEYS.SESSION_ERROR, response.message);