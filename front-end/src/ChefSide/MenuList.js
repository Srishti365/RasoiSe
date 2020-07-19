import React from 'react'
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import ViewMoreText from 'react-native-view-more-text';

const MenuList = ({result}) => {

    const renderViewMore = (onPress) => {
        return(
            <Text onPress={onPress} style={{fontWeight:'bold'}}>View more</Text>
          )
    }
    
    const renderViewLess = (onPress) => {
        return(
            <Text onPress={onPress} style={{fontWeight:'bold'}}>View less</Text>
        )
    }

    return (
        <View>
            <Card containerStyle={{marginHorizontal:10,paddingLeft:10,paddingTop:10,borderRadius:5}}> 
                <View style={{flexDirection:'row'}}>
                    <Image style={styles.imageStyle} source={{ uri: result.image}}/>
                    <View style={{marginLeft:10}}>
                        <Text style={{fontSize:15,fontWeight:'bold'}}>{result.name}</Text>
                        <Text style={{color:'gray',marginTop:5}}>Category :  <Text style={{color:'black'}}>{result.category}</Text></Text>
                        <Text style={{color:'red',marginTop:5,marginBottom:5}}>Price :  <FontAwesome name="rupee" size={13} color="black" /> <Text style={{color:'black'}}>{result.price}</Text></Text>
                        <View style={{marginRight:70}}>
                            <ViewMoreText
                                numberOfLines={3}
                                renderViewMore={renderViewMore}
                                renderViewLess={renderViewLess}
                                >
                                <Text style={{color:'gray'}}>
                                    {result.description}
                                </Text>
                            </ViewMoreText>
                        </View>

                    </View>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:20}}>
                    <TouchableOpacity style={{paddingVertical:10,width:100,alignItems:'center',borderRadius:5,backgroundColor:'rgb(237, 59, 9)'}}>
                        <Text style={{color:'white',fontSize:15}}>Remove</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingVertical:10,width:100,alignItems:'center',borderRadius:5,backgroundColor:'rgb(7, 101, 173)'}}>
                        <Text style={{color:'white',fontSize:15}}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </Card>
        </View>
    )
}


const styles = StyleSheet.create({
    imageStyle:{
        width:70,
        height:70,
        borderRadius:5
    }
});

export default MenuList;