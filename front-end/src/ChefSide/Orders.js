import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, FlatList, ScrollView } from 'react-native';
import trackerApi from '../api/tracker';



const Orders = () => {
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

    console.log('view orders');
    console.log(orders);

    return (
        <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <StatusBar backgroundColor='#EA3C53' />
            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    showsVerticalScrollIndicator
                    data={orders}
                    keyExtractor={(orders) => orders._id}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <Text>{item.delivery_add}</Text>
                                <Text>{item.timestamp}</Text>
                            </View>
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