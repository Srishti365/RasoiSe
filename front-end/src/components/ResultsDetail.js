import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card, Rating } from 'react-native-elements';
import Communications from 'react-native-communications';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';


const ResultsDetail = ({ result, callback }) => {
    // console.log(result.image);
    // var ratings = [];

	// for(let i = 0; i < parseInt(result.rating); i++){

	// 	ratings.push(
	// 		<View key = {i}>
	// 			<Entypo name="star" style={styles.iconStyle}/>
	// 		</View>
	// 	)
    // }
    var phone_number = result.phone.toString()

    const phone = <FontAwesome style={{paddingRight:5}} name="phone" size={20} color="black" />;
    

    return (
        // <View style={styles.container}>
        //     <Image style={styles.imageStyle} source={{ uri: result.image}} />
        //     <View style={{ flexDirection:'column', marginLeft:15, flex:1}}>
        //         <Text style={styles.name}>{result.name}</Text>
        //         <Text style={styles.location}>{result.location}</Text>
        //         <View style={styles.button}>
        //         <Button title='View Details' type="outline" onPress={callback} />
        //     </View>
        //     </View>
            
        //     <View style={styles.myButton}>
        //         <Text style={styles.text}>{resultsRating}</Text>
        //   </View>
           
            
            
        // </View>
        <TouchableOpacity activeOpacity={0.98} onPress={callback}>
            <Card containerStyle={{borderRadius:10}}>
                <View style={{flexDirection:'row'}}>
                        <Image style={styles.imageStyle} source={{ uri: result.image}}/>
                        <View style={{width:150, justifyContent:'space-evenly'}}>
                            <View style={{marginLeft:20 }}>
                                <Text style={{fontWeight:'bold'}}>{result.name}</Text>
                            </View>
                            {/* <Text style={{marginLeft:20}}>{result.location.city}</Text> */}
                                <Rating imageSize={15} readonly startingValue={result.rating}/>
                            <View style={{marginLeft:20 }}>
                                <Text>345 Reviews</Text>
                            </View>
                        </View>
                        <View>
                                    
                            <TouchableOpacity style={{elevation:5, flexDirection:'row', padding:5,borderRadius:6, backgroundColor:"#86dfe5",marginLeft:10}}  onPress={() => Communications.phonecall(phone_number,true)} >
                                {phone}
                            <Text style={{color:'black', fontSize:15}} >Call</Text>
                            </TouchableOpacity>
            
                        </View>
                        
                </View>
                <View style={{marginLeft:100}}>
                    <Text>Contact No. {result.phone}</Text>
                </View>
                <View> 
                    <View style={{height:30,justifyContent:'center',marginLeft:10}}>
                        <Text>ADDRESS</Text>
                    </View>
                    <View style={{borderWidth:1,height:50,flexDirection:'row',paddingLeft:20,alignItems:'center',borderRadius:5,borderColor:'rgb(218, 221, 227)'}}>
                        <FontAwesome5 name="location-arrow" size={20} color="black" />
                        <Text style={{fontSize:15}}>   {result.location}</Text>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
        container:{
        
            marginLeft:15,
            flexDirection:'row',
            paddingVertical:18,
            borderBottomWidth:0.2,
            borderBottomColor:'gray'
        },
        imageStyle:{
            width:80,
            height:80,
            borderRadius:7,
            marginBottom:5,
        }, 
        name:{
            paddingTop:10,
            fontWeight:'bold',
            fontSize:18,
            textTransform:"capitalize"
        },
        location:{
            paddingTop:5,
            textTransform:"capitalize"

        },
        button:{
            paddingTop:15,
            // backgroundColor:'white',
            // borderColor:'blue'
           
        },
        iconStyle: {
            fontSize: 10
        },
        text:{
            color:'white'
        },
        myButton:{
            width:40,
            height:30,
            alignItems:'center',
            backgroundColor:'green',
            borderRadius:5,
            marginRight:10,
            paddingTop:5
        }
});


export default ResultsDetail;