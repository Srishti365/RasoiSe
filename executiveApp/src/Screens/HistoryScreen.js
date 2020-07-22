import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import trackerApi from '../api/tracker';
import { NavigationEvents } from 'react-navigation';

const History = () => {
    const [err, setErr] = useState('');
    const [result, setResult] = useState([]);

    const viewHistory = async () => {
        try {
            const response = await trackerApi.get('/execdetails/viewdelivered');
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


    return (
        <View>
            <NavigationEvents onDidFocus={() => viewHistory()} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    showsVerticalScrollIndicator
                    data={result}
                    keyExtractor={(result) => result._id}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ marginHorizontal: 15, marginVertical: 15 }}>
                                <Text>Delivered to: {item.user.name}</Text>
                                <Text>Delivery address: {item.delivery_add}</Text>
                                <Text>Customer contact: {item.user.phoneNo}</Text>
                                <Text>Customer email: {item.user.email}</Text>

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