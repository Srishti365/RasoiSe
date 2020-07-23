import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, ScrollView, AsyncStorage } from 'react-native';
import CartList from './CartList';
import { Card } from 'react-native-elements';

const CartHelper = ({ result, callback, onEdit }) => {

    // console.log('cart helper', result)

    return (
        <Card containerStyle={{ borderWidth: 0, borderRadius: 5, elevation: 2, marginHorizontal: 10, paddingTop: 0 }}>
            {/* <CartList result={item} callback={(id) => callback(id)} onEdit={(id,quantity) => onEdit(id,result._id,quantity)}/> */}
            <FlatList
                showsVerticalScrollIndicator
                data={result.orderItems}
                keyExtractor={(result) => result._id}
                renderItem={({ item }) => {
                    return (

                        <CartList result={item} callback={(id) => callback(id)} onEdit={(id, quantity) => onEdit(id, result._id, quantity)} />

                    )
                }}
            />
        </Card>
    )
}


const styles = StyleSheet.create({

})

export default CartHelper;
