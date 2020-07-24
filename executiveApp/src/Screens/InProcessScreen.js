import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, ScrollView, Button } from 'react-native';
import trackerApi from '../api/tracker';
import { NavigationEvents } from 'react-navigation';

// Rendering orders that have been picked up but yet to be delivered

const InProcessScreen = ({ navigation }) => {
    const [err, setErr] = useState('');
    const [result, setResult] = useState([]);

    const viewInprocess = async () => {
        try {
            const response = await trackerApi.get('/execdetails/viewinprocess');
            // console.log(response.data);
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

    // console.log(result);


    return (
        <View>
            <NavigationEvents onDidFocus={() => viewInprocess()} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    showsVerticalScrollIndicator
                    data={result}
                    keyExtractor={(result) => result._id}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ marginHorizontal: 15, marginVertical: 15 }}>
                                <Text>Ordered by: {item.user.name}</Text>

                                <Text>Delivery address: {item.delivery_add}</Text>
                                <Text>Customer contact: {item.user.phoneNo}</Text>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, marginBottom: 10 }}>
                                    <View>
                                        <Button title=' Directions ' onPress={() => navigation.navigate('Map', { orderId: item._id })} />
                                    </View>

                                    <View>
                                        <Button title=' Confirm Delivery ' color='gray' onPress={() => confirmDelivery(item._id)} />
                                    </View>
                                </View>

                            </View>
                        )
                    }}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({});

export default InProcessScreen;