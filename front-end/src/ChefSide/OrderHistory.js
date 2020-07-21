import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import trackerApi from '../api/tracker';

const OrderHistoryScreen = () => {
    const [err, setErr] = useState('');
    const [result, setResult] = useState([]);

    const viewCompleted = async () => {
        try {

            const response = await trackerApi.get('/cook/viewcompleted');
            setResult(response.data.orders);

        }
        catch (err) {
            console.log(err);
            setErr('Something went wrong');
        }
    }

    useEffect(() => {
        viewCompleted();
    }, []);

    // console.log(result);

    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: 20 }}>
                <FlatList
                    showsVerticalScrollIndicator
                    data={result}
                    keyExtractor={(result) => result._id}
                    renderItem={({ item }) => {
                        return (

                            <View style={{ marginHorizontal: 5, marginVertical: 15 }}>
                                <Text>OrderID: {item._id}</Text>
                                <Text>Customer name: {item.user.name}</Text>
                                <Text>Customer contact: {item.user.phoneNo}</Text>
                                <Text>Delivery address: {item.delivery_add}</Text>
                                <Text>Picked up by: {item.executive.name}</Text>
                                <Text>Executive address: {item.executive.address}</Text>

                                <Text>Time of order: {item.timestamp}</Text>



                            </View>

                        )
                    }}
                />

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({});

export default OrderHistoryScreen;