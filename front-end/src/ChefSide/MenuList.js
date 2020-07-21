import React from 'react'
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Dimensions } from 'react-native';
import { Card } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
const { height, width } = Dimensions.get('window');

const MenuList = ({result, callback}) => {

    return (
        <TouchableOpacity activeOpacity={0.9} onPress={() => callback(result._id)}>
            <Card containerStyle={{marginHorizontal:10,paddingLeft:10,paddingTop:10,borderRadius:5,width:width/2-20,marginHorizontal:10,marginTop:40,borderRadius:10,borderWidth:0,elevation:24,marginBottom:10}}> 
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Image style={styles.imageStyle} source={{ uri: result.image}}/>
                    <Text style={{fontWeight:'bold',fontSize:15,marginTop:10,color:'rgb(0, 15, 102)'}}>{result.name}</Text>
                    <Text style={{color:'gray',marginTop:5}}>category : {result.category}</Text>
                    <Text style={{marginTop:5,color:'red',marginBottom:10}}><FontAwesome name='rupee'/><Text> {result.price}</Text></Text>
                </View>
            </Card>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    imageStyle:{
        width:100,
        height:100,
        borderRadius:50,
        marginTop:-30
    }
});

export default MenuList;