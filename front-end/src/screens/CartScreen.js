import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import trackerApi from '../api/tracker';
import CartHelper from '../components/CartHelper';

const CartScreen = ({ navigation }) => {
    const [result, setResult] = useState(null);
    const [err, setErr] = useState('');
    const [id, setId] = useState([])
    const [totalprice, setTotalprice] = useState(0);
    const [changeRef, setChangeRef] = useState(0);

    const viewCart = async () => {
        try {
            console.log('viewCart');
            const response = await trackerApi.get('/cart/view');
            const data = response.data.cart;
            const total = response.data.total_price;
            setResult(data);
            console.log('resultssss')
            setTotalprice(total);
            const idList = []
            for (i = 0; i < data.length; i++) {
                idList.push(data[i]._id)
            }
            setId(idList)

        }
        catch (err) {
            console.log(err);
            setErr('Something went wrong');
        }
    };

    const RemoveItem = async (removeId) => {
        try {

            console.log('hii');
            setChangeRef(removeId);
            const response = await trackerApi.post('/cart/remove', { id: removeId });
            // console.log(response.data.chefs);
            //    setResult(response.data.items);
            console.log(result);
            // navigation.navigate('Cart');
            // viewCart();
        }
        catch (err) {
            console.log(err);
            setErr('Something went wrong');
        }
    }

    // const RemoveItem = async (id) => {
    //     try {
    //         console.log('hii');
    //         const response = await trackerApi.post('/cart/remove', { id: id });
    //         console.log('response',response);
    //         // viewCart()
    //     }
    //     catch (err) {
    //         console.log(err);
    //         setErr('Something went wrong');
    //     }
    // }



    useEffect(() => {
        viewCart();
    }, [changeRef])


    if (!result) {
        return null;
    }

    console.log(result)

    return (
        <View>
            <Text style={Styles.text}>Total Price: {totalprice}</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    showsVerticalScrollIndicator
                    data={result}
                    keyExtractor={(result) => result._id}
                    renderItem={({ item }) => {
                        return (
                            <CartHelper result={item} callback={(id) => RemoveItem(id)} />
                        )
                    }}
                />
                <View style={Styles.button}>
                    <Button title='Proceed to Pay' type="outline" onPress={() => navigation.navigate('TipsyStripe', { totalprice, idArr: id })} />
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
    }
});


export default CartScreen;