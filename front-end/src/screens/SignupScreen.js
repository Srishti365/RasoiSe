import React, {useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import NavLink from '../components/NavLink';

const SignupScreen = ({ navigation }) => {
    const { state, signup, clearErrorMessage } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    
    return(
        <View style={styles.container}>
            <NavigationEvents 
                onWillBlur={clearErrorMessage}
            />
            <Spacer>
                <Text h3>Sign Up</Text>
            </Spacer>
            <Input label="Email" 
                value={email} 
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder='abc@gmail.com'
            />
            <Spacer />
            <Input label="Password" 
                secureTextEntry
                value={password} 
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder='password'
            />
            <Spacer />
            <Input label="Confirm Password" 
                secureTextEntry
                value={confirmPassword} 
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder='Retype password'
            />
            {state.errorMessage ? (
                <Text style={styles.errorMessage}>{state.errorMessage}</Text>
            ) : null }
            <Spacer>
                <Button title="Sign Up" onPress={() => signup({ email, password, confirmPassword })}/>
            </Spacer>
            <NavLink
                routeName="Signin"
                text="Already have an account? Sign in instead!"
            />
        </View>
    )
}

SignupScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        marginBottom:250,
        
    },
    errorMessage: {
        fontSize:16,
        color: 'red',
        marginLeft:15,
        marginTop:15
    }
});

export default SignupScreen;