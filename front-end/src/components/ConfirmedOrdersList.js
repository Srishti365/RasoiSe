import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';



const ConfirmedOrdersList = ({ orderitems }) => {
    return (
        <View>
            <FlatList
                showsVerticalScrollIndicator
                data={orderitems}
                keyExtractor={(orderitems) => orderitems._id}
                renderItem={({ item }) => {
                    return (

                        <View style={{ marginHorizontal: 5, marginVertical: 5 }}>
                            <Text>Quantity: {item.quantity}</Text>
                            <Text>Price: {item.price}</Text>
                            <Text>Time: {item.timestamp}</Text>
                        </View>

                    )
                }}
            />

        </View>
    )
}

const styles = StyleSheet.create({});

export default ConfirmedOrdersList;
