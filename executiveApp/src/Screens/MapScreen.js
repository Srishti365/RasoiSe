import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import trackerApi from '../api/tracker';

const MapScreen = ({ navigation }) => {
    const [err, setErr] = useState('')
    const [result, setResult] = useState({});

    const viewRoute = async () => {
        try {
            const id = navigation.getParam('orderId');
            const response = await trackerApi.post('/execdetails/viewroute', { id });
            // console.log(response.data);
            setResult(response.data);
        }
        catch (err) {
            console.log(err);
            setErr('Something went wrong');
        }
    }

    useEffect(() => {
        viewRoute();
    }, []);

    console.log(result);

    return (
        <View>
            <Text>Map screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({})

export default MapScreen;