import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList } from 'react-native';
import trackerApi from '../api/tracker';
import { NavigationEvents } from 'react-navigation';
import ConfirmedOrdersList from '../components/ConfirmedOrdersList';

const ConfirmedOrders = () => {
    const [err, setErr] = useState('');
    const [result, setResult] = useState([]);


    const viewConfirmed = async () => {
        try {

            const response = await trackerApi.get('/cook/viewconfirmed');
            // console.log(response.data);
            setResult(response.data.orders);

        }
        catch (err) {
            console.log(err);
            setErr('Something went wrong');

        }
    }

    useEffect(() => {
        viewConfirmed();
    }, []);

    // console.log('view completed', result);

    return (
        <View>
            <NavigationEvents onDidFocus={() => viewConfirmed()} />
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: 20 }}>
                <FlatList
                    showsVerticalScrollIndicator
                    data={result}
                    keyExtractor={(result) => result._id}
                    renderItem={({ item }) => {
                        return (

                            <View style={{ marginHorizontal: 5, marginVertical: 15 }}>
                                <Text style={{ fontSize: 18 }} >{item.executive.name} is on the way to pick up the order.</Text>
                                <Text>Executive address: {item.executive.address}</Text>
                                <Text>Customer name: {item.user.name}</Text>
                                <Text>Customer contact: {item.user.phoneNo}</Text>
                                <Text>Delivery address: {item.delivery_add}</Text>
                                <Text>Time of order: {item.timestamp}</Text>

                                <ConfirmedOrdersList orderitems={item.orderItems} />

                            </View>

                        )
                    }}
                />

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({});

export default ConfirmedOrders;