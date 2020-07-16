// import React from 'react';
// import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';

// import SignoutScreen from './src/screens/SignoutScreen';
// import SigninScreen from './src/screens/SigninScreen';
// import SignupScreen from './src/screens/SignupScreen';
// import TrackCreateScreen from './src/screens/TrackCreateScreen';
// import TrackDetailScreen from './src/screens/TrackDetailScreen';
// import TrackListScreen from './src/screens/TrackListScreen';
// import { Provider as AuthProvider } from './src/context/AuthContext';
// import { setNavigator } from './src/navigationRef';
// import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
// import VerifyScreen from './src/screens/VerifyScreen';
// import SearchScreen from './src/screens/SearchScreen';


// const switchNavigator = createSwitchNavigator({
//   ResolveAuth: ResolveAuthScreen,
//   loginFlow: createStackNavigator({
//     Signin: SigninScreen,
//     Signup: SignupScreen,
//     Verify: VerifyScreen
//   }),
//   mainFlow: createBottomTabNavigator({
//     trackListFlow: createStackNavigator({
//       TrackList: TrackListScreen,
//       TrackDetail: TrackDetailScreen,
//       Search: SearchScreen
//     }),
//     TrackCreate: TrackCreateScreen,
//     Signout: SignoutScreen
//   })
// });


// const App = createAppContainer(switchNavigator);

// export default () => {
//   return (
//     <AuthProvider>
//       <App
//         ref={(navigator) => {
//           setNavigator(navigator)
//         }}
//       />
//     </AuthProvider>
//   )
// };


import React from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import SignoutScreen from './src/screens/SignoutScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
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
import { Feather } from '@expo/vector-icons';
import ResultsShowScreen from './src/screens/ResultsShowScreen';
import CartScreen from './src/screens/CartScreen';


const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
    Signup: SignupScreen,
    Verify: VerifyScreen,
    ResetPassword: ResetPasswordScreen,
    Otp: OtpScreen,
    NewPassword: NewPasswordScreen
  }),
  // mainFlow: createBottomTabNavigator({
  //   trackListFlow: createStackNavigator({
  //     TrackList: TrackListScreen,
  //     TrackDetail: TrackDetailScreen
  //   }),
  //   TrackCreate: TrackCreateScreen,
  //   Signout: SignoutScreen
  // mainflow: createDrawerNavigator({
  //   Signout: SignoutScreen
  mainflow: createDrawerNavigator({
    //TrackList: TrackListScreen,
    searchflow: createStackNavigator({
      Search: SearchScreen,
      ResultsShow: ResultsShowScreen,
      Cart:CartScreen
    }),

    // TrackDetail: TrackDetailScreen,
    // Signout:SignoutScreen
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: "Profile",
        drawerIcon: ({ tinColor }) => <Feather name="user" size={16} color={tinColor} />
      }
    },
    Paypal: PaypalScreen,
    // Signout: SignoutScreen

    // MessageScreen:{
    //   screen:MessageScreen,
    //   navigationOptions:{
    //     title:"Message",
    //     drawerIcon:({ tinColor }) => <Feather name="message-square" size={16} color={tinColor} />
    //   }
    // },
    // ActivityScreen:{
    //   screen:ActivityScreen,
    //   navigationOptions:{
    //     title:"Activity",
    //     drawerIcon:({ tinColor }) => <Feather name="activity" size={16} color={tinColor} />
    //   }
    // },
    // ListScreen:{
    //   screen:ListScreen,
    //   navigationOptions:{
    //     title:"List",
    //     drawerIcon:({ tinColor }) => <Feather name="list" size={16} color={tinColor} />
    //   }
    // },
    // ReportScreen:{
    //   screen:ReportScreen,
    //   navigationOptions:{
    //     title:"Reports",
    //     drawerIcon:({ tinColor }) => <Feather name="bar-chart" size={16} color={tinColor} />
    //   }
    // },
    // StatisticScreen:{
    //   screen:StatisticScreen,
    //   navigationOptions:{
    //     title:"Statistics",
    //     drawerIcon:({ tinColor }) => <Feather name="trending-up" size={16} color={tinColor} />
    //   }
    // },
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