import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';
const Stack = createStackNavigator();
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="PreviousScreen" component={PreviousScreen} />
    </Stack.Navigator>
  );
};
enableScreens();
export default Navigation;