import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import trackerApi from '../api/tracker';
import UserOrderList from '../components/UserOrderList';

const MyOrders = () => {

    const [result,setResult] = useState([])

    const getOrders = async() => {
        const response = await trackerApi.get('/cart/viewallorders');
        console.log('your orders',response.data.orders);
        setResult(response.data.orders)
    }

    useEffect(() => {
        getOrders()
    },[])

    return (
        <View>
            <FlatList 
                showsVerticalScrollIndicator
                keyExtractor={(result) => result._id}
                data={result}
                renderItem={({ item }) => {
                    return (
                        <UserOrderList result={item}/>
                    )
                }}
            />
        </View>
    )
}


const styles = StyleSheet.create({

});


export default MyOrders;