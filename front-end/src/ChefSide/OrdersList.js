import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import trackerApi from '../api/tracker';
import { Card } from 'react-native-elements';
import { Entypo, FontAwesome } from '@expo/vector-icons';

const OrdersList = ({ navigation }) => {
    const [err, setErr] = useState('');
    const [ordersList, setOrdersList] = useState({});
    const [visible,setVisible] = useState(false)


    const viewOrderList = async () => {
        try {
            const orderId = navigation.getParam('id');
            const response = await trackerApi.post('/cook/viewparticularorder', { id: orderId });
            console.log('list',response.data.orders);
            setOrdersList(response.data.orders);
            setVisible(true)

        }
        catch (err) {
            console.log(err);
            setErr('Something went wrong');
        }

    }


    const confirmOrder = async () => {
        try {
            const orderId = navigation.getParam('id');
            console.log('orderId',orderId);
            const response = await trackerApi.post('/cook/confirmorder', { id: orderId });
            // console.log(response.data);
            navigation.navigate('Orders');
            // setOrdersList(response.data.orders);


        }
        catch (err) {
            console.log(err);
            setErr('Something went wrong');
        }
    }

    
   

    useEffect(() => {
        viewOrderList();
    }, [])

    // console.log(navigation);

    return (
        <View>
            {visible ? 
                <ScrollView showsVerticalScrollIndicator={false} >
                <Card containerStyle={{borderWidth:0,elevation:10,borderRadius:10}}>
                    <View style={{paddingBottom:10}} >
                        <View style={{borderBottomWidth:1,paddingBottom:10,borderColor:'rgb(240,240,240)'}}>
                            <Text style={{alignSelf:'center',fontSize:17, color:'rgb(0,15,102)'}}>Order Details</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                            <Text style={{fontWeight:'bold',fontSize:15}}>Ordered By : </Text> 
                            <Text style={{marginLeft:'auto',fontSize:13,color:'gray'}}>{ordersList.user.email}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:5,marginLeft:-5}}>
                            <Entypo name="location-pin" size={24} color="gray" />
                            <Text style={{color:'gray'}}> {ordersList.delivery_add}</Text>
                        </View>
                    </View>
                    <FlatList
                        showsVerticalScrollIndicator
                        data={ordersList.orderItems}
                        keyExtractor={(ordersID) => ordersList.orderItems._id}
                        renderItem={({ item }) => {
                            return (
                                <View style={{marginTop:10,borderTopWidth:1,paddingVertical:10,borderColor:'rgb(240,240,240)',flexDirection:'row'}}>
                                    <View>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <Text style={{fontWeight:'bold',fontSize:17}}>{item.menuItem.name} </Text>
                                            <Entypo name="cross" size={20} color="black" />
                                            <Text style={{fontWeight:'bold',fontSize:17}}>{item.quantity} </Text>
                                        </View>
                                        <View>
                                            <View style={{flexDirection:'row',marginTop:3}}>
                                                <Text style={{color:'gray',fontSize:13}}>{item.menuItem.category}, </Text>
                                                <Text style={{color:'gray',fontSize:13}}>{item.menuItem.description}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{marginLeft:'auto',marginRight:20,flexDirection:'row',alignItems:'center'}}>
                                        <FontAwesome name="rupee" size={15} color='rgb(0, 15, 102)' style={{marginTop:2}}/>
                                        <Text style={{color: 'rgb(0, 15, 102)'}}> {item.menuItem.price }</Text>
                                    </View>
                                </View>
                            )
                        }}
                    />
                </Card>

                <TouchableOpacity style={{height:45,marginHorizontal:20,backgroundColor:'#FBAF02',borderRadius:25,justifyContent:'center',alignItems:'center',marginTop:20}}
                    onPress={() => confirmOrder()}
                    activeOpacity={0.8}
                >
                    <Text style={{color:'white',fontWeight:'bold',fontSize:17}}>Confirm Order for Pickup</Text>
                </TouchableOpacity>
            </ScrollView>
            : <ActivityIndicator size='large'/>}
        </View>
    )
}

const styles = StyleSheet.create({

});

export default OrdersList;