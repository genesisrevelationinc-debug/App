        const newExpense = response.data.expense;
        setExpenses([newExpense, ...expenses]);
        setHighlightedExpenseID(newExpense.id);
        // Ensure the list scrolls to the newly added expense
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
    };
    return (
                <ExpenseItem
                    key={expense.id}
                    expense={expense}
                    isHighlighted={highlightedExpenseID === expense.id}
                />
            ))}
        </ScrollView>