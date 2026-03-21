    if (route === ROUTES.HOME) {
        // Additional logic for home navigation
    }
    if (route === ROUTES.INBOX) {
        // Refresh the Inbox to ensure it loads correctly
        refreshInbox();
    }
    NavigationContainerRef.current?.navigate(route);
}

    // Logic to refresh the Inbox
    Log.info('Refreshing Inbox');
    // Example: Fetch new messages or data
    // This is a placeholder for actual refresh logic
    // e.g., API.fetchMessages().then(updateInbox);
    // For now, we'll just log the refresh
    console.log('Inbox refreshed');
}

function goBack() {