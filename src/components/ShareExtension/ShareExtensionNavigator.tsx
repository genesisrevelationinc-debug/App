import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import SharePage from './SharePage';
import SubmitPage from './SubmitPage';

const Stack = createStackNavigator();

function ShareExtensionNavigator() {
    const navigation = useNavigation();
    
    // Disable swipe back gesture at the navigator level to allow iOS to dismiss the modal
    React.useEffect(() => {
        navigation.setOptions({gestureEnabled: false});
    }, [navigation]);
    
    return (
        <Stack.Navigator>
            <Stack.Screen name="Share" component={SharePage} />