import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import trackerApi from '../api/tracker';
import { NavigationEvents } from 'react-navigation';


const Orders = ({ navigation }) => {
    const [err, setErr] = useState('');
    const [orders, setOrders] = useState([]);

    const viewOrders = async () => {
        try {

            const response = await trackerApi.get('/cook/vieworders');
            // console.log(response.data);
            setOrders(response.data.orders);
        }
        catch (error) {
            console.log(error);
            setErr('Something went wrong');
        }
    }

    useEffect(() => {
        viewOrders();
    }, [])

    // console.log('view orders');
    // console.log(orders);

    return (
        <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <NavigationEvents onDidFocus={() => viewOrders()} />
            <StatusBar backgroundColor='#EA3C53' />
            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    showsVerticalScrollIndicator
                    data={orders}
                    keyExtractor={(orders) => orders._id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={{ marginVertical: 20 }} onPress={() => navigation.navigate('OrdersList', { id: item._id })}  >
                                <View>
                                    <Text>Order ID: {item._id}</Text>
                                    <Text>Delivery Address: {item.delivery_add}</Text>
                                    <Text>Time: {item.timestamp}</Text>
                                    <Text>Customer Email: {item.user.email}</Text>
                                    <Text>Customer Contact: {item.user.phoneNo}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({

});

export default Orders;