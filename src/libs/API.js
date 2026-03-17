    if (!command) {
        Log.warn('API command is missing');
        return;
    } else if (!data.reportID) {
        Log.warn('API command missing reportID', {command});
        return;
    }
    }

    const request = {
    };

    Network.post(command, request)
        .catch(error => Log.error('API request failed', {command, error}))
        .then(response => {
            if (response.jsonCode === 200) {
                Log.info('API request successful', {command});