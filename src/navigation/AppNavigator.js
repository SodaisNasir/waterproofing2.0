import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Shoppingcarticon from '../components/ShoppingCartIcon';
import TitleScreen from '../screens/TitleScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import CreateAccount from '../screens/CreateAccount';
import OTPScreen from '../screens/OTPScreen';
import NewPassword from '../screens/NewPassword';
import ResetPassword from '../screens/ResetPassword';
import SignUpOTp from '../screens/SignUpOTp';
import ResetEmail from '../screens/ResetEmail';

const Stack = createNativeStackNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          animationDuration: 500,
        }}>
        <Stack.Screen name="loginscreen" component={LoginScreen} />
        <Stack.Screen name="newpassword" component={NewPassword} />
        <Stack.Screen name="otpscreen" component={OTPScreen} />
        <Stack.Screen name="createaccount" component={CreateAccount} />
        <Stack.Screen name="titlescreen" component={TitleScreen} />
        <Stack.Screen name="resetpassword" component={ResetPassword} />
        <Stack.Screen name="resetemail" component={ResetEmail} />
        <Stack.Screen name="signupotp" component={SignUpOTp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
