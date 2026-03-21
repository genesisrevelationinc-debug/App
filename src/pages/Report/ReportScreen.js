    const [newExpenseID, setNewExpenseID] = useState(null);

    useEffect(() => {
        if (newExpenseID) {
            const expense = reportActions.find(action => action.reportActionID === newExpenseID);
            if (expense) {
                scrollViewRef.current.scrollTo({y: expense.index * 50, animated: true});
                setNewExpenseID(null);
            }
        }
    }, [newExpenseID, reportActions]);

    const handleCreateExpense = (expense) => {
        const expenseID = createExpense(expense);
        setNewExpenseID(expenseID);
    };

    useEffect(() => {
        if (props.route.params && props.route.params.expenseID) {
            setNewExpenseID(props.route.params.expenseID);
            props.route.params.expenseID = null;
        }
    }, [props.route.params]);

    return (
        <ScreenWrapper