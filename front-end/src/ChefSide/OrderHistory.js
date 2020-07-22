import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Dimensions } from 'react-native';
import trackerApi from '../api/tracker';
import { Entypo } from '@expo/vector-icons';
const { width, height} = Dimensions.get('window');

const OrderHistoryScreen = () => {
    const [err, setErr] = useState('');
    const [result, setResult] = useState([]);

    var day = new Date().toDateString().slice(4,10)
    var year = new Date().toDateString().slice(11,15)

    const calLength = (item) => {
        const length = item.orderItems.length
        return length
    }

    const sliceId = (id) => {
        const result = id.slice(0,8)
        return result
    }

    const viewCompleted = async () => {
        try {

            const response = await trackerApi.get('/cook/viewcompleted');
            console.log('results',response.data.orders)
            setResult(response.data.orders);

        }
        catch (err) {
            console.log(err);
            setErr('Something went wrong');
        }
    }

    useEffect(() => {
        viewCompleted();
    }, []);

    // console.log(result);

    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false} >
                <FlatList
                    showsVerticalScrollIndicator
                    data={result}
                    keyExtractor={(result) => result._id}
                    renderItem={({ item }) => {
                        return (

                            <View style={{height:100,width,borderBottomWidth:1,flexDirection:'row',borderColor:'rgb(230,230,230)',alignItems:'center',backgroundColor:'white'}}>
                                <View style={{height:100,width,borderBottomWidth:1,flexDirection:'row',borderColor:'rgb(230,230,230)',alignItems:'center'}}>
                                    <View style={{width:40,height:40,borderRadius:25,backgroundColor:'rgb(102, 163, 21)',alignItems:'center',justifyContent:'center',marginLeft:20}}>
                                        <Entypo name="home" size={24} color="white" />
                                    </View>
                                    <View style={{marginLeft:20}}>
                                        <Text style={{fontWeight:'bold',fontSize:15}}>Order   #{sliceId(item._id)}</Text>
                                        <Text style={{color:'green',fontSize:17}}>Delivered</Text>
                                    </View>
                                    
                                    <View style={{marginLeft:'auto',marginRight:15,width:120}}>
                                        <Text style={{color:'rgb(67, 153, 69)',marginLeft:'auto'}}>Ordered {calLength(item)} {calLength(item)==1 ? <Text>item</Text> : <Text>items</Text>}</Text>
                                        <Text style={{fontSize:12,marginTop:10,color:'gray'}}>{day}, {year} | {item.timestamp}</Text>
                                    </View>
                                </View>
                            </View>
                            // <View style={{ marginHorizontal: 5, marginVertical: 15 }}>
                            //     <Text>OrderID: {item._id}</Text>
                            //     <Text>Customer name: {item.user.name}</Text>
                            //     <Text>Customer contact: {item.user.phoneNo}</Text>
                            //     <Text>Delivery address: {item.delivery_add}</Text>
                            //     <Text>Picked up by: {item.executive.name}</Text>
                            //     <Text>Executive address: {item.executive.address}</Text>

                            //     <Text>Time of order: {item.timestamp}</Text>



                            // </View>

                        )
                    }}
                />

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({});

export default OrderHistoryScreen;