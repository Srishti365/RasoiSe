import React, {useState} from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, AsyncStorage } from "react-native";
import Button from "react-native-button";
import { AppStyles } from "../AppStyles";
import trackerApi from '../api/tracker';



const SigninScreen = ({navigation}) => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errMsg,setErrMsg] = useState(null)

    
    const signin = async () => {
        try {
            const response = await trackerApi.post('/executive/signin', { email, password });
            await AsyncStorage.setItem('token', response.data.token);
            await AsyncStorage.setItem('email', email);
            navigation.navigate('AppStack')
        } catch (err) {
            console.log(err.response.data);
            setErrMsg(err.response.data.error)
        }
    }

  
    return(
        <View style={styles.container}>
        <View style={{flexDirection:'row',justifyContent:'center'}}>
          <Text style={[styles.title, styles.leftTitle]}>Sign In</Text>
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Enter E-mail"
            onChangeText={email => setEmail(email)}
            value={email}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={password => setPassword(password)}
            value={password}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View>
          {!errMsg ? null : <Text style={{color:'red',marginTop:10}}>{errMsg}</Text>}
        </View>
        <Button
          containerStyle={styles.loginContainer}
          style={styles.loginText}
          onPress = {signin}
     
        >
          Log in
        </Button>
      </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop:150,
        flex: 1,
        alignItems: "center"
    },
    or: {
      fontFamily: AppStyles.fontName.main,
      color: "black",
      marginTop: 40,
      marginBottom: 10
    },
    title: {
      fontSize: AppStyles.fontSize.title,
      fontWeight: "bold",
      color: AppStyles.color.tint,
      marginTop: 20,
      marginBottom: 20,
      marginRight:'auto'
    },
    leftTitle: {
      alignSelf: "stretch",
      textAlign: "left",
      marginLeft: 20
    },
    content: {
      paddingLeft: 50,
      paddingRight: 50,
      textAlign: "center",
      fontSize: AppStyles.fontSize.content,
      color: AppStyles.color.text
    },
    loginContainer: {
      width: AppStyles.buttonWidth.main,
      backgroundColor: AppStyles.color.tint,
      borderRadius: AppStyles.borderRadius.main,
      padding: 10,
      marginTop: 30
    },
    loginText: {
      color: AppStyles.color.white
    },
    placeholder: {
      fontFamily: AppStyles.fontName.text,
      color: "red"
    },
    InputContainer: {
      width: AppStyles.textInputWidth.main,
      marginTop: 30,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: AppStyles.color.grey,
      borderRadius: AppStyles.borderRadius.main
    },
    body: {
      height: 42,
      paddingLeft: 20,
      paddingRight: 20,
      color: AppStyles.color.text
    }
  });

export default SigninScreen;