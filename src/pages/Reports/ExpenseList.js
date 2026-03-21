        }
    }, [props.recentlyCreatedExpenseID]);

    useEffect(() => {
        if (props.recentlyCreatedExpenseID) {
            scrollRef.current?.scrollToItem({ index: expenses.findIndex(expense => expense.id === props.recentlyCreatedExpenseID) });
        }
    }, [props.recentlyCreatedExpenseID, expenses]);

    const renderItem = ({ item }) => (
        <ExpenseItem
            expense={item}