import React from 'react';
import { View, FlatList, Text, StyleSheet, ScrollView, AsyncStorage } from 'react-native';
import CartList from './CartList';

const CartHelper = ({ result }) => {

    return(
            <FlatList
                showsVerticalScrollIndicator
                data={result.orderItems}
                keyExtractor={(result) => result._id}
                renderItem={({ item }) => {
                    return (
                        <CartList result={item} />
                    )
                }}
            />
 
    )
}


const styles = StyleSheet.create({

})

export default CartHelper;
