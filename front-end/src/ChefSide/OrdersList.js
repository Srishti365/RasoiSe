import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList, Button } from 'react-native';
import trackerApi from '../api/tracker';


const OrdersList = ({ navigation }) => {
    const [err, setErr] = useState('');
    const [ordersList, setOrdersList] = useState({});


    const viewOrderList = async () => {
        try {
            const orderId = navigation.getParam('id');
            const response = await trackerApi.post('/cook/viewparticularorder', { id: orderId });
            // console.log(response.data);
            setOrdersList(response.data.orders);


        }
        catch (err) {
            console.log(err);
            setErr('Something went wrong');
        }

    }

    const confirmOrder = async () => {
        try {
            const orderId = navigation.getParam('id');
            const response = await trackerApi.post('/cook/confirmorder', { id: orderId });
            // console.log(response.data);
            navigation.navigate('Orders');
            // setOrdersList(response.data.orders);


        }
        catch (err) {
            console.log(err);
            setErr('Something went wrong');
        }
    }

    useEffect(() => {
        viewOrderList();
    }, [])

    // console.log(navigation);

    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: 20 }}>
                {/* sahil yahan pe kisne order kara hai uska details daalna hai..lekin mein
                aise view banake likh rahi toh starting me state khali rehta hai na...
                toh error ho jaa raha..dekhna na yeh kaise banta hai */}

                {/* <View>
                    <Text>Ordered By</Text>
                    <Text>{ordersList.user.email}</Text>
                    <Text>{ordersList.user}</Text>
                    <Text>{ordersList.user}</Text>
                </View> */}
                <FlatList
                    showsVerticalScrollIndicator
                    data={ordersList.orderItems}
                    keyExtractor={(ordersID) => ordersList.orderItems._id}
                    renderItem={({ item }) => {
                        return (

                            <View style={{ margin: 15 }}>
                                <Text>Item name: {item.menuItem.name}</Text>
                                <Text>Category: {item.menuItem.category}</Text>
                                <Text>Quantity: {item.quantity}</Text>
                                <Text>Time: {item.timestamp}</Text>

                            </View>

                        )
                    }}
                />
                <Button title="Confirm order for pickup" onPress={() => confirmOrder()} />
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({

});

export default OrdersList;