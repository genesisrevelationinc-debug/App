        return;
    }
    const highlightNewExpense = (expenseID) => {
        setHighlightedExpenseID(expenseID);
    };

    const renderExpense = (expense) => {
        const isHighlighted = highlightedExpenseID === expense.id;
        return (
                <ExpenseItem
                    key={expense.id}
                    expense={expense}
                    isHighlighted={isHighlighted} onHighlight={highlightNewExpense}
                />
            </TouchableOpacity>
        );
        <View style={styles.expenseList}>
            {expenses.map(renderExpense)}
            <FloatingActionButton onPress={createExpense} />
            {highlightedExpenseID && <View style={styles.highlightOverlay} />}
        </View>
    );
};