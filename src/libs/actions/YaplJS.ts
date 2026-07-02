import {NativeEventEmitter, NativeModules} from 'react-native';
import {InteractionManager} from 'react-native';
import Log from '@libs/Log';

const YaplJSModule = NativeModules.YaplJS;
     * Calls a native function with the given arguments.
     */
    callFunction: (functionName: string, args: Record<string, unknown> = {}) => {
        const serializedArgs = JSON.stringify(args);
        
        // Defer non-critical bridge calls to prevent main thread blocking
        // This addresses the APP-7DX fatal app hang on iOS HybridApp
        InteractionManager.runAfterInteractions(() => {
            YaplJSModule.callFunction(functionName, serializedArgs);
        });
    },

    /**