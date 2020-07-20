import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';

import trackerApi from '../api/tracker';

const CartList = ({ result, callback }) => {
    const [serr, setErr] = useState('')

<<<<<<< HEAD
=======
    // const RemoveItem = async (id) => {
    //     try {

    //         console.log('hii');
    //         const response = await trackerApi.post('/cart/remove', { id: id });
    //         // console.log(response.data.chefs);
    //         //    setResult(response.data.items);
    //         console.log(result);
    //         navigation.navigate('Cart');
    //     }
    //     catch (err) {
    //         console.log(err);
    //         setErr('Something went wrong');
    //     }
    // }
>>>>>>> e0bf1d6b1087a98b7ce6e13af265ca9ccef2c3bb

    console.log('inside cartlist')
    console.log(result)

    return (
        <View style={styles.container}>
            {/* <Text style={styles.name}>{result.name}'s Kitchen</Text>
            <Text>Location: {result.location}</Text> */}

            <Image style={styles.imageStyle} source={{ uri: result.menuItem.image }} />
            <View style={{ flexDirection: 'column', marginLeft: 15, flex: 1 }}>
                <Text style={styles.name}>{result.menuItem.name}</Text>
                <Text style={styles.location}>Quantity: {result.quantity}</Text>
                <Text style={styles.location}>Price: Rs.{result.price}</Text>

            </View>
            <Button title="Remove" type="outline" onPress={() => callback(result._id)} />




        </View>

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
    imageStyle: {
        width: 120,
        height: 120,
        borderRadius: 4,
        marginBottom: 5,
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


export default CartList;