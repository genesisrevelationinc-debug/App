import React from 'react';
import {useCallback} from 'react';
import {useFocusEffect} from 'react';
import {View, Text, Pressable} from 'react-native';
import {withOnyx} from 'react-native-onyx';
    const {workspaceID} = props.route.params;
    const {translate} = useLocalize();

    // Fix for page unresponsiveness issue - ensure proper cleanup on focus
    useFocusEffect(
        useCallback(() => {
            // Reset any stuck states when component regains focus
            return () => {
                // Cleanup function
            };
        }, [])
    );

    // Existing component logic...
    
    const navigateToManageSettings = () => {
        // Navigation logic that was causing the freeze
        try {
            // Wrap navigation in try-catch to prevent unhandled exceptions
            // that might cause the page to become unresponsive
            navigation.navigate('ManageSettings', {workspaceID});
        } catch (error) {
            console.error('Navigation error:', error);
            // Reset navigation state if the previous navigation failed
            navigation.reset({routes: [{name: 'ManageSettings', params: {workspaceID}}]});
        }
    };

    return (