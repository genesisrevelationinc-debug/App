   // Check if this expense action has splits that were removed
   const hasRemovedSplits = ReportUtils.hasRemovedSplitAmounts(reportID, action);
   
   return (
       <View style={[styles.amount, styles.alignSelfCenter]}>
           <Text style={[styles.amount, styles.alignSelfCenter]}>
               {Localize.numberFormat(action.amount, {precision: 2})}
           </Text>
           {hasRemovedSplits && (
               <View style={styles.splitDot}>
                   <Text style={styles.splitDotText}>•</Text>
               </View>
           )}
       </View>
   );
   action: PropTypes.object.isRequired,
   reportID: PropTypes.string.isRequired,