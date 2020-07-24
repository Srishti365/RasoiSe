import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, FlatList, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Card } from 'react-native-elements';
import trackerApi from '../api/tracker';
import { NavigationEvents } from 'react-navigation';
const { width, height } = Dimensions.get('window');
import { MaterialIcons } from '@expo/vector-icons';

// rendering pending orders yet to be done

const Orders = ({ navigation }) => {
    const [err, setErr] = useState('');
    const [orders, setOrders] = useState([]);

    var day = new Date().toDateString().slice(4, 10)
    var year = new Date().toDateString().slice(11, 15)


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

    const calLength = (item) => {
        const length = item.orderItems.length
        return length
    }

    const sliceId = (id) => {
        const result = id.slice(0, 8)
        return result
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
            <View style={{ height: 50, width: width, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(245,245,245)' }}>
                <Text style={{ fontSize: 17, color: 'rgb(0, 15, 102)' }}>My Orders</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    showsVerticalScrollIndicator
                    data={orders}
                    keyExtractor={(orders) => orders._id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('OrdersList', { id: item._id })} style={{ backgroundColor: 'white' }} activeOpacity={0.8}>
                                <View style={{ height: 100, width, borderBottomWidth: 1, flexDirection: 'row', borderColor: 'rgb(230,230,230)', alignItems: 'center' }}>
                                    <View style={{ width: 40, height: 40, borderRadius: 25, backgroundColor: 'rgb(77, 207, 255)', alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}>
                                        <MaterialIcons name="local-dining" size={24} color="white" />
                                    </View>
                                    <View style={{ marginLeft: 20 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Order   #{sliceId(item._id)}</Text>
                                        <Text style={{ color: 'red', fontSize: 17 }}>Pending</Text>
                                    </View>

                                    <View style={{ marginLeft: 'auto', marginRight: 15, width: 120 }}>
                                        <Text style={{ color: 'rgb(67, 153, 69)', marginLeft: 'auto' }}>View {calLength(item)} {calLength(item) == 1 ? <Text>item</Text> : <Text>items</Text>}</Text>
                                        <Text style={{ fontSize: 12, marginTop: 10, color: 'gray' }}>{day}, {year} | {item.timestamp}</Text>
                                    </View>
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