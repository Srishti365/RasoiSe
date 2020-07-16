import React, {useState} from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Input } from 'react-native-elements';
import trackerApi from '../api/tracker';
import Spacer from '../components/Spacer';

const NewPasswordScreen = ({ navigation }) => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const email = navigation.getParam('email');
    const [errorMessage, setErrorMessage] = useState(null);

    const checkPassword = async (state) => {
        try{
           
            console.log(password,confirmPassword);
            const response = await trackerApi.post('/checkPassword', { email, password, confirmPassword });
          
            navigation.navigate('Signin');
            // setResults(response.data.businesses)
        }catch(err){
            console.log(err);
            setErrorMessage(err.response.data.error);
        }
        
    }


    return(
        <View>
            <Spacer/>
            <Spacer />
            <Input 
                placeholder="Enter Password"   
                value={password} 
                onChangeText={setPassword} 
               
            />
            <Input 
                placeholder="Retype Password"   
                value={confirmPassword} 
                onChangeText={setConfirmPassword} 
              
            />

            {errorMessage ? <Text style={styles.text}>{errorMessage}</Text> : null}
            <Spacer>
                <Button title="Submit" onPress={checkPassword}/>
            </Spacer>
        </View>
    )
}

NewPasswordScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};


const styles = StyleSheet.create({
    text:{
        fontSize:20,
        color:'red',
        paddingLeft:15
    }
});

export default NewPasswordScreen;