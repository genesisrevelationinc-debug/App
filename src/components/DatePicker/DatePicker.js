 * @returns {React.FC}
 */
const DatePicker = (props) => {
    const [selectedMonth, setSelectedMonth] = useState(props.value ? moment(props.value).month() : moment().month());
    const [selectedYear, setSelectedYear] = useState(props.value ? moment(props.value).year() : moment().year());

    const yearPickerRef = useRef();
                setSelectedYear(newlySelectedYear);
                props.onYearChange(newlySelectedYear);
            }}
            disabledDays={props.reservedRange}
            ref={yearPickerRef}
        />
    );