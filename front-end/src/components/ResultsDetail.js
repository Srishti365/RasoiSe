import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card, Rating } from 'react-native-elements';
import Communications from 'react-native-communications';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

// rendering single item in the menu


const ResultsDetail = ({ result, index, callback }) => {
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

    const phone = <FontAwesome style={{ paddingRight: 5 }} name="phone" size={20} color="black" />;


    return (

        // </View>
        <TouchableOpacity activeOpacity={0.98} onPress={callback}>
            {index % 2 == 0 ?
                <Card containerStyle={{ marginTop: 50, borderWidth: 0, borderRadius: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Image style={styles.leftImage} source={{ uri: result.image }} />
                        <View style={{ marginLeft: 16 }}>
                            <Text style={{ color: 'rgb(0, 15, 102)', fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>{result.name}</Text>
                            <Rating imageSize={15} readonly startingValue={result.rating} style={{ marginBottom: 10, marginRight: 60 }} />
                            <Text style={{ color: 'rgb(169, 174, 201)', fontSize: 10 }}>{result.location}</Text>
                        </View>

                        {/* <View style={{ height: 20, width: 60, alignItems: 'center', justifyContent: 'center', backgroundColor: '#2CC2DC', borderRadius: 10, marginLeft: -20 }}></View> */}

                        <View style={{ height: 20, width: 60, alignItems: 'center', justifyContent: 'center', backgroundColor: '#2CC2DC', borderRadius: 10, marginLeft: -20 }}>
                            <Text style={{ fontSize: 12, color: 'white' }}>Free Ship</Text>
                        </View>

                    </View>
                </Card>
                :
                <Card containerStyle={{ marginTop: 50, borderWidth: 0, borderRadius: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <View style={{ marginLeft: 2 }}>
                            <Text style={{ color: 'rgb(0, 15, 102)', fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>{result.name}</Text>
                            <Rating imageSize={15} readonly startingValue={result.rating} style={{ marginBottom: 10, marginRight: 60 }} />
                            <Text style={{ color: 'rgb(169, 174, 201)', fontSize: 10 }}>{result.location}</Text>
                        </View>
                        <View style={{ height: 20, width: 60, alignItems: 'center', backgroundColor: '#2CC2DC', borderRadius: 10, marginRight: 15, marginLeft: -10 }}>
                            <Text style={{ fontSize: 12, color: 'white' }}>Free Ship</Text>
                        </View>
                        <Image style={styles.rightImage} source={{ uri: result.image }} />
                    </View>
                </Card>
            }
            {/* <Card containerStyle={{borderRadius:10}}>
                <View style={{flexDirection:'row'}}>
                        <Image style={styles.imageStyle} source={{ uri: result.image}}/>
                        <View style={{width:150, justifyContent:'space-evenly'}}>
                            <View style={{marginLeft:20 }}>
                                <Text style={{fontWeight:'bold'}}>{result.name}</Text>
                            </View>
                            
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
            </Card> */}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {

        marginLeft: 15,
        flexDirection: 'row',
        paddingVertical: 18,
        borderBottomWidth: 0.2,
        borderBottomColor: 'gray'
    },
    leftImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: -40,
    },
    rightImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: -40
    },
    name: {
        paddingTop: 10,
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: "capitalize"
    },
    location: {
        paddingTop: 5,
        textTransform: "capitalize"

    },
    button: {
        paddingTop: 15,
        // backgroundColor:'white',
        // borderColor:'blue'

    },
    iconStyle: {
        fontSize: 10
    },
    text: {
        color: 'white'
    },
    myButton: {
        width: 40,
        height: 30,
        alignItems: 'center',
        backgroundColor: 'green',
        borderRadius: 5,
        marginRight: 10,
        paddingTop: 5
    }
});


export default ResultsDetail;