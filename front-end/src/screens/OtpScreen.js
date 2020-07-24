import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import trackerApi from '../api/tracker';
import Spacer from '../components/Spacer';

// enter otp screen

const OtpScreen = ({ navigation }) => {
    const [state, setState] = useState('')
    const email = navigation.getParam('email');
    const [errorMessage, setErrorMessage] = useState(null);

    // const VerifyEmail = () => {
    //     return async (state) => {
    //         const response = await trackerApi.post('/verify', { token:state })
    //         console.log('working!!');
    //     }
    // }

    const OtpVerify = async (state) => {
        try {
            // console.log('hii')
            const response = await trackerApi.post('/otpVerify', { email, otp: state });
            navigation.navigate('NewPassword', { email })
        } catch (err) {
            setErrorMessage(err.response.data.error);
        }

    }


    return (
        <View>
            <Spacer />
            <Spacer />
            <Input placeholder="Enter code" value={state} onChangeText={setState} onEndEditing={() => OtpVerify(state)} />
            {errorMessage ? <Text style={styles.text}>{errorMessage}</Text> : null}
        </View>
    )
}

OtpScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};


const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        paddingLeft: 15,
        color: 'red'

    }
});

export default OtpScreen;