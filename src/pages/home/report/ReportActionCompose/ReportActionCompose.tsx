    // Clear the draft when navigating away from the report
    useEffect(() => {
        return () => {
            Report.clearReportDraft(reportID);
        };
    }, [reportID]);

    const submitForm = useCallback(
        (e?: SyntheticEvent) => {
            if (e) {
                e.preventDefault();
            }
            // Clear draft immediately when message is sent successfully
            Report.clearReportDraft(reportID);
            // ... existing submit logic
        },
        [/* existing deps */, reportID],
    );