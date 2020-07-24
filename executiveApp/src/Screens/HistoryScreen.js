import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Dimensions, StatusBar } from 'react-native';
import { Card } from 'react-native-elements';
import trackerApi from '../api/tracker';
import { Entypo } from '@expo/vector-icons';
import { NavigationEvents } from 'react-navigation';
const { width, height } = Dimensions.get('window');

// Rendering previous deliveries done by the executive

const History = () => {
    const [err, setErr] = useState('');
    const [result, setResult] = useState([]);

    var day = new Date().toDateString().slice(4, 10)
    var year = new Date().toDateString().slice(11, 15)

    const viewHistory = async () => {
        try {
            const response = await trackerApi.get('/execdetails/viewdelivered');
            // console.log('orders',response.data.orders)
            setResult(response.data.orders);

        }
        catch (err) {
            console.log(err);
            setErr('Something went wrong');
        }
    }

    useEffect(() => {
        viewHistory();
    }, []);

    // console.log(result);
    if(result.length==0){
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>You don't have any orders yet.</Text>
            </View>
        )
    }


    return (
        <View>
            <StatusBar backgroundColor='#EA3C53' />
            <NavigationEvents onDidFocus={() => viewHistory()} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{height:55,justifyContent:'center'}}>
                    <Text style={{marginLeft:20,fontSize:17}}>Order History</Text>
                </View>
                <FlatList
                    showsVerticalScrollIndicator
                    data={result}
                    keyExtractor={(result) => result._id}
                    renderItem={({ item }) => {
                        return (
                            // <View style={{ marginHorizontal: 15, marginVertical: 15 }}>
                            //     <Text>Delivered to: {item.user.name}</Text>
                            //     <Text>Delivery address: {item.delivery_add}</Text>
                            //     <Text>Customer contact: {item.user.phoneNo}</Text>
                            //     <Text>Customer email: {item.user.email}</Text>

                            // </View>
                            <View style={{ width, borderBottomWidth: 1, borderColor: 'rgb(230,230,230)', backgroundColor: 'white' }}>
                                <View style={{ width, flexDirection: 'row', alignItems: 'center',paddingVertical:20 }}>
                                    <View style={{ width: 40, height: 40, borderRadius: 25, backgroundColor: 'rgb(102, 163, 21)', alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}>
                                        <Entypo name="home" size={24} color="white" />
                                    </View>
                                    <View style={{ marginLeft: 20 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Order   #{item._id.slice(0,10)}</Text>
                                        <Text style={{ color: 'green', fontSize: 17 }}>Delivered</Text>
                                    </View>

                                    <View style={{ marginLeft: 'auto', marginRight: 15, width: 120 }}>
                                        <Text style={{ color: 'rgb(67, 153, 69)', marginLeft: 'auto' }}>Ordered {item.orderItems.length} {item.orderItems.length == 1 ? <Text>item</Text> : <Text>items</Text>}</Text>
                                        <Text style={{ fontSize: 12, marginTop: 10, color: 'gray' }}>{day}, {year} | {item.timestamp}</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection:'row',alignItems:'center',marginTop:10,marginBottom:10}}>
                                    <Text style={{fontWeight:'bold',fontSize:17,marginLeft:20,flex:1}}>Delivery Address</Text>
                                    <Text style={{marginLeft:'auto',marginRight:20,flex:1}}>{item.delivery_add}</Text>
                                </View>
                                <View style={{flexDirection:'row',alignItems:'center',marginTop:10,marginBottom:10}}>
                                    <Text style={{fontWeight:'bold',fontSize:17,marginLeft:20}}>Pickup Address</Text>
                                    <Text style={{marginLeft:'auto',marginRight:20}}>{item.chef.location}</Text>
                                </View>
                                
                            </View>
                        )
                    }}
                />
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({

})


export default History;