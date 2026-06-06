import React from 'react';
import type {GestureResponderEvent} from 'react-native';
import * as Link from '@expensify/react-native-link';
import Navigation from '@libs/Navigation/Navigation';
import type {AnchorForCommentsOnlyProps} from './types';

function AnchorForCommentsOnly({href = '', rel, target, children, style, ...rest}: AnchorForCommentsOnlyProps) {
    const onLinkPress = () => {
        if (onPress) {
            onPress();
        } else {
            {...rest}
            href={href}
            onPress={(event) => {
                const nativeEvent = event as unknown as GestureResponderEvent;
                rest.onPress?.(nativeEvent);

                // Handle internal new.expensify.com links by navigating within the app
                // instead of opening in a new page
                if (href && (href.startsWith('https://new.expensify.com/') || href.startsWith('new.expensify.com/'))) {
                    Navigation.handleDeepLink(href);
                }
            }}
        >
            {children}
            href={href}
            onPress={onLinkPress}
        />
    );
}

export default AnchorForCommentsOnly;
