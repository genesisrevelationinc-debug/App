import React, {memo} from 'react';
import {View, Text} from 'react-native';
import {withNetwork} from 'react-native';

const ReportActionItem = (props) => {
    const emojis = EmojiUtils.sanitizeEmojis(props.action.message);
    return (
        <View style={[styles.chatItemMessage, ...props.style]}>
            <Text style={isHidden ? styles.hidden : {}}>{emois}</Text>
        </View>
    );
};

export default memo(ReportActionItem);