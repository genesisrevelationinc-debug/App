   const [effectiveDate, setEffectiveDate] = React.useState(moment().toDate()); // Default to today
   
   const handleAssign = () => {
       // Assignment logic here that would use the effectiveDate
       console.log('Assigning card with effective date:', effectiveDate);
   };
   
   return (
       <View style={[styles.appContent, styles.flex1, styles.p5]}>
           <Text style={[styles.textHeadline, styles.mb3]}>
               {props.translate('workspace.companyCards.assignCard')}
           </Text>
           <EffectiveDatePicker 
               value={effectiveDate}
               onInputChange={(date) => setEffectiveDate(date)}
           />
           <Text style={[styles.textLabel, styles.mt5, styles.mb2]}>
               {props.translate('workspace.companyCards.assignDateFuture')}
           </Text>
       </View>
   );