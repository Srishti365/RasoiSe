import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import Dialog, { DialogContent, SlideAnimation, DialogTitle, DialogButton, DialogFooter } from 'react-native-popup-dialog';

import trackerApi from '../api/tracker';

// rendering single item from list of items in the cart

const CartList = ({ result, callback, onEdit }) => {
    const [serr, setErr] = useState('')
    const [quantity, setQuantity] = useState(result.quantity)
    const [removeVisible, setRemoveVisible] = useState(false);

    // console.log(result);


    const decreament = () => {
        // console.log('decreament')
        if (quantity > 1) {
            setQuantity(quantity - 1)
        } else if (quantity == 1) {
            // console.log('hii')
            callback(result._id)
        }
    }

    const increament = () => {
        // console.log('increament')
        setQuantity(quantity + 1)
    }

    // const RemoveItem = async (removeId) => {
    //     try {

    //         console.log('remove item');

    //         const response = await trackerApi.post('/cart/remove', { id: removeId });
    //         console.log(response.status);
    //         // console.log(result);
    //         setRemoveVisible(false);
    //         callback(result._id);



    //     }
    //     catch (err) {
    //         console.log(err);
    //         setErr('Something went wrong');
    //     }
    // }

    return (
        <View style={{ paddingBottom: 20, borderBottomWidth: 1, borderColor: 'rgb(240,240,240)', paddingTop: 15 }}>
            <View style={{ flexDirection: 'row' }}>
                <Image source={{ uri: result.menuItem.image }} style={{ width: 70, height: 70, borderRadius: 5 }} />
                <View style={{ marginLeft: 15, flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {result.menuItem.category == 'veg' ?
                            <Image source={require('../../assets/veg.png')} style={{ width: 15, height: 15 }} /> : <Image source={require('../../assets/non-veg.png')} style={{ width: 15, height: 15 }} />}
                        <Text style={{ fontSize: 16, textTransform: 'capitalize', color: 'rgb(0, 15, 102)' }}> {result.menuItem.name}</Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                            <FontAwesome name='rupee' size={13} style={{ marginTop: 2 }} />
                            <Text style={{ fontWeight: 'bold' }}> {result.menuItem.price}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'rgb(145, 253, 255)', marginTop: 5, fontSize: 15 }}>Free Delivery</Text>
                            <TouchableOpacity style={{ width: 25, height: 25, borderWidth: 2, borderRadius: 20, marginLeft: 'auto', borderColor: 'rgb(240,240,240)', justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => decreament()}
                            >
                                <AntDesign name="minus" size={15} color="black" />
                            </TouchableOpacity>
                            <Text style={{ paddingHorizontal: 10, paddingVertical: 4 }}>{quantity}</Text>
                            <TouchableOpacity style={{ width: 25, height: 25, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(240,240,240)' }}
                                onPress={() => increament()}
                            >
                                <AntDesign name="plus" size={15} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <TouchableOpacity style={{ width: 90, borderWidth: 1, height: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderColor: 'rgb(220,220,220)', marginLeft: 'auto' }}
                            activeOpacity={0.8}
                            onPress={() => onEdit(result._id, quantity)}
                        >
                            <Text>EDIT</Text>
                        </TouchableOpacity>
                        {/* onPress={() => callback(result._id)} */}
                        <TouchableOpacity style={{ width: 90, borderWidth: 1, height: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderColor: 'rgb(220,220,220)', marginLeft: 20 }}
                            activeOpacity={0.8}
                            onPress={() => callback(result._id)}
                        >
                            <Text>REMOVE</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <Dialog
                        onHardwareBackPress={() => setRemoveVisible(false)}
                        visible={removeVisible}
                        dialogTitle={<DialogTitle title="Remove From Cart" />}
                        onTouchOutside={() => {
                            setRemoveVisible(false)
                        }}
                        width={200}
                        footer={
                            <DialogFooter>
                                <DialogButton
                                    text="NO"
                                    onPress={() => setRemoveVisible(false)}
                                />
                                <DialogButton
                                    text="YES"
                                    onPress={() => RemoveItem(result._id)}
                                />
                            </DialogFooter>
                        }
                    >
                        <DialogContent >
                            <Text style={{ marginTop: 10, color: 'red', alignSelf: 'center', fontSize: 20 }}>Are you sure ?</Text>
                        </DialogContent>
                    </Dialog> */}
                </View>
            </View>
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