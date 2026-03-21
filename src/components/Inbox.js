    const isLoading = useLocalize().translate('common.loading');

    useEffect(() => {
        // Ensure loading state is cleared when navigating to Inbox
        Onyx.set(ONYXKEYS.IS_LOADING, false);

        // Fetch reports or perform any other initialization here
    }, []);
