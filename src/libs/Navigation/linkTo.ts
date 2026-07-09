import type {NavigationAction, NavigationContainerRef, NavigationState, PartialState} from '@react-navigation/native';
import {getPathFromState} from '@react-navigation/native';
import {getActionFromState} from '@react-navigation/core';
import {findFocusedRoute} from '@react-navigation/core';
import type {Route} from '@navigation/types';
import NAVIGATORS from '@src/NAVIGATORS';
import type {RootStackParamList} from '@src/ROUTES';
import type {State} from './types';
import config from './config';
import getPartialStateDiff from './getPartialStateDiff';
import getStateFromPath from './getStateFromPath';

type ActionPayloadParams = {
    screen?: string;
};

type ActionPayload = {
    type?: string;
    params?: ActionPayloadParams;
    screen?: string;
    path?: string;

type Action = {
    type: string;
    target?: string;
    payload?: ActionPayload;
};

function linkTo(navigation: NavigationContainerRef<RootStackParamList> | null, path: string, type?: string, isActiveRoute?: boolean) {
    if (!navigation) {
        throw new Error('Could not find navigation container');
        return;
    }

    const rootState = navigation.getRootState();
    const action: Action = getActionFromState(getStateFromPath(path, config), config);

    if (action !== undefined) {
        action.type = type ?? action.type;
        navigation.dispatch(action);
        return;
    }
    // If the action is undefined, it means the path is not valid
    // In this case, we should navigate to the path directly
    const stateFromPath = getStateFromPath(path, config);
    const focusedRoute = findFocusedRoute(stateFromPath);

    if (stateFromPath) {
        const diff = getPartialStateDiff(rootState, stateFromPath as State);
        if (diff) {
            navigation.dispatch({
                type: type ?? 'NAVIGATE',
                target: focusedRoute?.key ?? rootState.key,
                payload: diff,
            });
        }