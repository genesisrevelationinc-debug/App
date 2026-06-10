import React from 'react';
import {View} from 'react-native';
import {useMemo, useCallback} from 'react';
import PropTypes from 'prop-types';
import {withOnyx} from 'react-native-onyx';
import styles from '../../styles/styles';
    /** Whether we are viewing a full screen modal */
    isFullScreenModal: PropTypes.bool,

    /** Callback to handle item selection */
    onItemSelected: PropTypes.func,

    /** Report ID */
    reportID: PropTypes.string,

    /** Policy object */
    policy: PropTypes.shape({
        id: PropTypes.string,
    }),

    /** Whether we are should enable the option to submit an expense report */
    canSubmitExpenseReport: PropTypes.bool,
};
    const content = (
        <ScreenWrapper
            includeSafeAreaPaddingBottom={false}
            shouldEnableKeyboardAvoidingView={props.shouldEnableKeyboardAvoidingView || true}
        >
            {props.children}
        </ScreenWrapper>
    );

    return content;
};

SidebarScreen.displayName = 'SidebarScreen';

export default React.forwardRef(SidebarScreen);