import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import type {FullScreenNavigatorParamList} from '@libs/Navigation/types';
import {useNavigationState} from '@react-navigation/native';
import NotFoundPage from '@pages/ErrorPage/NotFoundPage';
import SCREENS from '@src/SCREENS';
import defaultScreenOptions from './defaultScreenOptions';
    const Stack = createStackNavigator<FullScreenNavigatorParamList>();
    const screenOptions = defaultScreenOptions(theme);

    // Get the current routes to check if we're navigating back from a merged expense
    const routes = useNavigationState((state) => state?.routes ?? []);
    const previousRoute = routes.length > 1 ? routes[routes.length - 2] : null;
    
    // If we're navigating back from a report that was merged, we should not show NotFoundPage
    // as the report data might still be loading
    const isNavigatingBackFromMergedReport = previousRoute?.name === SCREENS.REPORT && 
        previousRoute?.params?.reportID && routes[routes.length - 1]?.name === SCREENS.NOT_FOUND;

    return (
        <Stack.Navigator
            screenOptions={{
                ...screenOptions,
            }}
        >
            {!isNavigatingBackFromMergedReport && (
            <Stack.Screen
                name={SCREENS.NOT_FOUND}
                component={NotFoundPage}
                    dismissable: false,
                }}
            />
            )}
        </Stack.Navigator>
    );
}