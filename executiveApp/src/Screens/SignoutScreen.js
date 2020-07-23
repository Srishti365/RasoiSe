import React,{ useEffect } from 'react';
import { Text, View, AsyncStorage } from 'react-native';

const signout = async() => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('email');
    navigation.navigate('Signin')
}

const SignoutScreen = ({navigation}) => {

    const signout = async() => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('email');
        navigation.navigate('Signin')
    }

    useEffect(() => {
        signout()
    },[])

    return(
        null
    )
}


export default SignoutScreen;
