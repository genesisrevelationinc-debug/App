    if (!route) {
        return;
    }
    // Ensure the navigation is handled correctly
    NavigationContainerRef.current?.navigate(route);
    // Refresh the current route to ensure the UI is updated
    refreshRoute(route);
}