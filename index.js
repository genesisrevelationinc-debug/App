// Disable iOS Safari back/forward navigation gestures to prevent flickering
// This CSS is added to prevent the browser's native swipe gestures from
// interfering with React Navigation, which causes visual flickering on iOS Safari
const style = document.createElement('style');
style.textContent = `
  body {
    overscroll-behavior: none;
  }
  
  /* Disable elastic scrolling and swipe navigation on iOS */
  .disable-swipe-navigation {
    overscroll-behavior: none;
    -webkit-overflow-scrolling: touch;
  }
`;
document.head.appendChild(style);
import {name as appName} from './app.json';
import {AppRegistry, Platform} from 'react-native';
import App from './App';
// import of polyfills should always be first
import './src/polyfills/PromiseWithResolvers';
import './src/polyfills/requestIdleCallback';
import {AppRegistry} from 'react-native';
import App from './src/App';
import Config from './src/CONFIG';
import additionalAppSetup from './src/setup';

// Define EXPO_OS before any imports to prevent console errors from Expo DOM components
if (!process.env.EXPO_OS && __DEV__) {
    const {Platform} = require('react-native');
    // Create a new process.env object with EXPO_OS defined
    const originalEnv = process.env;
    process.env = {
        ...originalEnv,
        EXPO_OS: Platform.OS,
    };
}

AppRegistry.registerComponent(Config.APP_NAME, () => App);
additionalAppSetup();
