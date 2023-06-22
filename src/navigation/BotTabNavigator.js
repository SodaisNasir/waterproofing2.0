import React, { useContext } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Dashboard from '../screens/Dashboard';
import AddLead from '../screens/add/AddLead';
import AllLead from '../screens/AllLead';
import EditProfile from '../screens/profile/EditProfile';
import ChangePassword from '../screens/profile/ChangePassword';
import Colors from '../components/Colors';
import { NavigationContainer } from '@react-navigation/native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import AddDetails from '../screens/add/AddDetails';
import AddDetails2 from '../screens/add/AddDetails2';
import EditLead from '../screens/add/EditLead';
import ContactsList from '../screens/Contacts/ContactList';
import AddLeadEdit from '../screens/add/AddDetails_Edit';
import EditDescription from '../screens/add/EditDescription';
import EditContactList from '../screens/EditContacts/EditContactList';

const Tab = createBottomTabNavigator();
export const BottomTabNavigator = navigation => {
  const defaultTabNavOptions = {
    // tabBarHideOnKeyboard: true,
    tabBarStyle: {
      backgroundColor: 'transparent',
      height: verticalScale(62),
      position: 'absolute',
      borderTopWidth: 0,
      elevation: 0,
      right: scale(27),
      left: scale(27),
      paddingBottom: verticalScale(12),
    },
  };
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="dashboard"
        screenOptions={{ ...defaultTabNavOptions, tabBarHideOnKeyboard: true }}>
        <Tab.Screen
          name="dashboard"
          component={Dashboard}
          options={{
            headerShown: false,
            //   tabBarLabel: language?.home,
            tabBarShowLabel: false,
            tabBarVisible: true,
            tabBarIcon: ({ focused, color, size }) => (
              <LinearGradient
                colors={
                  focused
                    ? [Colors.btnColor1, Colors.btnColor2]
                    : [Colors.white, Colors.white]
                }
                useAngle={true}
                angle={45}
                style={focused ? styles.focusedIcon : styles.notFocusedIcon}>
                <Entypo
                  name="home"
                  color={focused ? Colors.white : Colors.red}
                  size={30}
                />
              </LinearGradient>
            ),
          }}
        />
        <Tab.Screen
          name="empty"
          component={AddLeadStack}
          options={{
            headerShown: false,
            //   tabBarLabel: language?.home,
            tabBarShowLabel: false,
            tabBarVisible: false,
            tabBarIcon: ({ focused, color, size }) => (
              <LinearGradient
                colors={
                  focused
                    ? [Colors.btnColor1, Colors.btnColor2]
                    : [Colors.white, Colors.white]
                }
                useAngle={true}
                angle={45}
                style={focused ? styles.focusedIcon : styles.notFocusedIcon}>
                <Entypo
                  name="add-user"
                  color={focused ? Colors.white : Colors.red}
                  size={30}
                />
              </LinearGradient>
            ),
          }}
        />

        <Tab.Screen
          name="wallet"
          component={AllLeadStack}
          options={{
            headerShown: false,
            //   tabBarLabel: language?.home,
            tabBarShowLabel: false,
            tabBarVisible: false,
            tabBarIcon: ({ focused, color, size }) => (
              <LinearGradient
                colors={
                  focused
                    ? [Colors.btnColor1, Colors.btnColor2]
                    : [Colors.white, Colors.white]
                }
                useAngle={true}
                angle={45}
                style={focused ? styles.focusedIcon : styles.notFocusedIcon}>
                <FontAwesome5
                  name="users"
                  color={focused ? Colors.white : Colors.red}
                  size={30}
                />
              </LinearGradient>
            ),
          }}
        />
        <Tab.Screen
          name="profile"
          component={ProfileStack}
          options={{
            headerShown: false,
            //   tabBarLabel: language?.home,

            tabBarShowLabel: false,
            tabBarVisible: false,
            tabBarIcon: ({ focused, color, size }) => (
              <LinearGradient
                colors={
                  focused
                    ? [Colors.btnColor1, Colors.btnColor2]
                    : [Colors.white, Colors.white]
                }
                useAngle={true}
                angle={45}
                style={focused ? styles.focusedIcon : styles.notFocusedIcon}>
                <Entypo
                  name="user"
                  color={focused ? Colors.white : Colors.red}
                  size={30}
                />
              </LinearGradient>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const Stack = createNativeStackNavigator();

function AddLeadStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationDuration: 500,
      }}>
      <Stack.Screen name="welcome" component={AddLead} />
      <Stack.Screen name="addDetails" component={AddDetails} />
      <Stack.Screen name="addDetails2" component={AddDetails2} />
      <Stack.Screen name="editlead" component={EditLead} />
      <Stack.Screen name="contactslist" component={ContactsList} />
    </Stack.Navigator>
  );
}
function AllLeadStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationDuration: 500,
      }}>
      <Stack.Screen name="wallet" component={AllLead} />
      <Stack.Screen name="editlead" component={EditLead} />
      <Stack.Screen name="addDetailsEdit" component={AddLeadEdit} />
      <Stack.Screen name="editdescription" component={EditDescription} />
      <Stack.Screen name="EditContactList" component={EditContactList} />
    </Stack.Navigator>
  );
}
function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationDuration: 500,
      }}>
      <Stack.Screen name="editProfile" component={EditProfile} />
      <Stack.Screen name="changePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  focusedIcon: {
    marginBottom: verticalScale(20),

    height: verticalScale(50),
    alignItems: 'center',
    aspectRatio: 1 / 1,
    borderRadius: moderateScale(100),
    justifyContent: 'center',

    // borderColor: Colors,
  },
  notFocusedIcon: {
    borderWidth: scale(2),
    borderColor: Colors.red,
    marginBottom: verticalScale(20),
    height: verticalScale(50),
    alignItems: 'center',
    aspectRatio: 1 / 1,
    borderRadius: moderateScale(100),
    justifyContent: 'center',
  },
});
