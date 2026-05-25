import {CommonActions, StackActions} from '@react-navigation/core';
import {getDynamicRouteList, getDynamicRouteListAfterLogin} from './dynamicRoute';

let navigationRef;

/**
 * Handle navigation state changes and override the default browser back/forward behavior
 * to prevent flickering on iOS Safari swipe-back gestures
 * @param {Object} ref - navigation ref
 */
function handleSwipeBackGestureFix() {
    // Add event listener to handle back gestures properly
    const handleBackGesture = (state) => {
        if (state.routes.length === 1) {
            // Already at root route, no need to handle back
            return;
        }
        
        // Navigate back to avoid browser's native swipe-back causing flickering
        // by properly handling the navigation state
        if (navigationRef.isReady()) {
            navigationRef.dispatch(CommonActions.goBack());
        } else {
            // Use history API or programmatic navigation
            // to properly handle the back navigation
        }
    };
}

/**
 * Apply a fix for iOS Safari swipe-back gesture flickering
 */
function applySwipeBackFix() {
    // This is a simplified implementation that prevents
    // the flickering that would occur during swipe-back