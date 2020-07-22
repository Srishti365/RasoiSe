import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Header } from 'react-native-elements';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { string } from 'prop-types';
import trackerApi from '../api/tracker';
import { set } from 'react-native-reanimated';


const ResultShowDetail = ({ result }) => {
    const [quantity, setQuantity] = useState(0);
    const [errMessage, setErrorMessage] = useState('');

    const addToCart = async (id, quantity) => {
        try {
            console.log(id, quantity);
            const response = await trackerApi.post('/cart/add', { menuitemid: id, quantity: quantity, chefid: result.chef });
            // console.log(response.data.chefs);
            console.log(response.data);
        }
        catch (err) {
            console.log(err);
            setErrorMessage('Something went wrong');
        }
    }

    console.log(result)

    return (
        <>
            <View style={styles.container}>
                <Image style={styles.imageStyle} source={{ uri: result.image }} />
                <View style={{marginLeft:15,marginTop:5,flex:1}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        {result.category=='veg' ? 
                        <Image source={require('../../assets/veg.png')} style={{width:15,height:15}}/> : <Image source={require('../../assets/non-veg.png')} style={{width:15,height:15}}/>}
                        <Text style={{fontSize:15}}>  {result.name}</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:5}}>
                        <View>
                            <Text style={{}}>Price: <FontAwesome name="rupee" /> {result.price}</Text>
                            <Text style={{width:150,color:'gray'}}>{result.description}</Text>
                        </View>
                        {quantity == 0 ? 
                            <TouchableOpacity style={{width:75,height:30,borderWidth:1,marginLeft:'auto',marginRight:20,paddingVertical:2,alignItems:'center',borderRadius:5,flexDirection:'row',justifyContent:'center',borderColor:'rgb(161, 153, 153)',backgroundColor:'white'}}
                                activeOpacity={0.6}
                                onPress={() => setQuantity(quantity+1)}
                            >
                                <AntDesign name='plus' size={15} color='red'/>
                                <Text>  ADD</Text>
                            </TouchableOpacity>
                        :
                        <View style={{ flexDirection: 'column',marginTop:-30, marginLeft:'auto',marginRight:20}}>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => setQuantity(quantity - 1)}>
                                    <View style={styles.myButton}>
                                        <AntDesign name="minus" style={styles.minusStyle} />
                                    </View>
                                </TouchableOpacity>

                                <Text style={styles.text}>{quantity} </Text>
                                <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                                    <View style={styles.myButton}>
                                        <Ionicons name="ios-add" style={styles.iconStyle} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => { addToCart(result._id, quantity) }}>
                                    <View style={styles.myButton1}>
                                        <Text>ADD</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.text1}>customizable</Text>

                        </View>
                    }
                    </View>
                </View>
            </View>
        </>
    );
};



const styles = StyleSheet.create({
    imageStyle: {
        width: 70,
        height: 70,
        borderRadius: 7,
        marginTop: 5,
        marginLeft:10

    },
    container: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 0.2,
        borderBottomColor: 'gray',
        backgroundColor:'rgb(250,250,250)'
    },
    name: {
        paddingTop: 10,
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: "capitalize",
        paddingLeft: 10
    },
    category: {
        paddingTop: 5,
        textTransform: "capitalize",
        paddingLeft: 10

    },
    price: {
        paddingTop: 4,
        paddingLeft: 10

    },
    description: {
        paddingTop: 2,
        paddingLeft: 10,
        textTransform: "capitalize",
    },
    text: {
        color: 'black',
        paddingTop: 35,
        marginLeft: 3,
        paddingHorizontal: 5,
        fontSize: 13
    },
    text1: {
        color: 'orange',
        fontSize: 12,
        marginTop: 4
    },
    myButton: {
        width: 25,
        height: 28,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: 30,
        textAlign: 'center',
        borderColor: 'black',
        borderWidth: 0.3,

    },
    iconStyle: {
        // fontSize: 15,
        // alignSelf: 'center',
        // marginHorizontal: 15
        color: 'red',
        paddingTop: 6,
        marginLeft: 2,
        fontSize: 13
    },
    minusStyle: {
        color: 'red',
        paddingTop: 5,
        marginLeft: 2,
        fontSize: 15
    },
    myButton1: {
        width: 70,
        height: 28,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: 8,
        paddingTop: 4,
        textAlign: 'center',
        borderColor: 'black',
        borderWidth: 0.3,

    },
});


export default ResultShowDetail;