import React from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SignoutScreen from './src/screens/SignoutScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import ChefSigninScreen from './src/screens/ChefSigninScreen';
import ChefSignupScreen from './src/screens/ChefSignupScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator } from './src/navigationRef';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import VerifyScreen from './src/screens/VerifyScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SideBar from './src/components/SideBar';
import PaypalScreen from './src/screens/PaypalScreen';
import SearchScreen from './src/screens/SearchScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import OtpScreen from './src/screens/OtpScreen';
import NewPasswordScreen from './src/screens/NewPasswordScreen';
import { Feather, Entypo, Ionicons } from '@expo/vector-icons';
import ResultsShowScreen from './src/screens/ResultsShowScreen';
import CartScreen from './src/screens/CartScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import TipsyStripeScreen from './src/screens/TipsyStripeScreen';
import Menu from './src/ChefSide/Menu';
import Orders from './src/ChefSide/Orders';
import Profile from './src/ChefSide/Profile';
import MenuShowScreen from './src/ChefSide/MenuShowscreen';

import PaymentCompleteScreen from './src/screens/PaymentCompleteScreen';

const chefStack = createStackNavigator({
  chefPage: {
    screen: createBottomTabNavigator({
      Orders: {
        screen: Orders,
        navigationOptions: {
          title: 'View Orders'
        },
      },
      Menu: {
        screen: Menu,
        navigationOptions: {
          title: 'Your Menu'
        },
      },
      Profile: {
        screen: Profile,
        navigationOptions: {
          title: 'Profile'
        },
      }
    },
      {
        defaultNavigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let IconComponent = Entypo;
            let iconName;
            if (routeName === 'Orders') {
              iconName = focused
                ? 'shopping-bag'
                : 'shopping-bag'
            } else if (routeName === 'Menu') {
              iconName = focused ? 'menu' : 'menu';
            } else if (routeName === 'Profile') {
              iconName = focused ? 'user' : 'user';
            }

            return <IconComponent name={iconName} size={25} color={tintColor} />;
          }
        }),
        tabBarOptions: {
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        },
      }
    ),
    navigationOptions: {
      header: null
    }
  },
  MenuShow: {
    screen: MenuShowScreen
  }
})


const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Welcome: WelcomeScreen,
    Signin: SigninScreen,
    Signup: SignupScreen,
    ChefSignup: ChefSignupScreen,
    ChefSignin: ChefSigninScreen,
    Verify: VerifyScreen,
    ResetPassword: ResetPasswordScreen,
    Otp: OtpScreen,
    NewPassword: NewPasswordScreen,
  }),
  chefflow: chefStack,
  mainflow: createDrawerNavigator({
    searchflow: createStackNavigator({
      Search: SearchScreen,
      ResultsShow: ResultsShowScreen,
      Cart: CartScreen,
      TipsyStripe: TipsyStripeScreen,
      PaymentComplete: PaymentCompleteScreen
    }),
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: "Profile",
        drawerIcon: ({ tinColor }) => <Feather name="user" size={16} color={tinColor} />
      }
    },
    Paypal: PaypalScreen,
    Signout: {
      screen: SignoutScreen,
      navigationOptions: {
        title: "SignOut",
        drawerIcon: ({ tinColor }) => <Feather name="log-out" size={16} color={tinColor} />
      }
    }

  }, {
    contentComponent: props => <SideBar {...props} />,

    drawerWidth: Dimensions.get("window").width * 0.95,
    hideStatusBar: true,

    contentOptions: {
      activeBackgroundColor: "rgba(212,118,207,0.2)",
      activeTinColor: "#531158",
      itemsContainerStyle: {
        marginTop: 16,
        marginHorizontal: 8
      },
      itemStyle: {
        borderRadius: 4
      }
    }

  })
});


const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App
        ref={(navigator) => {
          setNavigator(navigator)
        }}
      />
    </AuthProvider>
  )
};
