import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, ScrollView, AsyncStorage } from 'react-native';
import CartList from './CartList';

const CartHelper = ({ result, callback }) => {

    return (
        <FlatList
            showsVerticalScrollIndicator
            data={result.orderItems}
            keyExtractor={(result) => result._id}
            renderItem={({ item }) => {
                return (
                    <CartList result={item} callback={(id) => callback(id)} />
                )
            }}
        />

    )
}


const styles = StyleSheet.create({

})

export default CartHelper;
