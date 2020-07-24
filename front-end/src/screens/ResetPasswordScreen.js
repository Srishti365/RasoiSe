import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import trackerApi from '../api/tracker';

// password reset screen

const ResetPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null);

    const checkEmail = async (state) => {
        try {

            const response = await trackerApi.post('/checkEmail', { email });
            navigation.navigate('Otp', { email })
        } catch (err) {
            setErrorMessage(err.response.data.error);
        }

    }

    return (
        <View>
            <Spacer />
            <Spacer />
            <Input label="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder='Enter your email'
            />

            {errorMessage ? <Text style={styles.text}>{errorMessage}</Text> : null}
            <Spacer>
                <Button title="Submit" onPress={checkEmail} />
            </Spacer>
        </View>
    )
}


ResetPasswordScreen.navigationOptions = () => {
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

export default ResetPasswordScreen;