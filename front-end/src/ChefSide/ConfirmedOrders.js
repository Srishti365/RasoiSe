import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList } from 'react-native';
import trackerApi from '../api/tracker';
import { NavigationEvents } from 'react-navigation';
import ConfirmedOrdersList from '../components/ConfirmedOrdersList';
import { Card } from 'react-native-elements';

// rendering orders confirmed by chef to be picked up

const ConfirmedOrders = () => {
    const [err, setErr] = useState('');
    const [result, setResult] = useState([]);


    const viewConfirmed = async () => {
        try {

            const response = await trackerApi.get('/cook/viewconfirmed');
            // console.log('response', response.data.orders);
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
            <ScrollView showsVerticalScrollIndicator={false} >
                <FlatList
                    showsVerticalScrollIndicator
                    data={result}
                    keyExtractor={(result) => result._id}
                    renderItem={({ item }) => {
                        return (

                            <Card containerStyle={{ marginHorizontal: 10, borderWidth: 0, elevation: 5, borderRadius: 5 }}>
                                <View style={{ height: 50, marginTop: -15, marginHorizontal: -15, borderRadius: 5, marginBottom: 10, backgroundColor: '#FBAF02', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'white', fontSize: 17 }}>{item.executive.name} is on the way for pickup</Text>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: 'bold', alignSelf: 'center', fontSize: 17 }}>Executive details</Text>
                                    <View style={{ flexDirection: 'column', borderBottomWidth: 1, paddingBottom: 20, borderColor: 'rgb(240,240,240)', marginTop: 10 }}>
                                        <View style={{ width: '50%', marginBottom: 10 }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Executive name </Text>
                                            <Text style={{ color: 'gray' }}>{item.executive.name}</Text>
                                        </View>
                                        <View style={{ alignItems: 'flex-start' }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Executive Address</Text>
                                            <Text style={{ color: 'gray' }}>{item.executive.address}</Text>
                                        </View>
                                    </View>
                                    <Text style={{ fontWeight: 'bold', alignSelf: 'center', fontSize: 17, marginTop: 10 }}>Customer details</Text>
                                    <View style={{ marginTop: 10, flexDirection: 'column', paddingBottom: 10 }}>
                                        <View style={{ width: '50%', marginBottom: 10 }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Customer email</Text>
                                            <Text style={{ color: 'gray' }}>{item.user.email}</Text>
                                        </View>
                                        <View style={{ marginLeft: 'auto' }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Customer Address</Text>
                                            <Text style={{ color: 'gray' }}>{item.delivery_add}</Text>
                                        </View>
                                    </View>
                                </View>
                            </Card>
                        )
                    }}
                />

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({});

export default ConfirmedOrders;