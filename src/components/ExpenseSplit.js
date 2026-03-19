        setSplitValues(newSplitValues);
    };
    const handlePercentageChange = (index, value) => {
        const newSplitValues = [...splitValues];
        newSplitValues[index] = parseFloat(value) || 0;
        setSplitValues(newSplitValues);
        const totalPercentage = newSplitValues.reduce((sum, val) => sum + val, 0);
        if (totalPercentage > 100) {
            newSplitValues[index] = 100 - (totalPercentage - parseFloat(value));
            setSplitValues([...newSplitValues]);
        }
    };
                <TextInput
                    key={index}
                    value={splitValue.toString()}
                    onChangeText={(value) => handlePercentageChange(index, parseFloat(value))}
                    keyboardType="numeric"
                    style={styles.input}
                />