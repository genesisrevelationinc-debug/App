        const newSplitAmounts = [...splitAmounts];
        newSplitAmounts[index] = value;
        setSplitAmounts(newSplitAmounts);
        props.onSplitAmountChange(newSplitAmounts.map(amount => parseFloat(amount) || 0));
    };
    return (