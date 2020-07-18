import React, { useState, useContext } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { Context as AuthContext } from '../context/AuthContext';
import { NavigationEvents } from 'react-navigation';
import NavLink from '../components/NavLink';
import Button from "react-native-button";
import { AppStyles } from "../AppStyles";


const ChefSigninScreen = ({ navigation }) => {

    const { state, chefSignin, clearErrorMessage } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  

    const appear = () => {
        {clearErrorMessage}
        setEmail('')
        setPassword('')
    }

    return(
        <View style={styles.container}>
            <NavigationEvents 
                onWillBlur={appear}
            />
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
                {state.errorMessage ? (
                    <Text style={{color:'red'}}>{state.errorMessage}</Text>
                ) : null }
            </View>
            <Button
            containerStyle={styles.loginContainer}
            style={styles.loginText}
            onPress={() => chefSignin({ email, password })}
            >
            Log in
            </Button>
            <NavLink
                routeName="ChefSignup"
                text="Don't have an account? Sign Up instead!"
            />
            <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
                <Text style={{color:'red'}}>forgot password</Text>
            </TouchableOpacity>
      </View>
    )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      marginTop:100
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
    },
    facebookContainer: {
      width: AppStyles.buttonWidth.main,
      backgroundColor: AppStyles.color.facebook,
      borderRadius: AppStyles.borderRadius.main,
      padding: 10,
      marginTop: 30
    },
    facebookText: {
      color: AppStyles.color.white
    },
    skip:{
      height:40,
      width:70,
      borderWidth:1,
      marginRight:10,
      marginTop:20,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:10,
      backgroundColor:'white',
      borderColor:'white',
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,

      elevation: 24,
    }
  });

export default ChefSigninScreen;