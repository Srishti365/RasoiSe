import React from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native';


const Orders = () => {
    return (
        <View style={{height:'100%',justifyContent:'center',alignItems:'center'}}>
            <StatusBar backgroundColor='#EA3C53'/>
            <Text>Your don't have any orders yet</Text>
        </View>
    )
}


const styles = StyleSheet.create({

});

export default Orders;