import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';



const AddressBar = ({address, onClick}) => {
    return (
        <TouchableOpacity onPress={onClick} style={{marginTop:5}}> 
            <View style={{flexDirection:'row',borderColor:'white',backgroundColor:'white', height:50, paddingVertical:5}}>
                <EvilIcons name='location' size={40} style={{padding:5}}/>
                <Text  numberOfLines={1} style={{marginTop:8, fontSize:17}}>{address}</Text>
    
            </View>
        </TouchableOpacity>
      
    );
};


export default AddressBar;