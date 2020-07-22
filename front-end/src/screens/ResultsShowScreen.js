import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity } from 'react-native';
import trackerApi from '../api/tracker';
import ResultShowDetail from '../components/ResultShowDetails';
import { AntDesign } from '@expo/vector-icons';
// import Geocoder from 'react-native-geocoding';
// import { Permissions, Location } from 'expo';
// Geocoder.init("AIzaSyA4R47lkG-0zcnpIYdX4pWeJocfmTI8Ujs"); 
// Geocoder.init("AIzaSyA4R47lkG-0zcnpIYdX4pWeJocfmTI8Ujs", {language : "en"});

const ResultsShowScreen = ({ navigation }) => {
    const [result, setResult] = useState(null);
    const id = navigation.getParam('id');




    const getResult = async (id) => {
        // console.log('inside get result');
        // console.log(id);
        const response = await trackerApi.get(`/home/chef/${id}`);
        // console.log(response.data);
        setResult(response.data);
    };

    useEffect(() => {
        // console.log('inside use effect', id);
        getResult(id);
    }, []);


    if (!result) {
        return null;
    }

    // // console.log('location',location);
    // _attemptGeocodeAsync = async () => {
    //     this.setState({ inProgress: true, error: null });
    //     try {
    //       let result = await Location.geocodeAsync(this.state.selectedExample);
    //       this.setState({ result });
    //     } catch (e) {
    //       this.setState({ error: e.message });
    //     } finally {
    //       this.setState({ inProgress: false });
    //     }
    //   };




    return (
        <View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.kitchenName}>{result.chef_details.name}'s Kitchen</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                    <AntDesign name="shoppingcart" style={styles.cart} />
                </TouchableOpacity>

            </View>

            <FlatList
                data={result.menu}
                keyExtractor={(result) => result._id}
                renderItem={({ item }) => {
                    return <View>
                        {/* <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.price}>Rs. {item.price}</Text>
                        <Text style={styles.textDes}>Category: {item.category}</Text>
                        <Text style={styles.textDes}>Description: {item.description}</Text> */}
                        <ResultShowDetail result={item} availability={result.availability} />
                    </View>
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    kitchenName: {
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 10,
        marginHorizontal: 10,
        textTransform: "capitalize"
    },
    backgroundStyle: {
        backgroundColor: 'rgb(230,230,230)',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10
    },
    inputStyle: {
        flex: 1,
        fontSize: 18
    },
    iconStyle: {
        fontSize: 35,
        alignSelf: 'center',
        marginHorizontal: 15
    },
    cart: {
        fontSize: 25,
        marginTop: 20,
        marginLeft: 40
    }
});

export default ResultsShowScreen;