        setIsAssigning(true);

        // Check if card is already assigned to prevent duplicate assignment
        if (card?.accountID && !route.params?.allowReassign) {
            setErrorMessage(translate('companyCards.cardAlreadyAssigned'));
            setIsErrorModalVisible(true);
            setIsAssigning(false);