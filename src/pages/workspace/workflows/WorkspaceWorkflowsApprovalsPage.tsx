    const [isUnapproveModalVisible, setIsUnapproveModalVisible] = useState(false);
    const [isTurnOffModalVisible, setIsTurnOffModalVisible] = useState(false);

    // Refresh policy when coming back online to ensure approver data is up to date
    useEffect(() => {
        if (isOffline || !policyID) {
            return;