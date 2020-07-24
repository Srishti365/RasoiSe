import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import trackerApi from '../api/tracker';
import UserOrderList from '../components/UserOrderList';

const MyOrders = () => {

    const [result,setResult] = useState([])
    const [visible,setVisible] = useState(false)

    console.log('ye order ka result h',result);

    const getOrders = async() => {
        const response = await trackerApi.get('/cart/viewallorders');
        console.log('your orders',response.data.orders);
        setResult(response.data.orders)
        setVisible(true)
    }
  


    useEffect(() => {
        getOrders()
    },[])

    return (
        <View>
            <View style={{height:60,backgroundColor:'rgb(245,245,245)',justifyContent:'center'}}>
                <Text style={{color:'rgb(180,180,180)',marginLeft:20,fontSize:17}}>Your Orders</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {visible ? 
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
                : <ActivityIndicator size='large' style={{height:'100%',justifyContent:'center',alignItems:'center'}}/>
                }   
                <View style={{marginBottom:100}}>

                </View>
            </ScrollView>        
        </View>
    )
}


const styles = StyleSheet.create({

});


export default MyOrders;