    const { expense } = props;
    const { isHighlighted } = props;
    return (
        <View
            style={[
                styles.expenseItem,
                expense.isPending && styles.pendingExpense,
                isHighlighted && styles.highlightedExpense,
            ]}
        >
            <Text>{expense.description}</Text>
    );
};
const styles = StyleSheet.create({
    highlightedExpense: {
        backgroundColor: '#ffffcc', // Light yellow highlight
    },
});

export default ExpenseItem;