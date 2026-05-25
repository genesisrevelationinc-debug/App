import {Platform} from 'react-native';

const navigationRef = React.createRef();

function navigate(route, params) {
    return navigationState && navigationState.routeNames[navigationState.index];
}

function disableSafariSwipeGestures() {
    if (Platform.OS !== 'web' || typeof window === 'undefined') {
        return;
    }
    
    // Check if we're in Safari
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (!isSafari) {
        return;
    }
    
    // Disable Safari's swipe navigation
    let startX = 0;
    let startY = 0;
    
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    });
    
    document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
    });
}

function getComponentNameFromRouteSettings(settings) {
    return settings?.options?.title || '';
}