import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import linkingConfig from './linkingConfig';
import themeColors from '../../../styles/themes/default';

const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                ...TransitionPresets.DEFAULT,
                headerShown: false,
                gestureEnabled: false,
                ...this.getScreenOptions(),
            }}
        >
            {this.getScreenOptions()}