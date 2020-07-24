import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import SigninScreen from './src/Screens/SigninScreen';
import History from './src/Screens/HistoryScreen';
import PendingOrders from './src/Screens/PendingOrdersScreen';
import ProfileScreen from './src/Screens/ProfileScreen';
import ResolveAuthScreen from './src/Screens/ResolveAuth';
import SignoutScreen from './src/Screens/SignoutScreen';
import InProcessScreen from './src/Screens/InProcessScreen';
import MapScreen from './src/Screens/MapScreen';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


const TabNavigator = createBottomTabNavigator(
  {
    Pending: PendingOrders,
    InProcess: InProcessScreen,
    History: History,
    Profile: ProfileScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Profile') {
          iconName = focused
            ? 'ios-contact'
            : 'ios-contact';
        } else if (routeName === 'Pending') {
          iconName = focused ? 'ios-list-box' : 'ios-list';
        }
        else if (routeName === 'InProcess') {
          iconName = 'truck-delivery';
          IconComponent = MaterialCommunityIcons;
        }

        else if (routeName == 'History') {
          iconName = 'history'
          IconComponent = MaterialCommunityIcons;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);


const AppStack = createStackNavigator({
  Tab: {
    screen: TabNavigator,
    navigationOptions: {
      headerShown: false
    }
  },
  Map: MapScreen,
  Signout:SignoutScreen
})

const AuthStack = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  Signin: SigninScreen,
  AppStack: AppStack
})

export default createAppContainer(AuthStack);
