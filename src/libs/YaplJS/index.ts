import type {NativeEventEmitter} from 'react-native';
import {NativeModules} from 'react-native';
import {runOnJS} from 'react-native-reanimated';
import Log from '@libs/Log';

type YaplJSModule = {
     * Calls a native function with the given arguments.
     */
    callFunction: (functionName: string, args: Record<string, unknown> = {}) => {
        const serializedArgs = JSON.stringify(args);
        
        // Offload to background thread to prevent main thread blocking
        // This fixes the APP-7DX fatal app hang in HybridApp iOS
        if ('worklet' in global) {
            runOnJS(YaplJSModule.callFunction)(functionName, serializedArgs);
        } else {
            YaplJSModule.callFunction(functionName, serializedArgs);
        }
    },

    /**