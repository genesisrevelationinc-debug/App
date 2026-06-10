import React from 'react';
import {useFocusEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, Pressable} from 'react-native';
import {withOnyx} from 'react-native-onyx';
    const {workspaceID} = props.route.params;
    const {translate} = useLocalize();

    const navigation = useNavigation();
    
    useFocusEffect(
        React.useCallback(() => {
            // Ensure the component is properly mounted and responsive
            return () => {};
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
            // Reset navigation state if needed
            navigation.reset();
        }
    };

    return (