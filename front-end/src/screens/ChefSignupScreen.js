import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, TextInput, FlatList, KeyboardAvoidingView } from "react-native";
import Button from "react-native-button";
import { NavigationEvents } from 'react-navigation';
import { AppStyles } from "../AppStyles";
import { Context as AuthContext } from '../context/AuthContext';
import NavLink from '../components/NavLink';
import axios from 'axios';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";

const Api_key = 'kwfqzzg4RYxI2TYTdDXARWD-Cmvxk2kcP4KaHj84RQw'

const ChefSignupScreen = ({ navigation }) => {

    const { state, chefSignup, clearErrorMessage } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('')
    const [password, setPassword] = useState('');
    const [result,setResult] = useState([]);
    const [phone,setPhone] = useState()

    const keyExtractor = (item, index) => index.toString()

    const handleAddress = (location) => {
      setLocation(location)
      getAddress(location)
    }

    const getAddress = async (location) => {
      if(location.length>2){
        const response = await axios.get(`https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=${Api_key}&query=${location}`)
        const data = response.data.suggestions
        setResult(data);
      }
      if(location.length<=2){
        setResult([])
      }
    }

    const renderItem = ({ item }) => (
      <TouchableOpacity 
        style={{borderWidth:1,marginHorizontal:30,marginVertical:5,paddingVertical:10,flexDirection:'row',paddingRight:50,paddingLeft:10,borderRadius:100}}
        activeOpacity={0.5}
        onPress={() => {
          setLocation(item.label)
          setResult([])
        }}
      >
        <Entypo name="location-pin" size={24} color="black" />
        <Text>  {item.label}</Text>
      </TouchableOpacity>
    )

   
    return(
        <KeyboardAvoidingView style={styles.container} behavior='height'>
          <NavigationEvents 
                onWillBlur={clearErrorMessage}
          />
        <Text style={[styles.title, styles.leftTitle]}>Create new account</Text>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Kitchen name"
            onChangeText={name => setName(name)}
            value={name}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Address"
            onChangeText={location => handleAddress(location)}
            onEndEditing={data => {
              setResult([])
              setLocation(location)
            }}
            value={location}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="E-mail Address"
            onChangeText={email => setEmail(email)}
            value={email}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Phone Number"
            onChangeText={number => setPhone(number)}
            value={phone}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={password => setPassword(password)}
            value={password}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={{marginTop:10}}>
        {state.errorMessage ? (
            <Text style={{ color:'red'}}>{state.errorMessage}</Text>
        ) : null }
        </View>
        <Button
          containerStyle={[styles.facebookContainer, { marginTop: 30 }]}
          style={styles.facebookText}
          onPress={() => chefSignup({ name, location, email, password , phone})}
        >
          Sign Up
        </Button>
        <NavLink
            routeName="ChefSignin"
            text="Already have an account? Sign in instead!"
        />
        <View style={{width:'100%',bottom:340,backgroundColor:'rgb(244,244,244)'}}>
          {location.length>2 ?
            <FlatList
                keyExtractor={keyExtractor}
                data={result}
                renderItem={renderItem}
            />
          : null }
        </View>
      </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      flex:1
    },
    title: {
      fontSize: AppStyles.fontSize.title,
      fontWeight: "bold",
      color: AppStyles.color.tint,
      marginTop: 10
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
      marginTop: 25,
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
      backgroundColor: AppStyles.color.tint,
      borderRadius: AppStyles.borderRadius.main,
      padding: 10,
      marginTop: 30
    },
    facebookText: {
      color: AppStyles.color.white
    }
  });


export default ChefSignupScreen;