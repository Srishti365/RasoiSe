import React, { useState, useDebugValue } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import trackerApi from '../api/tracker';

// user verification after sending otp here

const VerifyScreen = ({ navigation }) => {
    const [state, setState] = useState('')
    const email = navigation.getParam('email');
    const [errorMessage, setErrorMessage] = useState(null);

    // const VerifyEmail = () => {
    //     return async (state) => {
    //         const response = await trackerApi.post('/verify', { token:state })
    //         console.log('working!!');
    //     }
    // }

    const VerifyEmail = async (state) => {
        try {
            const response = await trackerApi.post('/verify', { email, token: state });
            navigation.navigate('Signin');

        } catch (err) {
            setErrorMessage(err.response.data.error);
        }

    }


    return (
        <View style={{marginTop:20}}>
            <Input placeholder="Enter code" value={state} onChangeText={setState} onEndEditing={() => VerifyEmail(state)} />
            {errorMessage ? <Text style={styles.text}>{errorMessage}</Text> : null}
        </View>
    )
}

VerifyScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};

const styles = StyleSheet.create({
    text: {
        fontSize: 20
    }
});

export default VerifyScreen;