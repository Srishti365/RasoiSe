import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, ScrollView, Button } from 'react-native';
import trackerApi from '../api/tracker';
import { NavigationEvents } from 'react-navigation';
import { Card } from 'react-native-elements';

// Rendering orders that have been picked up but yet to be delivered

const InProcessScreen = ({ navigation }) => {
    const [err, setErr] = useState('');
    const [result, setResult] = useState([]);

    const viewInprocess = async () => {
        try {
            const response = await trackerApi.get('/execdetails/viewinprocess');
            // console.log('process',response.data);
            setResult(response.data.orders);
        }
        catch (err) {
            console.log(err);
            setErr('Something went wrong');
        }
    }

    const confirmDelivery = async (orderId) => {
        try {
            // console.log('order id', orderId);
            const response = await trackerApi.post('/execdetails/confirmdelivery', { id: orderId });
            // console.log(response.data);
            viewInprocess();
            navigation.navigate('Pending')

        }
        catch (err) {
            console.log(err);
            setErr('Something went wrong');
        }
    }

    useEffect(() => {
        viewInprocess();
    }, []);

    if(result.length==0){
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>No orders in transit.</Text>
            </View>
        )
    }


    return (
        <View>
            <NavigationEvents onDidFocus={() => viewInprocess()} />
            <View style={{height:55,justifyContent:'center',backgroundColor:'rgb(220,220,220)'}}>
                <Text style={{marginLeft:20,fontSize:17}}>InProcess Orders</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    showsVerticalScrollIndicator
                    data={result}
                    keyExtractor={(result) => result._id}
                    renderItem={({ item }) => {
                        return (
                            <Card containerStyle={{borderWidth:0,marginHorizontal:10,elevation:2,borderRadius:10}}>
                                <View style={{flexDirection:'row',alignItems:'center',paddingBottom:10,borderBottomWidth:1,borderColor:'rgb(240,240,240)'}}>
                                    <Text style={{color:'gray',fontSize:17}}>Order Id</Text>
                                    <Text style={{marginLeft:'auto',fontWeight:'bold'}}># {item._id.slice(0,10)}</Text>
                                </View>
                                <View style={{borderBottomWidth:1,borderColor:'rgb(240,240,240)',paddingBottom:10}}>
                                    <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                                        <Text style={{color:'gray'}}>Delivery Address</Text>
                                        <Text style={{marginLeft:'auto',marginRight:10,width:'50%'}}>{item.delivery_add}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                                        <Text style={{color:'gray'}}>Customer's name</Text>
                                        <Text style={{marginLeft:'auto',marginRight:10,width:'50%'}}>{item.user.name}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                                        <Text style={{color:'gray'}}>Customer's phoneNo</Text>
                                        <Text style={{marginLeft:'auto',marginRight:10,width:'50%'}}>{item.user.phoneNo}</Text>
                                    </View>
                                </View>
                                <View style={{borderBottomWidth:1,borderColor:'rgb(240,240,240)',paddingBottom:10}}>
                                    <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                                        <Text style={{color:'gray'}}>Pickup Address</Text>
                                        <Text style={{marginLeft:'auto',marginRight:10,width:'50%'}}>{item.chef.location}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                                        <Text style={{color:'gray'}}>Chef name</Text>
                                        <Text style={{marginLeft:'auto',marginRight:10,width:'50%'}}>{item.chef.name}</Text>
                                    </View>
                                </View>
                                <View style={{marginTop:10,flexDirection:'row',paddingBottom:10}}>
                                    <Text style={{color:'gray'}}>Number of Items</Text>
                                    <Text style={{marginLeft:'auto',marginRight:10}}>{item.orderItems.length}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, marginBottom: 10 }}>
                                    <View>
                                         <Button title=' Directions ' onPress={() => navigation.navigate('Map', { orderId: item._id })} />
                                    </View>

                                    <View>
                                        <Button title=' Confirm Delivery ' color='gray' onPress={() => confirmDelivery(item._id)} />
                                    </View>
                                 </View>

                            </Card>
                            // <View style={{ marginHorizontal: 15, marginVertical: 15 }}>
                            //     <Text>Ordered by: {item.user.name}</Text>

                            //     <Text>Delivery address: {item.delivery_add}</Text>
                            //     <Text>Customer contact: {item.user.phoneNo}</Text>

                            //     <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, marginBottom: 10 }}>
                            //         <View>
                            //             <Button title=' Directions ' onPress={() => navigation.navigate('Map', { orderId: item._id })} />
                            //         </View>

                            //         <View>
                            //             <Button title=' Confirm Delivery ' color='gray' onPress={() => confirmDelivery(item._id)} />
                            //         </View>
                            //     </View>

                            // </View>
                        )
                    }}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({});

export default InProcessScreen;