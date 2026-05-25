
    const commentContainerStyle = [styles.ph5, styles.justifyContentBetween, styles.mb2];

    return (
        <View style={[styles.dFlex, styles.flexRow, styles.justifyContentEnd, shouldShowComments && commentContainerStyle]}>
            <Animated.Text
                style={[styles.textLabelSupporting]}
                entering={hasComments ? undefined : FadeIn}
                exiting={isFocused ? FadeOut : undefined}
            >
                {shouldShowComments ? translate('common.comments') : ''}
            </Animated.Text>
            {!isEmptyTransactions && (
                <View style={[styles.dFlex, styles.flexRow, styles.alignItemsCenter, styles.pr3, textContainerStyle, shouldUseNarrowLayout && [styles.justifyContentBetween, styles.w100]]}>
                    <Text style={[styles.mr3, styles.textLabelSupporting]}>{translate('common.total')}</Text>
                    <Text style={[shouldUseNarrowLayout ? styles.mnw64p : styles.mnw100p, styles.textAlignRight, styles.textBold, hasPendingAction && styles.opacitySemiTransparent]}>
                        {convertToDisplayString(totalDisplaySpend, report?.currency)}
                    </Text>
                </View>
            )}
        </View>
    );
}

export default MoneyRequestReportTotalSpend;
