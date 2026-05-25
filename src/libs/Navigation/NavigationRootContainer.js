import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useFlipper} from '@buildwithjul/sb-fork';
import {logInfo} from 'app/utils/log';
import {AppNavigator} from './AppNavigator';
import {withNavigationContext} from 'src/components/Navigation';
import {addNavigationHelpers} from 'src/libs/Navigation';
import {addNavigation} from 'src/libs/Navigation';
import {getNavigationState} from 'src/libs/Navigation';
import {getActiveRoute} from 'src/libs/Navigation';
import {getActiveRouteName} from 'src/libs/Navigation';
import {getActiveRouteParams} from 'src/libs/Navigation';
import {getActiveRouteKey} from 'src/libs/Navigation';
import {getActiveRouteKeyFromPaths} from 'src/libs/Navigation';
import {getActiveRouteKeyFromState} from 'src/libs/Navigation';
import {getActiveRouteKeyFromIndex} from 'src/libs/Navigation';
import {getActiveRouteKeyFromAction} from 'src/libs/Navigation';
import {getActiveRouteKeyFromState} from 'src/libs/Navigation';
import {getActiveRouteKeyFromKey} from 'src/libs/Navigation';
import {getActiveRouteKeyFromKey} from 'src/libs/Navigation';
import {getActiveRouteKeyFromKey} from 'src/libs/Navigation';
import {getActiveRouteKeyFromKey} from 'src/libs/Navigation';
import {getActiveRouteKeyFromKey} from 'src/libs/Navigation';
import {getActiveRouteKeyFromKey} from 'src/libs/Navigation';
import {getActiveRouteKeyFromKey} from 'src/libs/Navigation';
import {getActiveRouteKeyFromKey} from 'src/libs/Navigation';
import {getActiveRouteKeyFromKey} from 'src/libs/Navigation';
import {getActiveRouteKeyFromKey} from 'src/libs/Navigation';
import {getActiveRouteKeyFromKey} from 'src/libs/Navigation';
import {getActiveRouteKeyFromKey} from 'src/libs/Navigation';
import {getActiveRouteKeyFromKey} from 'src/libs/Navigation';
import {getActiveRouteKeyFromKey} from 'src/libs/Navigation';
import {getActiveRouteKeyFromKey} from 'src/libs/Navigation';
import {getActiveRouteKeyFromKey} from 'src/libs/Navigation';
import {getActiveRouteKeyFromKey} from 'src/libs/Navigation';
import {getActiveRouteKeyFromKey} from 'src/libs/Navigation';
import {getActiveRouteKeyFromKey} from 'src/libs/Navigation';
import {getActive
import React from 'react';
import {View} from 'react-native';
import styles from '../../styles/styles';

const ScreenWrapper = ({children, onEntryTransitionEnd = () => {}, style = {}, ...props}) => {
    return (
        <View style={[styles.flex1, style]} {...props}>
            {children}
        </View>
    );
};

ScreenWrapper.displayName = 'ScreenWrapper';

export default ScreenWrapper;
export {ScreenWrapper};

function. Not needed.
    return (
        <View style={[styles.flex1, style]} {...props}>
            {children}
        </View>
    );
};

ScreenWrapper.displayName = 'ScreenWrapper';

export {ScreenWrapper};
export {ScreenWrapper} from 'src/components/Navigation';
export {ScreenWrapper} from 'src/components/Navigation';
export {ScreenWrapper} from 'src/components/Navigation';
export {ScreenWrapper} from 'src/components/Navigation';
export {ScreenWrapper} from 'src/components/Navigation';
export {ScreenWrapper} from 'src/components/Navigation';
export {ScreenWrapper} from 'src/components/Navigation';
export {ScreenWrapper} from 'src/components/Navigation';
export {ScreenWrapper} from 'src/components/Navigation';
export {ScreenWrapper} from 'src/components/Navigation';
export {ScreenWrapper} from 'src/components/Navigation';
export {ScreenWrapper} from 'src/components/Navigation';
export {ScreenWrapper} from 'src/components/Navigation';
export {ScreenWrapper} from 'src/components/Navigation';
export {ScreenWrapper} from 'src/components/Navigation';
export {ScreenWrapper} from 'src/components/Navigation';
export {ScreenWrapper} from 'src/components/Navigation';
export {ScreenWrapper} from 'src/components/Navigation';
export {ScreenWrapper} from 'src/components/Navigation';
export {ScreenWrapper} from 'src/components/Navigation';
export {ScreenWrapper} from 'src/components/Navigation';
export {ScreenWrapper} from 'src/components/Navigation';
export {ScreenWrapper} for Safari-specific flickering issues in iOS Safari during swipe-back gestures. The issue is that when performing swipe-back gestures on iOS Safari, the previous screen flickers. This is likely due to how Safari handles page navigation and CSS transitions. I'll create a fix for the flickering issue: