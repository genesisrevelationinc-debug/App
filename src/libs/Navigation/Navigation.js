import {Platform} from 'react-native';

const navigationRef = React.createRef();

function navigate(route, params) {
    return navigationState && navigationState.routeNames[navigationState.index];
}

function disableSafariSwipeGestures() {
    if (!Platform.OS === 'ios' || !window?.navigator?.userAgent?.includes('Safari')) {
        return;
    }
    
    // Disable Safari's back-forward swipe gestures to prevent flickering
    // when navigating back using the browser's swipe gestures
    const supportsPassive = !window?.addEventListener?.toString().includes('[native code]');
    const eventOptions = supportsPassive ? {passive: false} : false;
    
    // Prevent swipe navigation on iOS Safari
    document.addEventListener('touchstart', (e) => {
        // Disable swipe back/forward gestures
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, eventOptions);
    
    // Also prevent swipe on the document level
    document.addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, eventOptions);
}

function getComponentNameFromRouteSettings(settings) {
    return settings?.options?.title || '';
}