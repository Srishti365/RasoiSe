import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import trackerApi from '../api/tracker';
import PendingList from '../Components/PendingList';

// Rendering list of orders yet to be picked up

const PendingOrders = ({ navigation }) => {

    const [result, setResult] = useState([])

    const fetchResult = async () => {
        try {
            const response = await trackerApi.get('/execdetails/viewpending');
            // console.log('ye result h', response.data);
            setResult(response.data.orders);
        } catch (err) {
            console.log(err);
        }
    }

    const confirmPickup = async (id) => {
        try {
            // console.log('hii',id)
            const response = await trackerApi.post('/execdetails/confirmpickup', { id: id });
            // console.log(response);
            fetchResult();
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchResult();
    }, [])

    return (
        <View>
            <StatusBar backgroundColor='#EA3C53' />
            <NavigationEvents
                onWillFocus={fetchResult}
            />
            <View style={{height:55,justifyContent:'center',backgroundColor:'rgb(220,220,220)'}}>
                <Text style={{marginLeft:20,fontSize:17}}>Pending Orders</Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={true}
                data={result}
                keyExtractor={(result) => { result._id }}
                renderItem={({ item }) => {
                    return (
                        <PendingList result={item} onPick={(id) => confirmPickup(id)} onShowDirections={(id) => navigation.navigate('Map', { orderId: id })} />
                    )
                }}
            />
        </View>
    )
}


const styles = StyleSheet.create({

})


export default PendingOrders;