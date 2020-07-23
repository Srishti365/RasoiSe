import React, { useContext } from 'react';

import {View, Text, StyleSheet, ScrollView, ImageBackground, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import { Context as AuthContext} from '../context/AuthContext';

import { Ionicons, Feather} from '@expo/vector-icons';

class Foo{
    async doStuff(){
      return email = await AsyncStorage.getItem('email');
    } 
  }
  
let foo = new Foo()
var email = foo.doStuff()

export default Sidebar = (props) => {

    const { signout } = useContext(AuthContext);

    return (
        <ScrollView>
            <ImageBackground 
                source={require('../../assets/image.png')} 
                style={{width:undefined, padding:16, paddingTop:40}}>

                <Image source={require('../../assets/profile.png')} style={styles.profile} />
                <Text style={styles.name}> {email} </Text>

                <View style={{ flexDirection: "row"}}>
                    <Text style={styles.followers}>734 followers</Text>
                    <Ionicons name="md-people" size={16} color="rgba(255,255,255, 0.8)"></Ionicons>
                </View>
            </ImageBackground>
            <View style={styles.container}>
                <DrawerNavigatorItems {...props} />
                <TouchableOpacity style={{marginHorizontal:10,flexDirection:'row',alignItems:'center',height:50,borderRadius:5}} onPress={signout} activeOpacity={0.9}>
                    <Feather name='log-out' size={20} style={{marginLeft:15}}/>
                    <Text style={{fontWeight:'bold',marginLeft:40}}>SignOut</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}



const styles = StyleSheet.create({
    container:{
        flex:1
    },
    profile:{
        width: 80,
        height: 80,
        borderRadius:40,
        borderWidth:3,
        borderColor:"#FFF"
    },
    name:{
        color:"#FFF",
        fontSize: 15,
        fontWeight: "800",
        marginVertical: 8
    },
    followers:{
        color:"rgba(255,255,255,0.8)",
        fontSize:13,
        marginRight:4
    }
});