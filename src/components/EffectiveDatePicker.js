   ...withLocalizePropTypes,
   const [selectedDate, setSelectedDate] = React.useState(new Date());
   
   return (
       <View style={styles.effectiveDatePickerContainer}>
           <Text style={[styles.textLabel, styles.mb2, styles.textWhite]}>
               {props.translate('workspace.companyCards.effectiveDate')}
           </Text>
           <DatePicker
               value={selectedDate}
               onInputChange={(date) => setSelectedDate(date)}
               label={props.translate('workspace.companyCards.selectDate')}
           />
       </View>
   );