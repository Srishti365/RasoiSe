import React from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
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
import { Feather, Entypo, Ionicons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import ResultsShowScreen from './src/screens/ResultsShowScreen';
import CartScreen from './src/screens/CartScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import TipsyStripeScreen from './src/screens/TipsyStripeScreen';
import Menu from './src/ChefSide/Menu';
import Orders from './src/ChefSide/Orders';
import Profile from './src/ChefSide/Profile';
import MenuShowScreen from './src/ChefSide/MenuShowscreen';
import OrdersList from './src/ChefSide/OrdersList';
import ConfirmedOrders from './src/ChefSide/ConfirmedOrders';
import OrderHistoryScreen from './src/ChefSide/OrderHistory';
import RateReviewScreen from './src/screens/RateReviewScreen';
import MyOrders from './src/screens/MyOrders';
import EditProfile from './src/ChefSide/EditProfile';
import EditUserProfile from './src/screens/EditUserProfile';

import PaymentCompleteScreen from './src/screens/PaymentCompleteScreen';

console.disableYellowBox = true;

const chefStack = createStackNavigator({
  chefPage: {
    screen: createBottomTabNavigator({
      Orders: {
        screen: Orders,
        navigationOptions: {
          title: 'View Orders'
        },
      },
      ConfirmedOrders: {
        screen: ConfirmedOrders,
        navigationOptions: {
          title: 'For Pickup'
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
      },

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
            } else if (routeName === 'ConfirmedOrders') {
              iconName = focused ? 'stopwatch' : 'stopwatch';
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
      headerShown: false
    }
  },
  MenuShow: {
    screen: MenuShowScreen
  },
  OrdersList: {
    screen: OrdersList
  },
  OrderHistory: {
    screen: OrderHistoryScreen
  },
  Edit: EditProfile
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
    searchflow: {
      screen: createStackNavigator({
        Search: SearchScreen,
        ResultsShow: {
          screen: ResultsShowScreen,
          navigationOptions: {
            headerShown: false
          }
        },
        RateReview: RateReviewScreen,
        Cart: CartScreen,
        TipsyStripe: TipsyStripeScreen,
        PaymentComplete: PaymentCompleteScreen,
        EditProfile:EditUserProfile
      }),
      navigationOptions:{
        title:'Search',
        drawerIcon: ({ tinColor }) => <FontAwesome5 name="search" size={20} color={tinColor} />
      }
    },
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: {
        title: "Profile",
        drawerIcon: ({ tinColor }) => <Feather name="user" size={16} color={tinColor} />
      }
    },
    MyOrders: {
      screen: MyOrders,
      navigationOptions: {
        title: 'Orders',
        drawerIcon: ({ tinColor }) => <Ionicons name="md-reorder" size={20} color={tinColor} />
      }
    },
    Cart: {
      screen: CartScreen,
      navigationOptions: {
        title : "Cart",
        drawerIcon: ({ tinColor }) => <AntDesign name="shoppingcart" size={20} color={tinColor} />
      }
    },

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
