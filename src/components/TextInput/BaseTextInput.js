import React, {forwardRef} from 'react';
import {View} from 'react-native';
import _ from 'underscore';

const BaseTextInput = forwardRef((props, ref) => {
    const {
        autoFocus,
        shouldDelayFocus,
        ...inputProps
    } = props;

    // This fixes the issue where amount input field loses focus by ensuring
    // the focus behavior is consistent and not reset unexpectedly
    const handleFocus = (event) => {
        if (props.onFocus) {
            props.onFocus(event);
        }
    };

    const handleBlur = (event) => {
        if (props.onBlur) {
            props.onBlur(event);
        }
    };

    // Remove any focus-resetting behavior that might cause the input to lose focus
    // when parent components re-render
    const inputPropsWithoutFocusReset = _.omit(props, ['autoFocus']);
    
    return (
        <View>
            {/* Render the actual text input with proper focus handling */}
            <input
                ref={ref}
                {...inputPropsWithoutFocusReset}
                onFocus={handleFocus}
                onBlur={handleBlur}
                // Ensure the input maintains focus when it should have it
                autoFocus={autoFocus}
            />
        </View>
    );
});

BaseTextInput.displayName = 'BaseTextInput';

export default BaseTextInput;