import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import trackerApi from '../api/tracker';
import CartList from '../components/CartList';

const CartScreen = ({ navigation }) => {
    const [result, setResult] = useState(null);
    const [err, setErr] = useState('');

    const viewCart = async () => {
        try {

            console.log('hii');
            const response = await trackerApi.get('/cart/view');
            // console.log(response.data.chefs);
            setResult(response.data);
            console.log('cart state');
            console.log(response.data);

        }
        catch (err) {
            console.log(err);
            setErr('Something went wrong');
        }
    };

    const RemoveItem = async (id) => {
        try {

            console.log('hii');
            const response = await trackerApi.post('/cart/remove', { id: id });
            // console.log(response.data.chefs);
            //    setResult(response.data.items);
            console.log(result);
            navigation.navigate('CartScreen');
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

    return (
        <View>
            <Text style={Styles.text}>Total Price: {result.totalprice}</Text>
            <FlatList
                showsVerticalScrollIndicator
                data={result.items}
                keyExtractor={(result) => result.id}
                renderItem={({ item }) => {
                    return <View>
                        {/* <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.price}>Rs. {item.price}</Text>
                        <Text style={styles.textDes}>Category: {item.category}</Text>
                        <Text style={styles.textDes}>Description: {item.description}</Text> */}
                        <CartList result={item} navigation={navigation} callback={() => { }} />
                    </View>
                }}
            />
            <View style={Styles.button}>
                <Button title='Proceed to Pay' type="outline" onPress={() => navigation.navigate('TipsyStripe', { items: result.items, totalprice: result.totalprice })} />
            </View>


        </View>
    )
}


const Styles = StyleSheet.create({
    button: {
        marginTop: 10,
        marginHorizontal: 100
    },
    text: {
        fontSize: 20
    }
});


export default CartScreen;