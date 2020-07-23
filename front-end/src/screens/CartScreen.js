import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, ScrollView, AsyncStorage, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { Button, Card } from 'react-native-elements';
import trackerApi from '../api/tracker';
import CartHelper from '../components/CartHelper';
import { AppStyles } from '../AppStyles';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const CartScreen = ({ navigation }) => {
    const [result, setResult] = useState(null);
    const [err, setErr] = useState('');
    const [id, setId] = useState([])
    const [totalprice, setTotalprice] = useState(0);
    const [address, setAddress] = useState('');
    // const [changeRef, setChangeRef] = useState(null);


    const viewCart = async () => {
        try {
            console.log('viewCart');
            const response = await trackerApi.get('/cart/view');
            const data = response.data.cart;
            const total = response.data.total_price;
            setResult(data);
            console.log('resultssss',response.data)
            setTotalprice(total);
            const idList = []
            for (i = 0; i < data.length; i++) {
                idList.push(data[i]._id)
            }
            setId(idList)
            const add = await AsyncStorage.getItem('address');
            // console.log('address', add);
            setAddress(add);

        }
        catch (err) {
            console.log(err);
            setErr('Something went wrong');
        }
    };

    const editItem = async(orderItemId,cartId,quantity) => {
        const response = await trackerApi.post('/cart/editcart',{orderitemid:orderItemId,quantity,cartid:cartId})
        console.log(response.data);
        viewCart();
    }

    const RemoveItem = async (removeId) => {
        try {

            console.log('hii');

            const response = await trackerApi.post('/cart/remove', { id: removeId });
            console.log(result);

        }
        catch (err) {
            console.log(err);
            setErr('Something went wrong');
        }
    }



    useEffect(() => {
        viewCart();
    }, [])


    if (!result) {
        return null;
    }

    // console.log(result)

    return (
        <View>


            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                    <Text style={{ width: 60 }}>Address : </Text>
                    <View style={Styles.InputContainer}>
                        <TextInput
                            style={Styles.body}
                            placeholder="Address"
                            onChangeText={address => setAddress(address)}
                            value={address}
                            placeholderTextColor={AppStyles.color.grey}
                            underlineColorAndroid="transparent"
                            autoFocus={true}
                            selection={{ start: 0 }}

                        />
                    </View>
                </View>
                <FlatList
                    showsVerticalScrollIndicator
                    extraData={result}
                    data={result}
                    keyExtractor={(result) => result._id}
                    renderItem={({ item }) => {
                        return (
                            <CartHelper result={item} callback={(id) => {
                                RemoveItem(id);
                                viewCart();
                            }}  onEdit={(orderItemId,cartId,quantity) => editItem(orderItemId,cartId,quantity)}/>
                        )
                    }}
                />
                <Text style={{marginLeft:25,marginTop:20,color:'gray'}}>Price Details</Text>
                <Card containerStyle={{borderWidth:0,marginHorizontal:10,borderRadius:10,marginTop:5}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:'gray',fontSize:16}}>Sub Total</Text>
                        <Text style={{marginLeft:'auto'}}><FontAwesome name='rupee' size={15}/> {totalprice}</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:5,paddingBottom:10,borderBottomWidth:1,borderColor:'rgb(240,240,240)'}}>
                        <Text style={{color:'gray',fontSize:16}}>Delivery</Text>
                        <Text style={{marginLeft:'auto',color:'rgb(145, 253, 255)'}}> FREE</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:15}}>
                        <Text style={{fontSize:17}}>Total Payable Amount</Text>
                        <Text style={{marginLeft:'auto',fontWeight:'bold'}}><FontAwesome name='rupee' size={15}/> {totalprice}</Text>
                    </View>
                </Card>
                <View style={{width:Dimensions.get('window').width-20,height:50,borderWidth:2,marginHorizontal:10,marginTop:20,borderRadius:5,flexDirection:'row',borderColor:'rgb(230,230,230)',marginBottom:20}}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('Search')}
                >
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Text>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1,borderLeftWidth:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgb(145, 253, 255)',borderColor:'rgb(230,230,230)'}}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('TipsyStripe', { totalprice, idArr: id, orderAddress: address })}
                    >
                        <Text style={{color:'white',fontSize:16}}>PAY</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}


const Styles = StyleSheet.create({
    button: {
        marginTop: 10,
        marginHorizontal: 100,
        marginBottom: 50
    },
    text: {
        fontSize: 20
    },
    body: {
        height: 42,
        paddingLeft: 20,
        paddingRight: 20,
    },
    InputContainer: {
        width: 280,
        marginLeft: 5,
        marginTop: 5,
        borderBottomWidth: 1,
        borderRadius: 5,
        borderColor: AppStyles.color.grey,
    },
});


export default CartScreen;