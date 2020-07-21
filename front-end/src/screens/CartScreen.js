import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, ScrollView, AsyncStorage, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import trackerApi from '../api/tracker';
import CartHelper from '../components/CartHelper';
import { AppStyles } from '../AppStyles';

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
            // console.log('resultssss')
            setTotalprice(total);
            const idList = []
            for (i = 0; i < data.length; i++) {
                idList.push(data[i]._id)
            }
            setId(idList)
            const add = await AsyncStorage.getItem('address');
            console.log('address', add);
            setAddress(add);

        }
        catch (err) {
            console.log(err);
            setErr('Something went wrong');
        }
    };

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
            <Text style={Styles.text}>Total Price: {totalprice}</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
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
                            }} />
                        )
                    }}
                />
                <View style={Styles.button}>
                    <Button title='Proceed to Pay' type="outline" onPress={() => navigation.navigate('TipsyStripe', { totalprice, idArr: id, orderAddress: address })} />
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