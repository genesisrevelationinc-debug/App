import type {ShareAction} from '@expensify/react-native-share-intent';
import {NativeModules} from 'react-native';
import Onyx from 'react-native-onyx';
import type {OnyxEntry} from 'react-native-onyx';
import {check as checkMediaLibraryPermission, request as requestMediaLibraryPermission} from 'react-native-permissions';
import type {ValueOf} from 'type-fest';
import {getActivePolicy} from '@libs/PolicyUtils';
import {isEmptyObject} from '@src/utils/isEmptyObject';
import type {ShareTempFile} from '@src/types/onyx';
import ONYXKEYS from '@src/ONYXKEYS';
import type {Policy} from '@src/types/onyx';
import type {Route} from '@src/ROUTES';
import type Navigation from '@libs/Navigation/Navigation';
import type {NavigationAction} from '@libs/Navigation/Navigation';
        return;
    }

    const activePolicy: OnyxEntry<Policy> = getActivePolicy();
    const shouldSmartscanEverything = activePolicy?.shouldSmartscanEverything;

    if (shouldSmartscanEverything) {
        shareAction.text = '';