                <View style={[styles.flex1, styles.flexRow, styles.alignItemsCenter, styles.justifyContentBetween]}>
                    <View style={[styles.flex1, styles.flexRow, styles.alignItemsCenter, styles.gap2]}>
                        <Icon src={icon} height={20} width={20} />
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={[styles.textStrong, styles.flex1]}
                        >
                            {name}
                        </Text>
                    </View>
                    {isEnabled && (
                        <View style={styles.workspaceRulesStatusIcon}>