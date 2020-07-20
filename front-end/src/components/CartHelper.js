import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, ScrollView, AsyncStorage } from 'react-native';
import CartList from './CartList';

const CartHelper = ({ result, callback }) => {
<<<<<<< HEAD

    return(
            <FlatList
                showsVerticalScrollIndicator
                data={result.orderItems}
                keyExtractor={(result) => result._id}
                renderItem={({ item }) => {
                    return (
                        <CartList result={item} callback={(id) => callback(id)}/>
                    )
                }}
            />
 
=======

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

>>>>>>> e0bf1d6b1087a98b7ce6e13af265ca9ccef2c3bb
    )
}


const styles = StyleSheet.create({

})

export default CartHelper;
