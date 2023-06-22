import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';


const Stack = createNativeStackNavigator();

function WelcomeStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right',
                    animationDuration: 500,
                }}>
                <Stack.Screen name="welcome" component={WelcomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default WelcomeStack;
