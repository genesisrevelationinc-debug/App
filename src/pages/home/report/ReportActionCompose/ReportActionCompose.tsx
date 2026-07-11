    // Clear draft when component unmounts to prevent stale text on re-entry
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
            // Clear draft immediately when message is sent
            Report.clearReportDraft(reportID);
            // ... existing submit logic
        },
        [/* existing deps */, reportID],
    );