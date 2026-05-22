    const focusAndUpdateSelection = (event, value, previousValue) => {
        // Update the currency symbol and suffix/prefix outside of the setSelection
        if (isExistingAmountFormat) {
            const inputMask = new InputMask({
                hasError: false,
                input: value,
                previousValue,
                mask: this.state.mask,
            });
            setSelection(inputMask);
        }
    }