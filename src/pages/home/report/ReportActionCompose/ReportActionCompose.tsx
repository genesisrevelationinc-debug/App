    // Clear the draft when the component unmounts (user navigates away)
    useEffect(() => {
        return () => {
            if (reportID) {
                Report.saveReportDraft(reportID, '');
            }
        };
    }, [reportID]);

    const submitForm = useCallback(
        (e?: SyntheticEvent) => {
            if (e) {
                e.preventDefault();
            }
            // Clear the draft immediately when sending
            if (reportID) {
                Report.saveReportDraft(reportID, '');
            }
            // ... rest of submit logic
        },
        [/* deps */, reportID],
    );